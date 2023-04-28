import { View, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome5';

import ReactText from './ReactText';
import { globalColors } from '../styles/global';
import CustomButton from './CustomButton';
import { UIContext } from '../context/UIContext';

export default function ValidateEmailAlert() {

    const {reSendValidationEmail} = useContext(AuthContext);
    const {i18n} = useContext(UIContext);


    return (
        <View style={styles.alertContainer}>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Icon name='exclamation' color={globalColors.yellow} size={30}></Icon>
                <ReactText style={{marginVertical: 20, marginLeft: 10}}>
                    {i18n.t('emailValidationAlert')}
                </ReactText>
            </View>
            <CustomButton style={{backgroundColor: globalColors.yellow}} text={i18n.t('emailValidationButton')} onPressed={() => reSendValidationEmail()} />
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