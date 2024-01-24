// ReminderComponent.js

import React, { useState, useEffect } from 'react';
//import { firestore } from './config/firebase';

const ReminderComponent = () => {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const fetchReminders = async () => {
      const remindersCollection = await firestore.collection('reminders').get();
      const remindersData = remindersCollection.docs.map((doc) => doc.data());
      setReminders(remindersData);
    };

    fetchReminders();
  }, []);

  /*// Dodawanie przypomnienia    
    const addReminder = async (text) => {
    await firestore.collection('reminders').add({
      text,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };*/

  return (
    <div>
      <h2>Reminders</h2>
      <ul>
        {reminders.map((reminder, index) => (
          <li key={index}>{reminder.text}</li>
        ))}
      </ul>
    </div>
  );
};



export default ReminderComponent;
