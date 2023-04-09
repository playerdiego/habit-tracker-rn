import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import BouncyCheckbox from "react-native-bouncy-checkbox";

import { Habit, TodayHabit } from '../interfaces/habit.interface';
import { globalColors } from '../styles/global';
import ReactText from './ReactText';
import { HabitsContext } from '../context/HabitsContext';

interface HabitCheckboxProps {
    habit: TodayHabit,
    size?: 'sm' | 'md' | 'lg',
    history?: boolean
}

export default function HabitCheckbox({habit: {completed, title, description, id}, size = 'lg', history = false}: HabitCheckboxProps) {

    const {completeHabit} = useContext(HabitsContext);

    const onComplete = () => {
        completeHabit(id!);
    }

  return (
    <View style={{flexDirection: 'row', marginVertical: 10}}>
        <BouncyCheckbox 
            innerIconStyle={{borderRadius: 4, borderWidth: 2}} 
            iconStyle={{borderRadius: 4}}
            unfillColor={history ? globalColors.gray : globalColors.secondary}
            fillColor={history && !completed ? globalColors.gray : globalColors.primary}
            size={
                size === 'sm' ? 25 :
                size === 'md' ? 40 :
                size === 'lg' ? 50 : 50
            }
            isChecked={completed}
            disabled={history}
            onPress={onComplete}
        />
        
        <TouchableOpacity style={{width: '100%'}} onPress={onComplete}>
            <ReactText 
                style={{
                    ...styles.title, 
                    fontSize: history ? 16 : 22, 
                    color: history && !completed ? '#555' : globalColors.primary
                }} 
                bold={true}
            >{title}</ReactText>

            {!history && <ReactText>{description!}</ReactText>}
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 23,
        fontWeight: 'bold'
    }
});