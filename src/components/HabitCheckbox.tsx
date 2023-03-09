import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Habit } from '../interfaces/habit.interface';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { global } from '../styles/global';

export default function HabitCheckbox({title, description, completed}: Habit) {

  return (
    <View style={{flexDirection: 'row', marginVertical: 10}}>
        <BouncyCheckbox 
            innerIconStyle={{borderRadius: 4, borderWidth: 2}} 
            iconStyle={{borderRadius: 4}}
            fillColor='#000' 
            size={50}
            isChecked={completed}
        />

        <View>
            <Text style={styles.title}>{title}</Text>
            {description && <Text>{description}</Text>}
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