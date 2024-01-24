// HabitsComponent.js
/*import React, { useEffect, useState } from 'react';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore'; // Poprawny import

const HabitsComponent = () => {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const db = getFirestore();
    const habitsRef = collection(db, 'habits');

    const unsubscribe = onSnapshot(habitsRef, (snapshot) => {
      const newHabits = snapshot.docs.map((doc) => {
        const data = doc.data();
        return { id: doc.id, ...data };
      });
      setHabits(newHabits);
    });

    return () => {
      // Anulowanie subskrypcji przy opuszczeniu komponentu
      unsubscribe();
    };
  }, []); // [] sprawia, że useEffect działa tylko przy zamontowaniu komponentu

  return (
    <div>
      <h1>Habits</h1>
      <ul>
        {habits.map((habit) => (
          <li key={habit.id}>{habit.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default HabitsComponent;*/
import { useEffect, useState } from 'react';
import { firestore } from './config/firebase';

const HabitsComponent = () => {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    // Pobierz referencję do kolekcji "habits"
    const habitsCollection = firestore.collection('habits');

    // Użyj metody "get" do pobrania danych z kolekcji
    habitsCollection.get().then((snapshot) => {
      const newHabits = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setHabits(newHabits);
    });

    // Dodaj nasłuchiwanie zmian w czasie rzeczywistym (opcjonalne)
    const unsubscribe = habitsCollection.onSnapshot((snapshot) => {
      const newHabits = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setHabits(newHabits);
    });

    // Zwróć funkcję do czyszczenia subskrypcji przy odmontowaniu komponentu
    return () => {
      unsubscribe();
    };
  }, []); // Pusta tablica oznacza, że useEffect wykonuje się tylko raz przy zamontowaniu komponentu

  return (
    <div>
      <h2>Habits</h2>
      <ul>
        {habits.map((habit) => (
          <li key={habit.id}>{habit.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default HabitsComponent;



