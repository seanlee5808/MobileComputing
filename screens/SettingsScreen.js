import React, { useState, useContext } from 'react';
import { Button, View, Image, Alert, StyleSheet, Text, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
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

const postureKeys = Object.keys(postures);

function SettingsScreen({ navigation }) {
  const { addAlarm } = useContext(AlarmContext);
  const [time, setTime] = useState(new Date());
  const [postureIndex, setPostureIndex] = useState(0);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onChange = (event, selectedDate) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setTime(selectedDate);
    }
  };

  const handleSetAlarm = () => {
    Alert.alert(`Alarm set for ${time.toLocaleTimeString()} with posture ${postureIndex + 1}`);
    addAlarm({ id: Math.random().toString(), time, posture: postureKeys[postureIndex], enabled: true });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Button title="Select Time" onPress={() => setShowTimePicker(true)} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={showTimePicker}
        onRequestClose={() => setShowTimePicker(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <DateTimePicker
              value={time}
              mode={'datetime'}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
            <Button title="Done" onPress={() => setShowTimePicker(false)} />
          </View>
        </View>
      </Modal>
      <View style={styles.postureContainer}>
        {postureKeys.map((postureKey, index) => (
          <View key={index} style={styles.postureItem}>
            <Button
              title={`Posture ${index + 1}`}
              onPress={() => setPostureIndex(index)}
            />
            <Image source={postures[postureKey]} style={styles.postureImage} />
          </View>
        ))}
      </View>
      <Button title="Set Alarm" onPress={handleSetAlarm} />
      <View style={styles.currentSettings}>
        <Text>Current Time: {time.toLocaleTimeString()}</Text>
        <Text>Current Posture: {postureIndex + 1}</Text>
        <Image source={postures[postureKeys[postureIndex]]} style={styles.postureImage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  postureContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  postureItem: {
    margin: 10,
    alignItems: 'center',
  },
  postureImage: {
    width: 90,
    height: 90
  },
  currentSettings: {
    marginTop: 20,
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
});

export default SettingsScreen;
