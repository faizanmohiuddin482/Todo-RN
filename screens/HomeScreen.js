import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from 'react-native';
import Task from '../screens/Task';
import {AuthContext} from '../components/context';
import AsyncStorage from '@react-native-community/async-storage';

export default function HomeScreen() {
  React.state = {
    text: '',
    name: '',
    date: Date.now(),
  };
  const {signOut} = React.useContext(AuthContext);
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [taskPersistValue, setTaskPersistValue] = useState([]);
  const [added, setAdded] = useState(0);

  const handleAddTask = async () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
    const tItems = JSON.stringify(taskItems);
    try {
      await AsyncStorage.setItem('name', tItems);
      await AsyncStorage.setItem('date', Date().toString());
      // await AsyncStorage.multiSet([
      //   ['name', tItems],
      //   ['date', Date().toString()],
      // ]);
      setAdded(added + 1);
    } catch (err) {
      console.log(err);
    }
  };
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('name');
      if (value !== null) {
        // We have data!!
        console.log({value});
        const tValue = JSON.parse(value);
        setTaskPersistValue(tValue);
      }
    } catch (error) {
      // Error retrieving data
    }
    try {
      const value = await AsyncStorage.getItem('date');
      if (value !== null) {
        // We have data!!
        console.log(value, 'date val');
        // const tValue = JSON.parse(value);
        // setTaskPersistValue(tValue);
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  console.log(taskPersistValue, 'tpv');
  React.useEffect(() => {
    getData();
  }, []);

  const completeTask = index => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.writeTaskWrapper}>
          <Text style={styles.sectionTitle}>Today's tasks</Text>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <TouchableOpacity onPress={signOut}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled">
        {/* Today's Tasks */}
        <View style={styles.tasksWrapper}>
          <View style={styles.items}>
            {/* This is where the tasks will go! */}
            {taskPersistValue.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => completeTask(index)}>
                  <Task text={item} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Write a task */}
      {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}>
        <TextInput
          style={styles.input}
          placeholder={'Write a task'}
          value={task}
          onChangeText={text => setTask(text)}
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
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
