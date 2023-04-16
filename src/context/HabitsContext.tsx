import React, { createContext, useContext, useEffect, useState } from 'react';
import { Habit, HistoryItem, TodayHabit } from '../interfaces/habit.interface';
import { firebaseConfig } from '../../firebase-config';
import { initializeApp } from 'firebase/app';
import { getDatabase, set, ref, push, get, DataSnapshot, update, remove } from "firebase/database";
import { getAuth } from 'firebase/auth';
import dayjs from 'dayjs';
import { AuthContext } from './AuthContext';

/* 
TODO
- Optimizaciones de imágenes
- Terminar streaks (rachas) (calendario y totals listos)
*/

// * FUNCTION TO GET THE DAYS TO SHOW OF ONE HABIT

const getDays = (daysToShow: {
  monday?: boolean | undefined;
  tuesday?: boolean | undefined;
  wednesday?: boolean | undefined;
  thursday?: boolean | undefined;
  friday?: boolean | undefined;
  saturday?: boolean | undefined;
  sunday?: boolean | undefined;
}) => {
  return Object.keys(daysToShow).filter((dayToShow, i) => Object.values(daysToShow)[i] && dayToShow);
}

// * PROPS 

interface HabitsContextProps {
  habits: Habit[],
  todayHabits: TodayHabit[],
  history: HistoryItem[],
  addHabit: (habit: Habit) => void,
  deleteHabit: (habit: Habit) => void,
  editHabit: (habit: Habit) => void,
  completeHabit: (habitId: string) => void
}

// * CONTEXT

export const HabitsContext = createContext<HabitsContextProps>({} as HabitsContextProps);

// * PROVIDER

