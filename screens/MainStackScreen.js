import React from 'react';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthContext} from '../components/context';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import TaskDetail from './TaskDetail';
import TaskProvider from '../components/TaskProvider';

const HomeStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const HomeStackScreen = ({navigation}) => (
  <TaskProvider>
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <HomeStack.Screen
        name="Detail"
        component={TaskDetail}
        options={{
          title: 'Task Detail',
        }}
      />
    </HomeStack.Navigator>
  </TaskProvider>
);

export default HomeStackScreen;
