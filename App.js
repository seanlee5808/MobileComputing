import React, { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import SettingsScreen from './screens/SettingsScreen';
import AlarmContext from './screens/AlarmContext';
import { Image } from 'react-native';
import * as Notifications from 'expo-notifications';

const homeIcon = require('./icons/home.png');
const scheduleIcon = require('./icons/schedule.png');
const settingsIcon = require('./icons/settings.png');

const Tab = createBottomTabNavigator();

function MyTabs() {
  const [activeTab, setActiveTab] = useState(0);

  const selectTab = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: true,
        labelStyle: { fontSize: 10 },
        style: { position: 'absolute', bottom: 30, left: 20, right: 20, elevation: 50 },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? homeIcon : homeIcon;
          } else if (route.name === 'Schedule') {
            iconName = focused ? scheduleIcon : scheduleIcon;
          } else if (route.name === 'Settings') {
            iconName = focused ? settingsIcon : settingsIcon;
          }

          return <Image source={iconName} style={{ width: 30, height: 30 }} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Schedule" component={ScheduleScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [alarms, setAlarms] = useState([]);

  const addAlarm = (alarm) => {
    setAlarms(prevAlarms => [...prevAlarms, alarm]);
  };

  const removeAlarm = (alarmId) => {
    setAlarms(prevAlarms => prevAlarms.filter(alarm => alarm.id !== alarmId));
  };

  const toggleAlarm = (alarmId) => {
    setAlarms(prevAlarms => prevAlarms.map(alarm => {
      if (alarm.id === alarmId) {
        return { ...alarm, enabled: !alarm.enabled };
      } else {
        return alarm;
      }
    }));
  };

  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      if (Platform.OS === 'android') {
        Notifications.presentNotificationAsync({
          title: 'Received notification!',
          body: notification.request.content.body,
          sound: true,
        });
      }
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <AlarmContext.Provider
      value={{
        alarms,
        addAlarm,
        removeAlarm,
        toggleAlarm, // Add the toggleAlarm function to the context value
      }}
    >
      <NavigationContainer>
      <MyTabs />
      </NavigationContainer>
    </AlarmContext.Provider>
  );
}