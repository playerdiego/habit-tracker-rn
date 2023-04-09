import React, { createContext, useContext, useEffect, useState } from 'react';
import { Habit, TodayHabit } from '../interfaces/habit.interface';
import { firebaseConfig } from '../../firebase-config';
import { initializeApp } from 'firebase/app';
import { getDatabase, set, ref, push, get, DataSnapshot, onValue, remove } from "firebase/database";
import { getAuth } from 'firebase/auth';
import dayjs from 'dayjs';
import { AuthContext } from './AuthContext';

interface HabitsContextProps {
  habits: Habit[],
  todayHabits: TodayHabit[],
  addHabit: (habit: Habit) => void
}

export const HabitsContext = createContext<HabitsContextProps>({} as HabitsContextProps);


export default function HabitsProvider({ children }: {children: React.ReactNode}) {

  const app = initializeApp(firebaseConfig);
  const {currentUser} = getAuth();
  const db = getDatabase(app);
  const {user} = useContext(AuthContext);

  const [habits, setHabits] = useState<Habit[]>([]);
  const [todayHabits, setTodayHabits] = useState<TodayHabit[]>([]);

  // Obtener el nombre del día actual
  const today = dayjs().format('dddd');

  //Referencia de la base de datos
  const todayRef = ref(db, 'users/' + currentUser?.uid + '/history/' + dayjs().format('DD-MM-YYYY'));

  const addHabit = (habit: Habit) => {
    try {
      //Guarda el hábito y retorna la llave
      const habitKey = push(ref(db, 'users/' + currentUser?.uid + '/habits/'), habit).key;
      alert('Habit has been created');

      //Verifica si el hábito se debe cumplir el mismo día que fue creado
      if(Object.keys(habit.daysToShow).includes(today.toLowerCase())) {
        //Si sí, añade ese hábito al historial de todayHabits y lo guarda en la DB con el id del hábito setup
        set(ref(db, 'users/' + currentUser?.uid + '/history/' + dayjs().format('DD-MM-YYYY') + '/' + todayHabits.length + '/'), {
          title: habit.title,
          description: habit.description,
          icon: habit.icon,
          completed: false,
          id: habitKey,
        })
      }
      
    } catch (error) {
      console.error(error);
      alert(error);
    }


    setHabits([...habits, habit])
  }

  const getHabits = () => {
    //Se piden los hábitos
    get(ref(db, 'users/' + currentUser?.uid + '/habits/'))
      .then((value: DataSnapshot) => {

        const habitsResult: Habit[] = [];
        // Se recorre el resultado para formatear en forma de array y se les añade el id (key)
        for (const key in value.val()) {
          if (value.val().hasOwnProperty(key)) {
            habitsResult.push({...value.val()[key], id: key});
          }
        }
        setHabits(habitsResult);
      })
  }

  const getOrCreateTodayHabits = () => {
    
    //Array temporal para guardar los hábitos de hoy formateados
    let tempTodayHabits: TodayHabit[] = [];

    //Listener para cuando cambie el valor
    get(todayRef).then(snapshot => {
      //Detecta si ya existe para pedir los datos
      if(snapshot.val()) {
        //Recorre cada item del response
        for (const key in snapshot.val()) {
          if (snapshot.val().hasOwnProperty(key)) {
            //Extrae los valores del hábito
            const {title, description, icon, completed, id} = snapshot.val()[key];

            //Push en el array temporal
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

        // Si no existe, lo crea en base a los hábitos que correspondan en ese día
      } else {
        //Recorre el setup de hábitos
        habits.map(({title, description, daysToShow, icon, id}) => {
          //Recorre el objeto de días
          if(Object.keys(daysToShow).includes(today.toLowerCase())) {
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
  

  useEffect(() => {
    //Cada vez que inicia sesión se obtienen los hábitos
    getHabits();

    //Si el usuario se desautentica se eliminan los hábitos y registros del state
    if(!user) {
      setTodayHabits([]);
      setHabits([]);
    }

  }, [user]);

  useEffect(() => {
    //Cada vez que los hábitos cambien se crea o se obtiene el registro de hábiros del día correspondiente
    getOrCreateTodayHabits();

  }, [habits])
  
  

  return (
    <HabitsContext.Provider value={{
      habits,
      todayHabits,
      addHabit
    }}>
        {children}
    </HabitsContext.Provider>
  )
}