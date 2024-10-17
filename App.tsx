import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Clases from './src/screens/Clases';
import Notif from './src/screens/Notif';
import User from './src/screens/User';
import Login from './src/screens/Login';
import Recuperar from './src/screens/Recuperar';
import Register from './src/screens/Register';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{
      tabBarActiveBackgroundColor: '#1f1f1f',
      tabBarInactiveBackgroundColor: '#1e1e1e'
    }}>
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Clases" component={Clases} options={{ headerShown: false }} />
      <Tab.Screen name="Notificaciones" component={Notif} options={{ headerShown: false }} />
      <Tab.Screen name="User" component={User} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

function MyAdminTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name='User' component={User} options={{headerShown: false}}/>
    </Tab.Navigator>
  );
}

function AuthStacks() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Recuperar" component={Recuperar} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const userDoc = await firestore().collection('Users').doc(user.uid).get();
          const userData = userDoc.data();
          setRole(userData?.Role);
          setUser(user);
        } catch (error) {
          console.log("Error fetching user role:", error);
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? (
        role === true ? <MyAdminTabs /> : <MyTabs />
      ) : (
        <AuthStacks />
      )}
    </NavigationContainer>
  );
}
