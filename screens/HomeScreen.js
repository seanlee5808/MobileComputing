import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AlarmContext from './AlarmContext';
import posture1Image from './posture1.png';
import posture2Image from './posture2.png';
import posture3Image from './posture3.png';
import posture4Image from './posture4.png';
import posture5Image from './posture5.png';
import posture6Image from './posture6.png';

export const postures = {
  posture1: posture1Image,
  posture2: posture2Image,
  posture3: posture3Image,
  posture4: posture4Image,
  posture5: posture5Image,
  posture6: posture6Image,
};

function HomeScreen() {
  const { alarms } = useContext(AlarmContext);

  // If there are no alarms, display a default message
  if (alarms.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No alarms set</Text>
      </View>
    );
  }

  // Filter for alarms that are still upcoming, sort them by time, and pick the first one
  const now = new Date();
  const upcomingAlarms = alarms.filter(alarm => alarm.time > now);
  upcomingAlarms.sort((a, b) => a.time - b.time);
  const nextAlarm = upcomingAlarms[0];

  // If there are no upcoming alarms, display a default message
  if (!nextAlarm) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No upcoming alarms</Text>
      </View>
    );
  }

  // Calculate the time remaining until the next alarm
  const msPerMinute = 60000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msUntilNextAlarm = nextAlarm.time - now;
  const hoursUntilNextAlarm = Math.floor(msUntilNextAlarm / msPerHour);
  const minutesUntilNextAlarm = Math.floor((msUntilNextAlarm % msPerHour) / msPerMinute);

  return (
    <View style={styles.container}>
      <Image source= {posture2Image} style={styles.postureImage} />
      <Text style={styles.text}>Next alarm:</Text>
      <Text style={styles.text}>{nextAlarm.time.toLocaleTimeString()}</Text>
      <Text style={styles.text}>Time remaining:</Text>
      <Text style={styles.text}>{hoursUntilNextAlarm} hours, {minutesUntilNextAlarm} minutes</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postureImage: {
    width: 200,
    height: 200,
    bottom: 30,
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
