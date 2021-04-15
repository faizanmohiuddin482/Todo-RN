import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Button,
  StatusBar,
  StyleSheet,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthContext} from '../components/context';
import SearchBar from '../components/SearchBar';
import {useTasks} from '../components/TaskProvider';
import COLORS from '../config/COLORS';
import TaskInputModel from './TaskInputModel';
import RoundButtonIcon from '../components/RoundButtonIcon';
import Task from './Task';

const Stack = createStackNavigator();

export default function HomeScreen({navigation}) {
  const [greetMessage, setGreetMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const {tasks, setTasks} = useTasks();
  const findGreetMessage = () => {
    const hrs = new Date().getHours();
    if (hrs === 0 || hrs < 12) return setGreetMessage('Morning');
    if (hrs === 1 || hrs < 17) return setGreetMessage('Afternoon');
    setGreetMessage('Evening');
  };

  const {signOut} = React.useContext(AuthContext);

  const handleOnSubmit = async (title, date, description) => {
    const task = {id: Date.now(), title, date, description, time: Date.now()};
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };
  const openTask = task => {
    navigation.navigate('Detail', {task});
  };
  useEffect(() => {
    findGreetMessage();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.LIGHT} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
        <View style={styles.container}>
          <Text style={styles.header}>{`Good ${greetMessage}`}</Text>
          {!tasks ? <SearchBar containerStyle={{marginVertical: 15}} /> : null}
          <FlatList
            data={tasks}
            numColumns={2}
            keyExtractor={item => item.id.toString()}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              marginBottom: 10,
            }}
            renderItem={({item}) => (
              <Task onPress={() => openTask(item)} item={item} />
            )}
          />
          {!tasks ? (
            <View
              style={[
                StyleSheet.absoluteFillObject,
                styles.emptyHeaderContainer,
              ]}>
              <Text style={styles.emptyHeader}>Add Task</Text>
            </View>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
      <RoundButtonIcon
        onPress={() => setModalVisible(true)}
        style={styles.addBtn}
      />
      <TaskInputModel
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleOnSubmit}
      />
      <View style={{position: 'absolute', right: 255, bottom: 15}}>
        <Button title="Logout" onPress={signOut} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  emptyHeader: {
    fontSize: 30,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    opacity: 0.2,
  },
  emptyHeaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    zIndex: -1,
  },
  addBtn: {position: 'absolute', right: 20, bottom: 15},
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
});
