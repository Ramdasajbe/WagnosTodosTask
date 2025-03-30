import {Dimensions, StyleSheet, Text, useColorScheme, View} from 'react-native';
import React from 'react';
import TaskStyles from './Styles';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const TodoDetails = ({route}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = TaskStyles(isDarkMode, Colors, Dimensions);
  const item = route.params.item;

  return (
    <View
      style={[
        styles.container,
        {flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10},
      ]}>
      <Text style={styles.title}>{item.id}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.isCompleted}>
        {item.completed ? '✔ Completed' : '✗ Incomplete'}
      </Text>
    </View>
  );
};

export default TodoDetails;

const styles = StyleSheet.create({});
