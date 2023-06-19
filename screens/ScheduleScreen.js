import React, { useContext, useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Switch } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AlarmContext from './AlarmContext';

function ScheduleScreen() {
    const { alarms, toggleAlarm } = useContext(AlarmContext);
    const [markedDates, setMarkedDates] = useState({});
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        createMarkedDates();
    }, [alarms]);

    const createMarkedDates = () => {
        let markedEvents = {};
        let numEvents = {};

        let dates = alarms.map(alarm => alarm.time.toISOString().slice(0, 10));

        dates.forEach(function (count) {
            numEvents[count] = (numEvents[count] || 0) + 1;
        });

        let uniqueDates = [...new Set(dates)];

        uniqueDates.forEach(function (date) {
            let dots = [];
            let markedData = {};
            for (let i = 0; i < numEvents[date]; i++) {
                dots.push({ color: 'red' }); 
            }
            markedData['dots'] = dots; 
            markedEvents[date] = markedData;
        });

        setMarkedDates(markedEvents);
    }

    const onDayPress = (day) => {
        setSelectedDate(day.dateString);
    }

    const renderAlarm = (alarm) => (
        <View style={styles.alarmContainer}>
            <Text style={styles.alarmText}>{alarm.time.toLocaleTimeString()}</Text>
            <Switch
                value={alarm.enabled}
                onValueChange={(newValue) => toggleAlarm(alarm.id)}
                style = {{top: 5}}

            />
        </View>
    );

    return (
        <View style={styles.container}>
            <Calendar
                markedDates={markedDates}
                onDayPress={onDayPress}
            />
            <FlatList
                data={alarms.filter(alarm => alarm.time.toISOString().slice(0, 10) === selectedDate)}
                renderItem={({ item }) => renderAlarm(item)}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 500,
    },
    alarmContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    alarmText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
});

export default ScheduleScreen;
