import React, { createContext, useContext, useEffect, useState } from 'react';
import { Habit, TodayHabit } from '../interfaces/habit.interface';
import { firebaseConfig } from '../../firebase-config';
import { initializeApp } from 'firebase/app';
import { getDatabase, set, ref, push, get, DataSnapshot, update, remove } from "firebase/database";
import { getAuth } from 'firebase/auth';
import dayjs from 'dayjs';
import { AuthContext } from './AuthContext';

/* 
TODO
*/

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

interface HabitsContextProps {
  habits: Habit[],
  todayHabits: TodayHabit[],
  addHabit: (habit: Habit) => void,
  deleteHabit: (habit: Habit) => void,
  editHabit: (habit: Habit) => void,
  completeHabit: (habitId: string) => void
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
  const today = dayjs().format('dddd').toLowerCase();

  //Referencia de la base de datos
  const todayRef = ref(db, 'users/' + currentUser?.uid + '/history/' + dayjs().format('DD-MM-YYYY'));

  const addHabit = (habit: Habit) => {
    try {
      //Guarda el hábito y retorna la llave
      const habitKey = push(ref(db, 'users/' + currentUser?.uid + '/habits/'), habit).key;
      setHabits([...habits, {...habit, id: habitKey!}]);

      //Verifica si el hábito se debe cumplir el mismo día que fue creado
      const days = getDays(habit.daysToShow);
      if(days.includes(today)) {
        //Si sí, añade ese hábito al historial de todayHabits y lo guarda en la DB con el id del hábito setup
        const newTodayHabit: TodayHabit = {
          title: habit.title,
          description: habit.description,
          icon: habit.icon,
          completed: false,
          id: habitKey!,
        }

        set(ref(db, 'users/' + currentUser?.uid + '/history/' + dayjs().format('DD-MM-YYYY') + '/' + todayHabits.length + '/'), newTodayHabit);
        setTodayHabits([...todayHabits, newTodayHabit]);
      }
      
    } catch (error) {
      console.error(error);
      alert(error);
    }


  }

  const deleteHabit = (habit: Habit) => {

    const days = getDays(habit.daysToShow);

    try {
      remove(ref(db, 'users/' + currentUser?.uid + '/habits/' + habit.id));

      const updatedHabits: Habit[] = habits.filter(habitToFilter => habitToFilter.id !== habit.id);
      setHabits(updatedHabits);

      //Identificar si el hábito eliminado está en el registro de hoy
      if(days.includes(today)) {

        //Eliminar el hábito de todayHabits, actualizar estado y DB
        const updatedTodayHabits = todayHabits.filter(habitToFilter => habitToFilter.id !== habit.id);
        setTodayHabits(updatedTodayHabits);
        set(todayRef, updatedTodayHabits);


      }

    } catch (error) {
      console.error(error);
      alert(error);
    }


  }

  const editHabit = (habit: Habit) => {

    const {title, description, icon, daysToShow, id} = habit;

    //Un array con los días que se debe mostrar
    const days = getDays(habit.daysToShow);

    const updatedHabits: Habit[] = habits.map(habitToFilter => habitToFilter.id === id ? habit : habitToFilter);

    setHabits(updatedHabits);

    try {

      set(ref(db, 'users/' + currentUser?.uid + '/habits/' + id), {
        title,
        description, 
        icon,
        daysToShow
      });

      //Verifica si el día ese hábito está en el registro del día actual
      let updatedTodayHabits: TodayHabit[] = [];
      if(days.includes(today)) {

        // Verifica si el hábito ya está añadido en los todayHabits
        const isHabitActive = todayHabits.find(todayHabit => todayHabit.id === habit.id);

        //Si ya está añadido, lo edita
        if (isHabitActive) {

          updatedTodayHabits = todayHabits.map(todayHabit => todayHabit.id === habit.id ? 
            {...todayHabit, title, description, icon} : todayHabit);

        // Si no está añadido, lo añade
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


        //Verfica si el id del hábito editado coincide y lo edita
        
        //Si no coincide con el día actual, lo elimina de los hábitos diarios
      } else {
        //Crea un nuevo array de todayHabits sin el hábito editado
        updatedTodayHabits = todayHabits.filter(habitToDelete => (habitToDelete.id !== id) && habitToDelete);
      }
      set(todayRef, updatedTodayHabits);
      setTodayHabits(updatedTodayHabits);


    } catch (error) {
      console.error(error);
    }

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
          //Recorre el objeto de días y guarda en days solo los que son true
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

  const completeHabit = (habitId: string) => {
    // Recorre los hábitos diarios y modifica el estado completed si el id coincide
    const updatedTodayHabits: TodayHabit[] = todayHabits.map(habit => habit.id === habitId ? {...habit, completed: !habit.completed} : habit); 
    
    //Setea los nuevos hábitos en el estado y actualiza en la DB
    setTodayHabits(updatedTodayHabits);
    set(todayRef, updatedTodayHabits);
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
      addHabit,
      deleteHabit,
      editHabit,
      completeHabit
    }}>
        {children}
    </HabitsContext.Provider>
  )
}