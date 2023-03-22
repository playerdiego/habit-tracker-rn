import { View, Text, StyleSheet, TouchableOpacity, Touchable } from 'react-native';
import React from 'react'
import ScrollContainer from '../../../components/ScrollContainer'
import CustomButton from '../../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { HabitsNavigationProps } from '../../../navigation/HabitsNavigation';
import Title from '../../../components/Title';
import { Habit } from '../../../interfaces/habit.interface';
import Icon from 'react-native-vector-icons/FontAwesome5';


const habits: Habit[] = [
  {
    title: 'Entrenar',
    description: 'Entrenamiento de pecho',
    completed: false
  },
  {
    title: 'Estudiar',
    description: 'Matemáticas',
    completed: false
  },
  {
    title: 'Leer',
    description: 'Mistborn',
    completed: false
  },
  {
    title: 'Programar',
    description: 'Aplicación',
    completed: true
  },
  {
    title: 'Meditar',
    description: '10 min',
    completed: true
  },
];

export default function HabitsScreen() {

  const {navigate} = useNavigation<HabitsNavigationProps>();

  return (
    <ScrollContainer title='Habits Setup' titleSize='md'>

      <CustomButton text='Add new Habit' onPressed={() => {navigate('add')}} outline={true} />

      <View style={{marginVertical: 30}}>
        <Title size='sm'>Your habits</Title>

        <View style={{marginVertical: 20}}>
        {
          habits.map(({completed, title, description}) => (
            <HabitItem completed={completed} title={title} description={description}/>
          ))
        }
        </View>


      </View>

    </ScrollContainer>
  )
}

function HabitItem({title, completed, description}: Habit) {

  const {navigate} = useNavigation<HabitsNavigationProps>();

  const onEdit = () => {
    navigate('add', {
      habit: {title, completed, description}
    });
  }

  const onDelete = () => {

  }

  return (
    <View style={styles.itemHabitContainer}>

      <TouchableOpacity onPress={() => onEdit()} style={{width: '60%', flexDirection: 'row'}}>
        <Icon name='dumbbell' size={30}></Icon>

        <View style={{marginLeft:20}}>
          <Text style={styles.title}>{title}</Text>
          {description && <Text>{description}</Text>}
        </View>
      </TouchableOpacity>


      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => onEdit()}>
          <Icon name='edit' size={20}></Icon>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onDelete()}>
          <Icon name='trash' size={20}></Icon>
        </TouchableOpacity>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  title: {
      fontSize: 23,
      fontWeight: 'bold'
  },
  itemHabitContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '15%',
    justifyContent: 'space-between'
  }
});