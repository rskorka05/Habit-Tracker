/*import './App.css';
const express = require('express');
const bodyParser = require('body-parser');
const { firestore } = require('./firebase'); // Importuj obiekt firestore z pliku inicjalizacyjnego

const app = express();
app.use(bodyParser.json());

// Endpoint do dodawania nawyków
app.post('/habits', async (req, res) => {
  try {
    const habitData = req.body;

    // Dodaj nawyk do kolekcji
    await firestore.collection('habits').add(habitData);

    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Error adding habit to Firestore:', error);
    res.status(500).send('Internal Server Error');
  }
});
const getHabitsFromFirestore = async () => {
  try {
    const habitsCollection = firestore.collection('habits');

    // Pobierz wszystkie nawyki z kolekcji
    const snapshot = await habitsCollection.get();

    const habits = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log('Habits from Firestore:', habits);
  } catch (error) {
    console.error('Error getting habits from Firestore:', error);
  }
};

// Przykładowe użycie funkcji do odczytu nawyków
getHabitsFromFirestore();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});*/




