import React, {createContext, useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
const TaskContext = createContext();

const TaskProvider = ({children}) => {
  const [tasks, setTasks] = useState([]);
  const findTasks = async () => {
    const result = await AsyncStorage.getItem('tasks');
    console.log({result});
    if (result !== null) setTasks(JSON.parse(result));
  };

  useEffect(() => {
    findTasks();
  }, []);
  return (
    <TaskContext.Provider value={{tasks, setTasks, findTasks}}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);

export default TaskProvider;
