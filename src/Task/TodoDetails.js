import {
  Dimensions,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import TaskStyles from './Styles';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const TodoDetails = ({route}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = TaskStyles(isDarkMode, Colors, Dimensions);
  const initialItem = route.params.item;

  // Create a local state for the item
  const [item, setItem] = useState(initialItem);

  // Toggle completion status
  const toggleCompletion = () => {
    setItem(prevItem => ({
      ...prevItem,
      completed: !prevItem.completed,
    }));
  };

  return (
    <View
      style={[
        styles.container,
        {flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10},
      ]}>
      <Button
        title={item.completed ? 'Mark as Incomplete' : 'Mark as Completed'}
        onPress={toggleCompletion}
      />
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
