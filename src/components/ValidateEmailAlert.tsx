import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { globalColors } from '../styles/global';
import ReactText from './ReactText';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CustomButton from './CustomButton';

export default function ValidateEmailAlert() {

    const {reSendValidationEmail} = useContext(AuthContext);

    return (
        <View style={styles.alertContainer}>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Icon name='exclamation' color={globalColors.yellow} size={30}></Icon>
                <ReactText style={{marginVertical: 20, marginLeft: 10}}>You haven´t validated your email, please check your inbox</ReactText>
            </View>
            <CustomButton style={{backgroundColor: globalColors.yellow}} text='Re-send validation Email' onPressed={() => reSendValidationEmail()} />
        </View>
    )
}

const styles = StyleSheet.create({
    alertContainer: {
        borderColor:globalColors.yellow,
        borderWidth: 2,
        borderRadius: 4,
        marginVertical: 20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 40
    }
})