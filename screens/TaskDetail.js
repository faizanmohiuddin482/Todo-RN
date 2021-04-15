import React from 'react';
import {View, Text, Button, Alert, ScrollView, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useTasks} from '../components/TaskProvider';
const TaskDetail = props => {
  const {task} = props.route.params;
  const {setTasks} = useTasks();
  const deleteTask = async () => {
    const result = await AsyncStorage.getItem('tasks');
    let tasks = [];
    if (result !== null) tasks = JSON.parse(result);
    const newTasks = tasks.filter(t => t.id !== task.id);
    setTasks(newTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
    props.navigation.goBack();
  };

  const displayDeleteAlert = () => {
    Alert.alert(
      'Are You Sure!',
      'This action will delete your task permanently!',
      [
        {
          text: 'Delete',
          onPress: deleteTask,
        },
        {
          text: 'No Thanks',
          onPress: () => console.log('no thanks'),
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  return (
    <>
      <ScrollView contentContainerStyle={[styles.container, {paddingTop: 10}]}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.data}>{task.date}</Text>
        <Text style={styles.description}>{task.description}</Text>
        <View style={styles.btnContainer}>
          <Button
            title="delete"
            style={{backgroundColor: 'red', marginBottom: 15}}
            onPress={displayDeleteAlert}
          />
          <Button
            title="edit"
            style={{backgroundColor: 'red'}}
            onPress={() => console.log('edit')}
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
  },
  date: {
    fontSize: 15,
    color: 'black',
  },
  description: {
    fontSize: 25,
    color: 'black',
  },
  btnContainer: {
    position: 'absolute',
    right: 15,
    bottom: 50,
  },
});

export default TaskDetail;