export default function HabitsProvider({ children }: {children: React.ReactNode}) {

  // * FIREBASE INITIALIZE

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const {currentUser} = getAuth();
  const {user} = useContext(AuthContext);

  // * STATES
  const [habits, setHabits] = useState<Habit[]>([]);
  const [todayHabits, setTodayHabits] = useState<TodayHabit[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // * GET CURRENT DAY
  const today = dayjs().format('dddd').toLowerCase();
  const todayDate = dayjs().format('YYYY-MM-DD');

  // * DB REF
  const todayRef = ref(db, 'users/' + currentUser?.uid + '/history/' + todayDate);


  // * ADD HABIT 
  const addHabit = (habit: Habit) => {
    try {
      //Save the habit and return the key
      const habitKey = push(ref(db, 'users/' + currentUser?.uid + '/habits/'), habit).key;
      setHabits([...habits, {...habit, id: habitKey!}]);

      //Check if habit must be completed the same day as created
      const days = getDays(habit.daysToShow);
      if(days.includes(today)) {
        // If must be completed, adds that habit to todayHabits and save it in DB with the habit id
        const newTodayHabit: TodayHabit = {
          title: habit.title,
          description: habit.description,
          icon: habit.icon,
          completed: false,
          id: habitKey!,
        }

        set(ref(db, 'users/' + currentUser?.uid + '/history/' + todayDate + '/' + todayHabits.length + '/'), newTodayHabit);
        setTodayHabits([...todayHabits, newTodayHabit]);

        //Adds habit to the current dat history

        const updatedHistory: HistoryItem[] = history.map(historyItem => historyItem.day === todayDate ? {day: todayDate, data: [...todayHabits, newTodayHabit]} : historyItem );
        setHistory(updatedHistory);

      }
      
    } catch (error) {
      console.error(error);
      alert(error);
    }


  }


  // * DELETE HABIT 

  const deleteHabit = (habit: Habit) => {

    const days = getDays(habit.daysToShow);

    try {
      remove(ref(db, 'users/' + currentUser?.uid + '/habits/' + habit.id));

      const updatedHabits: Habit[] = habits.filter(habitToFilter => habitToFilter.id !== habit.id);
      setHabits(updatedHabits);

      //Check if the deleted habit is in the today history
      if(days.includes(today)) {

        //Delete the habit in todayHabits, update state and DB
        const updatedTodayHabits = todayHabits.filter(habitToFilter => habitToFilter.id !== habit.id);
        setTodayHabits(updatedTodayHabits);
        set(todayRef, updatedTodayHabits);

        // Update the history in the current day
        const updatedHistory: HistoryItem[] = history.map(historyItem => historyItem.day === todayDate ? {day: todayDate, data: updatedTodayHabits} : historyItem );
        setHistory(updatedHistory);


      }

    } catch (error) {
      console.error(error);
      alert(error);
    }


  }

  // * EDIT HABIT 

  const editHabit = (habit: Habit) => {

    const {title, description, icon, daysToShow, id, total} = habit;

    //An array with the daysToShow
    const days = getDays(habit.daysToShow);

    const updatedHabits: Habit[] = habits.map(habitToFilter => habitToFilter.id === id ? habit : habitToFilter);

    setHabits(updatedHabits);

    try {

      set(ref(db, 'users/' + currentUser?.uid + '/habits/' + id), {
        title,
        description, 
        icon,
        daysToShow,
        total
      });

      //Checks if the habit daysToShow includes the current day
      let updatedTodayHabits: TodayHabit[] = [];
      if(days.includes(today)) {

        // Checks if the habit is already in todayHabits
        const isHabitActive = todayHabits.find(todayHabit => todayHabit.id === habit.id);

        //If it is, edit it
        if (isHabitActive) {

          updatedTodayHabits = todayHabits.map(todayHabit => todayHabit.id === habit.id ? 
            {...todayHabit, title, description, icon} : todayHabit);

        // If it is not, add it
        } else {
          updatedTodayHabits = [
            ...todayHabits,
            {title,
            description,
            icon,
            completed: false,
            id}
          ];
        }
        
        //If is not in the current day, delete it
      } else {
        //Create a new array of todayHabits without the edited habit
        updatedTodayHabits = todayHabits.filter(habitToDelete => (habitToDelete.id !== id) && habitToDelete);
      }

      const updatedHistory: HistoryItem[] = history.map(historyItem => historyItem.day === todayDate ? {day: todayDate, data: updatedTodayHabits} : historyItem );

      setHistory(updatedHistory);
      set(todayRef, updatedTodayHabits);
      setTodayHabits(updatedTodayHabits);


    } catch (error) {
      console.error(error);
    }

  }

  // * GET HABITS 

  const getHabits = () => {
    //Get habits from DB
    get(ref(db, 'users/' + currentUser?.uid + '/habits/'))
      .then((value: DataSnapshot) => {

        const habitsResult: Habit[] = [];
        // Traverse the result to format as an array and add the id (key)
        for (const key in value.val()) {
          if (value.val().hasOwnProperty(key)) {
            habitsResult.push({...value.val()[key], id: key});
          }
        }
        setHabits(habitsResult);
      })
  }

  // * GET OR CREATE TODAY HABITS

  const getOrCreateTodayHabits = () => {
    
    // Temporal array to save the today habits formated
    let tempTodayHabits: TodayHabit[] = [];

    // Get today history 
    get(todayRef).then(snapshot => {
      //Check if it exists
      if(snapshot.val()) {
        //Traverse each item
        for (const key in snapshot.val()) {
          if (snapshot.val().hasOwnProperty(key)) {
            //Get the habit data
            const {title, description, icon, completed, id} = snapshot.val()[key];

            //Push in the temporal array
            tempTodayHabits.push({
              title,
              description,
              icon,
              completed,
              id,
            });
          }
        }
        setTodayHabits(tempTodayHabits);

        // If doesnt exists, create it based on the habits that correspond that day
      } else {
        //Traverse the habit setup
        habits.map(({title, description, daysToShow, icon, id}) => {
          //Traverse the day object and save in "days" only the true values
          const days = Object.keys(daysToShow).filter((dayToShow, i) => Object.values(daysToShow)[i] && dayToShow);
          if(days.includes(today)) {
            tempTodayHabits.push({
              title,
              description,
              icon,
              completed: false,
              id,
            });
          }
        });
        set(todayRef, tempTodayHabits);
        setTodayHabits(tempTodayHabits);
      }
    });

  }

  // * COMPLETE HABIT 

  const completeHabit = (habitId: string) => {

    let isHabitCompleted: boolean = false;

    //Traverse the todayHabits and update the completed state if id match
    const updatedTodayHabits: TodayHabit[] = todayHabits.map(habit => {
      if(habit.id === habitId){
        isHabitCompleted = !habit.completed;
        return {...habit, completed: !habit.completed} 
      } else {
        return habit
      }
    });

    const habitToComplete = habits.find(habit => habit.id === habitId);
    const total = isHabitCompleted ? habitToComplete?.total! + 1 : habitToComplete?.total! - 1;

    update(ref(db, 'users/' + currentUser?.uid + '/habits/' + habitId), {total});

    const updatedHabits: Habit[] = habits.map(habit => habit.id === habitId ? {...habit, total} : habit);
    setHabits(updatedHabits);

    
    // Check if theres history in the current day
    const todayHistory = history.find(historyItem => historyItem.day === todayDate);

    // If there´s, update the state of the updated habit
    if(todayHistory) {
      const updatedHistoryItem: TodayHabit[] = todayHistory!.data.map(habit => 
          habit.id === habitId ? {...habit, completed: !habit.completed} : habit);
  
      const updatedHistory: HistoryItem[] = history.map(historyItem => 
          historyItem.day === todayHistory?.day ? {day: todayHistory.day, data: updatedHistoryItem} : historyItem);

  
      setHistory(updatedHistory);
    }

    //Set the new values in the state and update DB
    setTodayHabits(updatedTodayHabits);
    set(todayRef, updatedTodayHabits);

    
  }

  // * GET HISTORY 
  const getHistory = () => {

    const tempHistory: HistoryItem[] = [];

    get(ref(db, 'users/' + currentUser?.uid + '/history'))
      .then((value: DataSnapshot) => {
        
        value.forEach((historyItem: DataSnapshot) => {
          tempHistory.push({day: historyItem.key!, data: historyItem.val()})
        });

      });

      setHistory(tempHistory);
  }
  

  // * INITIALIZE OR CLEAR DATA ON USER AUTH

  useEffect(() => {
    //Every time an user login, get his habits
    getHabits();
    getOrCreateTodayHabits();

    //If the user logout, delete habits, and history of the state
    if(!user) {
      setTodayHabits([]);
      setHabits([]);
    }

    getHistory();

  }, [user]);
  
  

  return (
    <HabitsContext.Provider value={{
      habits,
      todayHabits,
      history,
      addHabit,
      deleteHabit,
      editHabit,
      completeHabit
    }}>
        {children}
    </HabitsContext.Provider>
  )
}