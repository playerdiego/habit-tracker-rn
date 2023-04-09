import { View, Text, StyleSheet } from 'react-native';
import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Roboto_400Regular, useFonts } from '@expo-google-fonts/roboto';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import ScrollContainer from '../../../components/ScrollContainer';
import { HabitsNavigationProps } from '../../../navigation/HabitsNavigation';
import { global, globalColors } from '../../../styles/global';
import CustomButton from '../../../components/CustomButton';
import { TextInput } from 'react-native-gesture-handler';
import ReactText from '../../../components/ReactText';
import { HabitsContext } from '../../../context/HabitsContext';

export default function AddHabitScreen() {

  const {addHabit} = useContext(HabitsContext);

  const {navigate} = useNavigation<HabitsNavigationProps>();

  // FORMIK

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Habit name is required'),
    description: Yup.string(),
  });

  type FormData = {
    title: string,
    description?: string
  }

  const initialValues: FormData = {title: '', description: ''};

  const onAddHabit = ({title, description}: FormData) => {

    addHabit({
      title,
      description,
      icon: 'book',
      daysToShow: days,
    });
    navigate('setup');
  }

  // DAYS CHECKBOX

  const [days, setDays] = useState({
    monday: false, 
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false
  });

  const {monday, tuesday, wednesday, thursday, friday, saturday, sunday} = days;

  const onSelectDay = (day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday') => {
    setDays({...days, [day]: !days[day]});
  } 

  const [fontLoaded] = useFonts({
      Roboto_400Regular
  });

  if(!fontLoaded) return null;

  return (
    <ScrollContainer title='Add Habit' goBack={() => navigate('setup')}>

      <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
        <View style={styles.iconContainer}>
          <Icon name='dumbbell'  size={40}></Icon>
        </View>
        <CustomButton onPressed={() => {}} text='Choose icon' style={{height: 50, width: '60%'}} />
      </View>

      <Formik initialValues={initialValues} onSubmit={onAddHabit} validationSchema={validationSchema}>

      {({handleChange, handleBlur, handleSubmit, values, errors, touched, }) => (
        <View style={{marginTop: 20}}>
          <TextInput 
            placeholder='Habit Name' 
            style={global.input} 
            cursorColor={globalColors.gray} 
            onChangeText={handleChange('title')}
            onBlur={handleBlur('title')}
            value={values.title}
          />
          {(errors.title && touched.title) && (<Text style={{color: 'red'}}>{errors.title}</Text>)}

          <TextInput 
            placeholder='Description' 
            style={global.input} 
            cursorColor={globalColors.gray}
            onChangeText={handleChange('description')}
            onBlur={handleBlur('description')}
            value={values.description}
          />
          {(errors.description && touched.description) && (<Text style={{color: 'red'}}>{errors.description}</Text>)}

          <ReactText style={{marginBottom: 10}}>What days do you want to do it?</ReactText>

          <View style={styles.checkBoxesContainer}>
            <DayCheckBox day='Monday' selected={monday} onSelect={() => onSelectDay('monday')} />
            <DayCheckBox day='Tuesday' selected={tuesday} onSelect={() => onSelectDay('tuesday')} />
            <DayCheckBox day='Wednesday' selected={wednesday} onSelect={() => onSelectDay('wednesday')} />
            <DayCheckBox day='Thursday' selected={thursday} onSelect={() => onSelectDay('thursday')} />
            <DayCheckBox day='Friday' selected={friday} onSelect={() => onSelectDay('friday')} />
            <DayCheckBox day='Saturday' selected={saturday} onSelect={() => onSelectDay('saturday')} />
            <DayCheckBox day='Sunday' selected={sunday} onSelect={() => onSelectDay('sunday')} />
          </View>

          <CustomButton text='Create Habit' onPressed={handleSubmit} style={{marginTop: 8}} />
        </View>
      )}

      </Formik>
      
    </ScrollContainer>
  )
}


function DayCheckBox({day, selected, onSelect}: {day: string, selected: boolean, onSelect: Function}) {
  return (
    <BouncyCheckbox 
      innerIconStyle={{borderRadius: 4, borderWidth: 2}} 
      iconStyle={{borderRadius: 4}}
      textStyle={{fontFamily: 'Roboto_400Regular', color: globalColors.primary}}
      unfillColor={globalColors.secondary}
      fillColor={globalColors.primary}
      size={30}
      style={styles.checkbox}
      text={day}
      isChecked={selected}
      onPress={() => onSelect()}
    />
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    borderWidth: 2,
    borderColor: globalColors.primary,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100
  },
  checkBoxesContainer: {
    flexDirection: 'row',
    flexGrow: 0,
    flexWrap: 'wrap'
  },
  checkbox: {
    width: '50%',
    marginVertical: 10
  }
})