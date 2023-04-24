import { View, Text, Modal, ActivityIndicator, StyleSheet } from 'react-native'
import React, { ReactElement, useContext } from 'react'
import { globalColors } from '../styles/global';
import ReactText from './ReactText';
import Title from './Title';
import { UIContext } from '../context/UIContext';

export default function LoadingModal() {

  const {loading} = useContext(UIContext);

  return (
      <Modal 
          animationType='fade'
          visible={!!loading}
          transparent
      >
        <View style={styles.loaderContainer}>
          <View style={styles.loader}>
            <Title align='center' size='xs'>{loading!}</Title>
            <ActivityIndicator style={{marginTop: 20}} size={100} color={globalColors.primary} />
          </View>
        </View>
      </Modal>
  )
}

const styles = StyleSheet.create({
  loaderContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, .5)'
  },
  loader: {
    backgroundColor: globalColors.secondary,
    padding: 20,
    width: 200,
    justifyContent: 'center',
    alignContent: 'center',

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderRadius: 4
  },
})