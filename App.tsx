import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Home from './src/screens/Home';
import Clases from './src/screens/Clases';
import Notif from './src/screens/Notif';
import User from './src/screens/User';
import Login from './src/screens/Login';
import Recuperar from './src/screens/Recuperar';
import { NavigationContainer } from '@react-navigation/native';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function MyTabs() {
  return(
  <Tab.Navigator>
    <Tab.Screen name='Home' component={Home} options={{headerShown:false}}/>
    <Tab.Screen name='Clases' component={Clases} options={{headerShown:false}}/>
    <Tab.Screen name='Notificaciones' component={Notif} options={{headerShown:false}}/>
    <Tab.Screen name='User' component={User} options={{headerShown:false}}/>
  </Tab.Navigator>    
  )
}

function Mavigation(){
  return(
    <Stack.Navigator>
      <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
      <Stack.Screen name='Recuperar' component={Recuperar} options={{headerShown:false}}/>
      <Stack.Screen name='MyTabs' component={MyTabs} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}

export default function App()  {
  return (
    <NavigationContainer>
      <Mavigation/>
    </NavigationContainer>
  )
}
