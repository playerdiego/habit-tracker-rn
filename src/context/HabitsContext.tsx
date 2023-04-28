import React, { createContext, useContext, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, set, ref, push, get, DataSnapshot, update, remove } from "firebase/database";
import { getAuth } from 'firebase/auth';
import dayjs from 'dayjs';

import { AuthContext } from './AuthContext';
import { UIContext } from './UIContext';
import { Habit, HistoryItem, TodayHabit } from '../interfaces/habit.interface';
import { firebaseConfig } from '../../firebase-config';

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

const daysToNumber = (day: string) => {
  switch (day) {
    case 'monday':
      return 1
    case 'tuesday':
      return 2
    case 'wednesday':
      return 3
    case 'thursday':
      return 4
    case 'friday':
      return 5
    case 'saturday':
      return 6
    case 'sunday':
      return 7
    default:
      return 0
  }
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
  const {setLoading, i18n} = useContext(UIContext);

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
    setLoading(i18n.t('creatingHabit'));
    //Save the habit and return the key
    push(ref(db, 'users/' + currentUser?.uid + '/habits/'), habit)
      .then((snapshot) => {
        const {key} = snapshot;
        setHabits([...habits, {...habit, id: key!}]);

        //Check if habit must be completed the same day as created
        const days = getDays(habit.daysToShow);
        if(days.includes(today)) {
          // If must be completed, adds that habit to todayHabits and save it in DB with the habit id
          const newTodayHabit: TodayHabit = {
            title: habit.title,
            description: habit.description,
            icon: habit.icon,
            completed: false,
            id: key!,
            daysToShow: habit.daysToShow
          }
  
          set(ref(db, 'users/' + currentUser?.uid + '/history/' + todayDate + '/' + todayHabits.length + '/'), newTodayHabit)
            .catch(error => {
              alert(error);
              setLoading(null);
              console.error(error);
            })
          setTodayHabits([...todayHabits, newTodayHabit]);
  
          //Adds habit to the current dat history
  
          const updatedHistory: HistoryItem[] = history.map(historyItem => historyItem.day === todayDate ? {day: todayDate, data: [...todayHabits, newTodayHabit]} : historyItem );
          setHistory(updatedHistory);
  
        }

      })
      .catch(error => {
        console.error(error);
        alert(error);
      })
      .finally(() => {
        setLoading(null);
      })


  }


  // * DELETE HABIT 

  const deleteHabit = (habit: Habit) => {

    setLoading(i18n.t('deletingHabit'))

    const days = getDays(habit.daysToShow);

      remove(ref(db, 'users/' + currentUser?.uid + '/habits/' + habit.id))
        .then(() => {
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
        })
        .catch(error => {
          console.error(error);
          alert(error);
        })
        .finally(() => {
          setLoading(null);
        })

      


  }

  // * EDIT HABIT 

  const editHabit = (habit: Habit) => {

    setLoading(i18n.t('editingHabit'));

    const {title, description, icon, daysToShow, id, total, streak} = habit;

    //An array with the daysToShow
    const days = getDays(habit.daysToShow);

    const updatedHabits: Habit[] = habits.map(habitToFilter => habitToFilter.id === id ? habit : habitToFilter);

    setHabits(updatedHabits);

      update(ref(db, 'users/' + currentUser?.uid + '/habits/' + id), {
        title,
        description, 
        icon,
        daysToShow,
        total,
        streak
      })
      .then(() => {
        //Checks if the habit daysToShow includes the current day
        let updatedTodayHabits: TodayHabit[] = [];
        if(days.includes(today)) {

          // Checks if the habit is already in todayHabits
          const isHabitActive = todayHabits.find(todayHabit => todayHabit.id === habit.id);

          //If it is, edit it
          if (isHabitActive) {

            updatedTodayHabits = todayHabits.map(todayHabit => todayHabit.id === habit.id ? 
              {...todayHabit, title, description, icon, daysToShow} : todayHabit);

          // If it is not, add it
          } else {
            updatedTodayHabits = [
              ...todayHabits,
              {title,
              description,
              icon,
              completed: false,
              daysToShow,
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
      })
      .catch(error => {
        console.error(error);
        alert(error);
      })
      .finally(() => {
        setLoading(null);
      })

      

  }

  // * GET HABITS 
  const getHabits = async () => {
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

        return habitsResult;

      }).then((habitsResult) => {
        // * GET OR CREATE TODAY HABITS        
        let tempTodayHabits: TodayHabit[] = [];

        // Get today history 
        get(todayRef).then(snapshot => {
          //Check if it exists
          if(snapshot.val()) {
            //Traverse each item
            for (const key in snapshot.val()) {
              if (snapshot.val().hasOwnProperty(key)) {
                //Get the habit data
                const {title, description, icon, completed, id, daysToShow} = snapshot.val()[key];

                //Push in the temporal array
                tempTodayHabits.push({
                  title,
                  description,
                  icon,
                  completed,
                  id,
                  daysToShow
                });
              }
            }
            setTodayHabits(tempTodayHabits);

            // If doesnt exists, create it based on the habits that correspond that day
          } else {
            //Traverse the habit setup
            habitsResult.map(({title, description, daysToShow, icon, id}) => {
              //Traverse the day object and save in "days" only the true values
              const days = Object.keys(daysToShow).filter((dayToShow, i) => Object.values(daysToShow)[i] && dayToShow);
              if(days.includes(today)) {
                tempTodayHabits.push({
                  title,
                  description,
                  icon,
                  completed: false,
                  id,
                  daysToShow
                });
              }
            });
            set(todayRef, tempTodayHabits).then();
            setTodayHabits(tempTodayHabits);
            const tempHistory = [...history, {day: todayDate, data: tempTodayHabits}];
            setHistory(tempHistory);

            // Traverse every todayHabit
            tempTodayHabits.map(todayHabit => {
            
              // Set the dummy difference
              let diff: number = 8;
      
              // Treverse every dayToShow in the todayHabit
              Object.keys(todayHabit.daysToShow).map((day, i) => {
                //Checks if has to be shown
                if(Object.values(todayHabit.daysToShow)[i]) {
      
                  // Sets the difference between today and the day the habit had to be completed
                  // Example: Today (Friday) (5) - Day (Wednesday) (3) = 2 
                  let result = daysToNumber(today) - daysToNumber(day);

                  //Add 7 if the number is negative to get the real difference
                  // Example: Today (Monday) (1) - Day (Sunday) (7) = -6 + 7 = 1
                  if(result < 0) {
                    result+=7;
                  }
                  
                  //Checks if the result is lesser than the current difference and if its different to 0, and then sets the difference as the result
                  //This is to get the lesser value of the difference between the days
                  //In other words, get the difference between today and the last day the habit had to be completed
                  if(result < diff && result !== 0) {
                    diff = result;
                  }
      
                }
              });
            
              //When the difference is setted, gets the history of the current day - the difference
              //Example: Today 2023-04-25 - 2 = 2023-04-23

              //Gets the habits of the last day
              get(ref(db, 'users/' + currentUser?.uid + '/history/' + dayjs().subtract(diff, 'days').format('YYYY-MM-DD')))
                .then(snapshot => {
                  //If there´s no history for that day, break the streak
                  if(!snapshot.exists()) {
                    update(ref(db, 'users/' + currentUser?.uid + '/habits/' + todayHabit.id), {streak: 0})
                      .then(() => {
                        setHabits(habitsResult.map(habit => habit.id === todayHabit.id ? {...habit, streak: 0} : habit))
                      });
                  } else {
                      //Then gets the habit to check
                      const historyHabitToCheck: TodayHabit = snapshot.val().find((historyHabitItem: TodayHabit) => todayHabit.id === historyHabitItem.id)!;

                      // Gets the streak of that habit
                      const habitStreak: Habit = habitsResult.find(habit => habit.id === historyHabitToCheck.id)!;

                      //Checks if there´s streak and add 1, else sets streak to 0
                      update(ref(db, 'users/' + currentUser?.uid + '/habits/' + habitStreak.id), {
                        streak: historyHabitToCheck.completed ? habitStreak.streak + 1 : 0
                      }).then(() => {
                        setHabits(habitsResult.map(habit => habit.id === habitStreak.id ? {...habitStreak, streak:historyHabitToCheck.completed ? habitStreak.streak + 1 : 0} : habit))
                      });
                  }

                })
        
            });

          }

        });
      })
  }

  // * COMPLETE HABIT 

  const completeHabit = (habitId: string) => {

    setLoading(i18n.t('completingHabit'))

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
    const streak = isHabitCompleted ? habitToComplete?.streak! + 1 : habitToComplete?.streak! - 1;

    update(ref(db, 'users/' + currentUser?.uid + '/habits/' + habitId), {total, streak})
      .then(() => {
        const updatedHabits: Habit[] = habits.map(habit => habit.id === habitId ? {...habit, total, streak} : habit);
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
      })
      .catch(error => {
        console.error(error);
        alert(error);
      })
      .finally(() => {
        setLoading(null);
      })


    
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
      getHistory();
      getHabits();

    //If the user logout, delete habits, and history of the state
    if(!user) {
      setTodayHabits([]);
      setHabits([]);
      setHistory([]);
    }


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