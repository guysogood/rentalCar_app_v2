import React from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import { View } from 'react-native'

export default function DatePicker({ date, onDateChange }) {
  return (
    <View>
      <DateTimePicker
        value={date}
        mode="date"
        display="default"
        onChange={(e, selected) => selected && onDateChange(selected)}
      />
    </View>
  )
}