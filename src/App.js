import React, { Component } from 'react';
import './App.css';
import ProgressBar from './ProgressBar';
//import { firestore } from './config/firebase';
import HabitsComponent from './HabitsComponent';
import { Doughnut } from 'react-chartjs-2';
import { firebase, firestore } from './config/firebase';

class App extends Component {

  state = {
    habits: [],
    newHabit: '',
    completedCount: 0,
    habitAdded: false,
    habitRemoved: false,
    showCongratulations: false, 
    completionPercentage: 0,
    favoriteHabits: [], 
    showSuggestions: false,
    showAllFavorites: true,
    addedFavorites: [],
    currentDay: '',
    currentDate: '',
  };
  
  updateCurrentDayAndDate = () => {
    const daysOfWeek = ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota'];
    const months = [
      'stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca',
      'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'
    ];
    const today = new Date();
    const dayOfWeek = daysOfWeek[today.getDay()];
    const dayOfMonth = today.getDate();
    const month = months[today.getMonth()];
    const year = today.getFullYear();

    const formattedDate = `${dayOfMonth} ${month} ${year}`;

    this.setState({
      currentDay: dayOfWeek,
      currentDate: formattedDate,
    });
  };

  componentDidMount() {
    // ... (reszta funkcji componentDidMount)

    // Dodaj tę linijkę do istniejącego kodu componentDidMount
    this.updateCurrentDayAndDate();
  }
  /*handleAddHabit = () => {
    const { habits, newHabit } = this.state;
    if (newHabit.trim() !== '') {
      const newHabitObject = { name: newHabit, completed: false };
      this.setState({
        habits: [...habits, newHabitObject],
        newHabit: '',
        habitAdded: true,
      });
      this.addedHabit = true;

      setTimeout(() => {
        this.setState({ habitAdded: false });
      }, 500);
    }
  };*/

  handleAddHabit = () => {
    const { habits, newHabit, showCongratulations } = this.state;
    if (newHabit.trim() !== '') {
      const newHabitObject = { name: newHabit, completed: false };
      const updatedHabits = [...habits, newHabitObject];
      this.setState({
        habits: updatedHabits,
        newHabit: '',
        habitAdded: true,
      });
  
      setTimeout(() => {
        this.setState({ habitAdded: false });
      }, 500);
  
      // Ukryj komunikat gratulacyjny po dodaniu nawyku
      if (showCongratulations) {
        this.setState({ showCongratulations: false });
      }
    }
  };

  handleRemoveHabit = (habitToRemove) => {
    const { habits, completedCount } = this.state;
    const updatedHabits = habits.filter((habit) => habit !== habitToRemove);
    const updatedCompletedCount = habitToRemove.completed ? completedCount - 1 : completedCount;
    this.setState({ 
      habits: updatedHabits,
      completedCount: updatedCompletedCount,
      habitRemoved: true,
    });

    setTimeout(() => {
      this.setState({ habitRemoved: false });
    }, 500);
  };

  /*handleCompleteHabit = async (habitToComplete) => {
    const { habits, showCongratulations } = this.state;
    console.log('Before update:', habits);
  
    const updatedHabits = habits.map((habit) =>
      habit.name === habitToComplete.name ? { ...habit, completed: !habit.completed } : habit
    );
  
    console.log('After update:', updatedHabits);
  
    const completedCount = updatedHabits.filter((habit) => habit.completed).length;
  
    console.log('Completed count:', completedCount);
  
    this.setState({ habits: updatedHabits, completedCount });
  
    // Dodaj kod do ustawiania przypomnienia w Firebase
    if (!habitToComplete.completed) {
      try {
        const habitRef = firestore.collection('habits').doc(habitToComplete.name);
        await habitRef.set({
          completed: true,
          completionTimestamp: new Date(),
        });
        
        console.log('Firebase updated:', habitToComplete.name);
      } catch (error) {
        console.error('Error updating Firebase:', error);
      }
    }
  };*/

