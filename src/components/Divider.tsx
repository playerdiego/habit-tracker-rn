import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { globalColors } from '../styles/global'

export default function Divider() {
  return (
    <View
        style={{
            borderBottomColor: globalColors.primary,
            borderBottomWidth: 1,
        }}
    />
  )
}