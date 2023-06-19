// AlarmContext.js
import React from 'react';
import * as Notifications from 'expo-notifications';

function scheduleNotification(alarm) {
    const trigger = new Date(alarm.time);
    trigger.setSeconds(0);
    const notificationId = Notifications.scheduleNotificationAsync({
        content: {
            title: 'Alarm!',
            body: 'This is your scheduled alarm.',
            data: { alarmId: alarm.id },
        },
        trigger,
    });
    return notificationId;
}

export function cancelNotification(notificationId) {
    Notifications.cancelScheduledNotificationAsync(notificationId);
}

// in your toggleAlarm function...
toggleAlarm = (alarmId) => {
  setAlarms((prevAlarms) =>
    prevAlarms.map((alarm) => {
      if (alarm.id === alarmId) {
        if (alarm.enabled) {
          cancelNotification(alarm.notificationId);
        } else {
          const notificationId = scheduleNotification(alarm);
          alarm.notificationId = notificationId;
        }
        return { ...alarm, enabled: !alarm.enabled };
      }
      return alarm;
    })
  );
};
const AlarmContext = React.createContext({
  alarms: [],
  addAlarm: () => {},
  removeAlarm: () => {},
  toggleAlarm: () => {}
});

export default AlarmContext;
