import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Roboto_400Regular, useFonts } from '@expo-google-fonts/roboto';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import ScrollContainer from '../../../components/ScrollContainer';
import { HabitsNavigationProps, HabitsStackParamList } from '../../../navigation/HabitsNavigation';
import { global, globalColors } from '../../../styles/global';
import CustomButton from '../../../components/CustomButton';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import ReactText from '../../../components/ReactText';
import { HabitsContext } from '../../../context/HabitsContext';
import { FAIcons } from '../../../utils/FAicons';

interface DaysState { monday: boolean; tuesday: boolean; wednesday: boolean; thursday: boolean; friday: boolean; saturday: boolean; sunday: boolean; }

export default function AddHabitScreen() {

  const {addHabit, editHabit} = useContext(HabitsContext);
  
  const {navigate} = useNavigation<HabitsNavigationProps>();
  //Trae los parámetros si existen (En caso de edición)
  const {params: habit} = useRoute<RouteProp<HabitsStackParamList, 'add'>>();
  // FORMIK

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Habit name is required'),
    description: Yup.string(),
  });

  type FormData = {
    title: string,
    description?: string
  }

  const initialValues: FormData = {title: habit?.title || '', description: habit?.description || ''};

  const onAddOrEditHabit = ({title, description}: FormData) => {

    const newHabit = {
      title,
      description,
      icon: iconSelected,
      daysToShow: days,
    };

    if(habit) {
      editHabit({...newHabit, id: habit.id});
      alert('Habit has been updated');
    } else  {
      addHabit(newHabit);
      alert('Habit has been created');
    } 
    navigate('setup');
  }

  // DAYS CHECKBOX

  const [days, setDays] = useState<DaysState>({
    monday: false, 
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false
  });

  const {monday, tuesday, wednesday, thursday, friday, saturday, sunday} = days;

  //Icons Modal

  const [showModal, setShowModal] = useState(false);
  const [iconSelected, setIconSelected] = useState('dumbbell');
  const [icons, setIcons] = useState<string[]>([]);

  const selectIcon = (icon: string) => {
    setIconSelected(icon);
    setShowModal(false);
  }

  useEffect(() => {

    if(habit) {
      let updatedSelectedDays: DaysState = days;
      Object.keys(habit.daysToShow).map((day, i) => {
        if(Object.values(habit.daysToShow)[i]) {
          updatedSelectedDays = {...updatedSelectedDays, [day]: true};
        }
      });
      setDays(updatedSelectedDays);
      setIconSelected(habit.icon);
    }

    setIcons(FAIcons.slice(0, 50));

  }, [])
  


  const onSelectDay = (day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday') => {
    setDays({...days, [day]: !days[day]});
  } 

  const [fontLoaded] = useFonts({
      Roboto_400Regular
  });

  if(!fontLoaded) return null;

  return (
    <ScrollContainer title={habit ? 'Edit Habit' : 'Add Habit'} goBack={() => navigate('setup')}>

      <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
        <View style={styles.iconContainer}>
          <Icon name={iconSelected} size={40}></Icon>
        </View>

        <CustomButton onPressed={() => {setShowModal(true)}} text='Choose icon' style={{height: 50, width: '60%'}} />

        <Modal
          animationType='slide'
          visible={showModal}
          onRequestClose={() => {
            setShowModal(false);
          }}
        >
            <View style={{paddingTop: 60}}>
              <ScrollContainer title='Choose Icon' goBack={() => {setShowModal(false)}}>
                <View style={styles.iconsModalContainer}>
                  {
                    icons.map((icon, i) => (
                      <TouchableOpacity key={icon} onPress={() => selectIcon(icon)} style={styles.iconTouchable}>
                        <Icon key={icon} name={icon} style={styles.icon} size={35} />
                      </TouchableOpacity>
                    ))
                  }
                </View>
              </ScrollContainer>
            </View>
        </Modal>

      </View>

      <Formik initialValues={initialValues} onSubmit={onAddOrEditHabit} validationSchema={validationSchema}>

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

          <CustomButton text={habit ? 'Save Habit' : 'Create Habit'} onPressed={handleSubmit} style={{marginTop: 8}} />
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
  },
  iconsModalContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1
  },
  iconTouchable: {
    width: '20%', 
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1
  },
  icon: {
    padding: 20,
  }
})