  handleCompleteHabit = async (habitToComplete) => {
    const { habits, showCongratulations } = this.state;
    const updatedHabits = habits.map((habit) =>
      habit.name === habitToComplete.name ? { ...habit, completed: !habit.completed } : habit
    );
  
    const completedCount = updatedHabits.filter((habit) => habit.completed).length;
  
    this.setState({ habits: updatedHabits, completedCount });
  
    // Dodaj kod do ustawiania przypomnienia w Firebase
    if (!habitToComplete.completed) {
      try {
        const habitRef = firestore.collection('habits').doc(habitToComplete.name);
        await habitRef.set({
          completed: true,
          completionTimestamp: new Date(),
        });
  
        console.log('Firebase updated:', habitToComplete.name);
      } catch (error) {
        console.error('Error updating Firebase:', error);
      }
    }
  
    // Sprawdź, czy wszystkie nawyki są zaznaczone
    if (completedCount === habits.length && !showCongratulations) {
      this.setState({ showCongratulations: true });
    } else if (completedCount !== habits.length && showCongratulations) {
      this.setState({ showCongratulations: false });
    }
  };
  
  handleToggleFavorite = (habitToToggle) => {
    const { habits } = this.state;
    const updatedHabits = habits.map((habit) =>
      habit.name === habitToToggle.name ? { ...habit, favorite: !habit.favorite } : habit
    );

    this.setState({ habits: updatedHabits });
  };

  handleShowSuggestions = () => {
    const { habits, showSuggestions } = this.state;
    //const favoriteHabits = habits.filter((habit) => habit.favorite);

    /*this.setState({
      favoriteHabits,
      showSuggestions: true,
    });*/
    if(!showSuggestions){
      const favoriteHabits = habits.filter((habit) => habit.favorite);
      this.setState({
        favoriteHabits,
      })
    }
    this.setState((prevState) => ({
      showSuggestions: !prevState.showSuggestions,
    }));
  }

  handleAddSuggestedHabit = (suggestedHabit) => {
    const { habits, showAllFavorites, addedFavorites } = this.state;
    const updatedHabits = [...habits, { ...suggestedHabit, favorite: true }];
    const updatedAddedFavorites = [...addedFavorites, suggestedHabit];

    this.setState({
      habits: showAllFavorites ? updatedHabits : [suggestedHabit],
      showSuggestions: false,
      showAllFavorites: false,
      addedFavorites: updatedAddedFavorites,
    });
  };

  handleRemoveSuggestedHabit = (suggestedHabit) => {
    const { favoriteHabits } = this.state;
    const updatedSuggestions = favoriteHabits.filter((habit) => habit !== suggestedHabit);
    this.setState({ favoriteHabits: updatedSuggestions });
  };

  fetchReminders = async () => {
    try {
      const remindersRef = firestore.collection('reminders');
      const snapshot = await remindersRef.get();

      const reminders = snapshot.docs.map((doc) => {
        const data = doc.data();
        return { id: doc.id, text: data.text, completed: data.completed };
      });

      this.setState({ reminders });
    } catch (error) {
      console.error('Error fetching reminders from Firebase:', error);
    }
  };

  handleCompleteReminder = async (reminderToComplete) => {
    try {
      const remindersRef = firestore.collection('reminders').doc(reminderToComplete.id);
      await remindersRef.update({
        completed: true,
      });

      const updatedReminders = this.state.reminders.map((reminder) =>
        reminder.id === reminderToComplete.id ? { ...reminder, completed: true } : reminder
      );

      this.setState({ reminders: updatedReminders });
    } catch (error) {
      console.error('Error completing reminder in Firebase:', error);
    }
  };

  handleCompleteHabit = async (habitToComplete) => {
    const { habits, showCongratulations } = this.state;
  
    const updatedHabits = habits.map((habit) =>
      habit.name === habitToComplete.name ? { ...habit, completed: !habit.completed } : habit
    );
  
    const completedCount = updatedHabits.filter((habit) => habit.completed).length;
  
    this.setState({ habits: updatedHabits, completedCount });
    this.updateProgressBar();

    if (!habitToComplete.completed) {
      try {
        const habitRef = firestore.collection('habits').doc(habitToComplete.name);
        await habitRef.update({
          completed: true,
          completionTimestamp: new Date(),
        });
  
        console.log('Firebase updated:', habitToComplete.name);
      } catch (error) {
        console.error('Error updating Firebase:', error);
      }
    }
  };

