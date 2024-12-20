import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Image } from 'react-native';
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
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AddClases from './src/screens/AddClases';
import Tokenrequest from './src/screens/Tokenrequest';
import AddNotif from './src/screens/AddNotif';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyTabs() {
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);
  const userId = auth().currentUser?.uid;

  useEffect(() => {
    if (userId) {
      const unsubscribe = firestore()
        .collection('Notifications')
        .onSnapshot(querySnapshot => {
          let unreadCount = 0;
          querySnapshot.forEach(doc => {
            const data = doc.data();
            if (!data.readBy || !Array.isArray(data.readBy)) {
              data.readBy = [];
            }
            if (!data.readBy.includes(userId)) {
              unreadCount++;
            }
          });
          setUnreadNotificationsCount(unreadCount);
        });

      return () => unsubscribe(); 
    }
  }, [userId]);

  return (
    <Tab.Navigator screenOptions={{
      tabBarActiveBackgroundColor: '#1f1f1f',
      tabBarInactiveBackgroundColor: '#1e1e1e',
      tabBarStyle:{
        height: 55,
        borderColor: '#0e0e0e',
        borderWidth: 0
      }
    }}>
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false , tabBarIcon : ({focused}) => (
        <Image
          source={focused ? require('./src/assets/homeblu.png') : require('./src/assets/homewhite.png')}
          style={{width: 34, height: 34}}
          resizeMode='contain'
        />
      )}} />
      <Tab.Screen name="Clases" component={Clases} options={{ headerShown: false , tabBarIcon : ({focused}) => (
        <Image
          source={focused ? require('./src/assets/dumbbell_blu.png') : require('./src/assets/dumbbell_white.png')}
          style={{width: 34, height: 34}}
          resizeMode='contain'
        />
      )}} />
      <Tab.Screen name="Notificaciones" component={Notif} options={{ headerShown: false , tabBarIcon : ({focused}) => (
        <View style={{ position: 'relative' }}>
          <Image
            source={focused ? require('./src/assets/notif_blu.png') : require('./src/assets/notif_white.png')}
            style={{width: 34, height: 34}}
            resizeMode='contain'
          />
          {unreadNotificationsCount > 0 && (
            <View style={{
              position: 'absolute',
              top: -5,
              right: -5,
              backgroundColor: 'red',
              borderRadius: 50,
              width: 10,
              height: 10,
            }} />
          )}
        </View>
      )}} />
      <Tab.Screen name="User" component={User} options={{ headerShown: false , tabBarIcon : ({focused}) => (
        <Image
          source={focused ? require('./src/assets/user_blu.png') : require('./src/assets/user_white.png')}
          style={{width: 34, height: 34}}
          resizeMode='contain'
        />
      )}} />
    </Tab.Navigator>
  );
}

function MyAdminTabs() {
  return (
    <Tab.Navigator screenOptions={{
      tabBarActiveBackgroundColor: '#1f1f1f',
      tabBarInactiveBackgroundColor: '#1e1e1e',
      tabBarStyle:{
        height: 55,
        borderColor: '#0e0e0e',
        borderWidth: 0
      }
    }}>
      <Tab.Screen name='TokensRequest' component={Tokenrequest} options={{headerShown: false , tabBarIcon : ({focused}) => (
        <Image
          source={focused ? require('./src/assets/tokenadd_blue.png') : require('./src/assets/tokenadd_white.png')}
          style={{width: 34, height: 34}}
          resizeMode='contain'
        />
      )}} />
      <Tab.Screen name='Clases' component={AddClases} options={{headerShown: false , tabBarIcon : ({focused}) => (
        <Image
          source={focused ? require('./src/assets/dumbbell_blu.png') : require('./src/assets/dumbbell_white.png')}
          style={{width: 34, height: 34}}
          resizeMode='contain'
        />
      )}} />
      <Tab.Screen name='AddNotif' component={AddNotif} options={{headerShown: false , tabBarIcon : ({focused}) => (
        <Image
          source={focused ? require('./src/assets/subir2.png') : require('./src/assets/subir1.png')}
          style={{width: 34, height: 34}}
          resizeMode='contain'
        />
      )}} />
      <Tab.Screen name='User' component={User} options={{headerShown: false , tabBarIcon : ({focused}) => (
        <Image
          source={focused ? require('./src/assets/user_blu.png') : require('./src/assets/user_white.png')}
          style={{width: 34, height: 34}}
          resizeMode='contain'
        />
      )}} />
      
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
    <GestureHandlerRootView>
      <NavigationContainer>
        {user ? (
          role === true ? <MyAdminTabs /> : <MyTabs />
        ) : (
          <AuthStacks />
        )}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
