import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import BouncyCheckbox from "react-native-bouncy-checkbox";

import { Habit } from '../interfaces/habit.interface';
import { globalColors } from '../styles/global';

interface HabitCheckboxProps {
    habit: Habit,
    size?: 'sm' | 'md' | 'lg',
    history?: boolean
}

export default function HabitCheckbox({habit: {completed, title, description}, size = 'lg', history = false}: HabitCheckboxProps) {

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
        />

        <View>
            <Text style={{...styles.title, fontSize: history ? 16 : 22, color: history && !completed ? '#555' : globalColors.primary}}>{title}</Text>
            {!history && <Text>{description}</Text>}
        </View>  
    </View>
  )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 23,
        fontWeight: 'bold'
    }
});