  // Reszta kodu...
  /*componentDidMount() {
    try {
      // Pobierz nawyki
      const habitsRef = firestore.collection('habits');
      habitsRef.get().then((snapshot) => {
        const habits = snapshot.docs.map((doc) => {
          const data = doc.data();
          return { name: doc.id, completed: data.completed };
        });

        const completedCount = habits.filter((habit) => habit.completed).length;
        this.setState({ habits, completedCount });

        // Pobierz przypomnienia
        this.fetchReminders();
      });
    } catch (error) {
      console.error('Error fetching data from Firebase:', error);
    }
  }*/
  handleChange = (event) => {
    this.setState({ newHabit: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.handleAddHabit();
  };

  shortenText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + '...';
    }
    return text;
  };

  updateProgressBar = () => {
    this.setState((prevState) => {
      const { habits, showCongratulations } = prevState;
      const totalCount = habits.length;
      const completedCount = habits.filter((habit) => habit.completed).length;
      const completionPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  
      if (completionPercentage === 100 && !showCongratulations) {
        return { showCongratulations: true };
      }
  
      return null; // Bez zmian w stanie
    });
  };

  resetCongratulationsMessage = () => {
    this.setState({ showCongratulations: false });
  };
  
  componentDidUpdate() {
    if (this.state.showCongratulations) {
      setTimeout(this.resetCongratulationsMessage, 10000); // Zresetuj komunikat po 5 sekundach
    }
  }
  
  render() {
    const { habits, newHabit, completedCount, addedHabit, removedHabit, showCongratulations, completionPercentage, favoriteHabits, showSuggestions, showAllFavorites, addedFavorites, currentDay, currentDate  } = this.state;

    const allCompleted = completedCount === habits.length;
    console.log('Show Congratulations:', showCongratulations);

    return (
<div className='App'>
        <h1>Habit Tracker</h1>
        <h2>Mój dzień</h2>
        <p className='p-date'>{`${currentDay}, ${currentDate}`}</p>

        <div>
          <ProgressBar habits={habits} />
          {showCongratulations &&  
            <p className='congratulations-message'>Gratulacje!</p>}
          
            <div>
              <p className='p-completedCount'>Wykonane: {completedCount}</p>
              
            </div>
          
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder='Enter a new habit'
              value={newHabit}
              onChange={this.handleChange}
            />
            <button type="submit" onClick={this.handleAddHabit}>
              Add Habit
            </button>
          </form>
        </div>

        <div className='habit-list'>
          <ul>
            {habits.map((habit, index) => (
              <li key={index} className={`habit-item ${habit.completed ? 'completed' : ''}`}>
                <div
                  className={`complete-button ${habit.completed ? 'completed' : ''}`}
                  onClick={() => this.handleCompleteHabit(habit)}
                >
                  {habit.completed ? '✓' : ''}
                </div>
                <div
                  className={`favorite-button ${habit.favorite ? 'favorited' : ''}`}
                  onClick={() => this.handleToggleFavorite(habit)}
                >
                  {habit.favorite ? '★' : '☆'}
                </div>
                <div className='habit-details'>
                  <span className={`habit-name ${habit.completed ? 'completed' : ''}`}>
                    {this.shortenText(habit.name, 20)}
                  </span>
                  {!habit.completed && (
                    <button className="remove-button" onClick={() => this.handleRemoveHabit(habit)}>
                      Remove
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        <button onClick={this.handleShowSuggestions}>Sugestie</button>
        
          {showAllFavorites
            ? favoriteHabits.map((habit, index) => (
        <div className='sugestie' key={index}>
        <li>
          {this.shortenText(habit.name, 20)}{' '}
        
        <button onClick={() => this.handleAddSuggestedHabit(habit)} disabled={addedFavorites.includes(habit)}>Add</button>
        <button onClick={() => this.handleRemoveSuggestedHabit(habit)}>Remove</button>
      </li>
      </div>
    ))
  : null}
  
      </div>
    );
  }
}

export default App;

