import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import ScrollContainer from '../../../components/ScrollContainer'
import CustomButton from '../../../components/CustomButton';
import { HabitsNavigationProps } from '../../../navigation/HabitsNavigation';
import Title from '../../../components/Title';
import { Habit } from '../../../interfaces/habit.interface';
import ReactText from '../../../components/ReactText';
import { HabitsContext } from '../../../context/HabitsContext';
import Divider from '../../../components/Divider';
import { UIContext } from '../../../context/UIContext';

interface ActiveDay {
  day: string;
  value: boolean;
}

export default function HabitsScreen() {

  const {navigate} = useNavigation<HabitsNavigationProps>();
  const {habits} = useContext(HabitsContext);
  const {i18n} = useContext(UIContext);

  return (
    <ScrollContainer title={i18n.t('habitsSetup')} titleSize='md'>

      <CustomButton text={i18n.t('addNewHabit')} onPressed={() => {navigate('add')}} outline={true} />

      <View style={{marginVertical: 30}}>
        <Title size='sm'>{i18n.t('yourHabits')}</Title>

        {
          habits.length < 1 ?
          <View style={{marginVertical: 40}}>
            <Title size='sm' align='center'>{i18n.t('theresNoHabits')}</Title>
          </View>
          :
          <View style={{marginVertical: 20}}>
          {
            habits.map((habit, i) => (
              <View key={habit.id}>
                <HabitItem total={habit.total} title={habit.title} description={habit.description} icon={habit.icon} daysToShow={habit.daysToShow} streak={habit.streak} id={habit.id} />
                <Divider />
              </View>
            ))
          }
          </View>

        }



      </View>

    </ScrollContainer>
  )
}

function HabitItem(habit: Habit) {

  const {title, description, daysToShow, id, icon} = habit;

  const {navigate} = useNavigation<HabitsNavigationProps>();
  const {deleteHabit} = useContext(HabitsContext);
  const {i18n} = useContext(UIContext);

  const onEdit = () => {
    navigate('add', habit);
  }

  const showDeleteAlert = () => {
    Alert.alert(i18n.t('uSure'), i18n.t('habitWillDeleted'), [
      {
        text: i18n.t('cancel'),
        style: 'cancel'
      },
      {
        text: i18n.t('delete'),
        onPress: () => onDelete(),
        style: 'destructive'
      },
    ], {cancelable: true});
  }

  const onDelete = () => {
    deleteHabit(habit);
  }

  const activeDays: ActiveDay[] = []; // tipa la lista de días activos con la interfaz ActiveDay

  // recorre el objeto daysToShow y añade los días activos a la lista
  Object.keys(daysToShow).map((day, i) => {
    activeDays.push({day, value: Object.values(daysToShow)[i]})
  });

  return (
    <View style={styles.itemHabitContainer}>

      <TouchableOpacity onPress={() => onEdit()} style={{width: '60%', flexDirection: 'row'}}>
        <Icon name={habit.icon} size={30} style={{width: 40}}></Icon>

        <View style={{marginLeft:20}}>
          <ReactText style={styles.title} bold={true}>{title}</ReactText>
          {description && <ReactText>{description}</ReactText>}
          <View style={styles.pillsContainer}>
          {
            activeDays.map((day, i) => (
              day.value &&
              <ReactText key={day.day +  habit.id} style={styles.pill}>
                {
                  day.day === 'monday' ? i18n.t('monday') :
                  day.day === 'tuesday' ? i18n.t('tuesday') :
                  day.day === 'wednesday' ? i18n.t('wednesday') :
                  day.day === 'thursday' ? i18n.t('thursday') :
                  day.day === 'friday' ? i18n.t('friday') :
                  day.day === 'saturday' ? i18n.t('saturday') :
                  day.day === 'sunday' ? i18n.t('sunday') : i18n.t('monday')
                }
              </ReactText>
            ))
          }
          </View>
        </View>
      </TouchableOpacity>


      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => onEdit()}>
          <Icon name='edit' size={20}></Icon>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => showDeleteAlert()}>
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
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '15%',
    justifyContent: 'space-between'
  },
  pill: {
    borderWidth: 2,
    paddingHorizontal: 5,
    marginVertical: 3,
    borderRadius: 5,
    textTransform: 'capitalize',
    marginRight: 5
  },
  pillsContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
    flexWrap: 'wrap'
  }
});