import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, {use, useEffect, useState, useNavigation} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import axios from 'axios';
import TaskStyles from './Styles';
const TodosList = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const styles = TaskStyles(isDarkMode, Colors, Dimensions);
  const [allDetails, setallDetails] = useState({
    loading: true,
    data: [],
    error: null,
  });
  const [borderLine, setborderLine] = useState({
    all: true,
    completed: false,
    incompleted: false,
  });

  const getAllTask = status => {
    setallDetails({loading: true, data: [], error: null});
    setborderLine({
      all: status === 'all',
      completed: status === true,
      incompleted: status === false,
    });

    const apiUrl = 'https://jsonplaceholder.typicode.com/todos';

    // Fetch the data using axios with then() and catch()
    axios
      .get(apiUrl)
      .then(response => {
        // Handle the response based on status and data format
        if (response.status !== 200) {
          setallDetails({
            loading: false,
            data: [],
            error: 'Network response was not ok',
          });
        } else if (Array.isArray(response.data)) {
          if (response.data.length > 0) {
            setallDetails({
              loading: false,
              data: response.data.filter(item =>
                typeof status === 'boolean' ? item.completed === status : item,
              ),
              error: null,
            });
          } else {
            setallDetails({
              loading: false,
              data: [],
              error: 'No data found',
            });
          }
        } else {
          setallDetails({
            loading: false,
            data: [],
            error: 'Unexpected response format',
          });
        }
      })
      .catch(error => {
        // Handle any errors from the axios request
        setallDetails({
          loading: false,
          data: [],
          error: error.message,
        });
      });
  };

  useEffect(() => {
    getAllTask('all');
    // Cleanup function to prevent memory leaks
    return () => {
      setallDetails({loading: true, data: [], error: null});
    };
  }, []);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.list}
        key={item.id}
        onPress={() => {
          navigation.navigate('TodoDetails', {item: item});
        }}>
        <View style={styles.listItem}>
          <Text style={styles.isCompleted}>{item.id}</Text>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.isCompleted}>
            {item.completed ? '✔ Completed' : '✗ Incomplete'}
          </Text>
        </View>
        <View style={styles.bottamLine} />
      </TouchableOpacity>
    );
  };
  if (allDetails.loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={isDarkMode ? Colors.white : Colors.dark} />
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }
  if (allDetails.error) {
    return (
      <View style={styles.loadingContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            getAllTask('all');
          }}>
          <Text style={styles.title}>Please Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.buttonView}>
        <TouchableOpacity
          onPress={() => getAllTask('all')}
          style={[
            styles.button,
            {
              borderColor: borderLine.all
                ? Colors.primary
                : isDarkMode
                ? Colors.white
                : Colors.dark,
              backgroundColor: borderLine.all
                ? isDarkMode
                  ? Colors.white
                  : Colors.dark
                : isDarkMode
                ? Colors.dark
                : Colors.white,
            },
          ]}>
          <Text
            style={[
              styles.isCompleted,
              {
                color: borderLine.all
                  ? isDarkMode
                    ? Colors.dark
                    : Colors.white
                  : isDarkMode
                  ? Colors.white
                  : Colors.dark,
              },
            ]}>
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => getAllTask(true)}
          style={[
            styles.button,
            {
              borderColor: borderLine.completed
                ? Colors.primary
                : isDarkMode
                ? Colors.white
                : Colors.dark,
              backgroundColor: borderLine.completed
                ? isDarkMode
                  ? Colors.white
                  : Colors.dark
                : isDarkMode
                ? Colors.dark
                : Colors.white,
            },
          ]}>
          <Text
            style={[
              styles.isCompleted,
              {
                color: borderLine.completed
                  ? isDarkMode
                    ? Colors.dark
                    : Colors.white
                  : isDarkMode
                  ? Colors.white
                  : Colors.dark,
              },
            ]}>
            Completed
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => getAllTask(false)}
          style={[
            styles.button,
            {
              borderColor: borderLine.incompleted
                ? Colors.primary
                : isDarkMode
                ? Colors.white
                : Colors.dark,
              backgroundColor: borderLine.incompleted
                ? isDarkMode
                  ? Colors.white
                  : Colors.dark
                : isDarkMode
                ? Colors.dark
                : Colors.white,
            },
          ]}>
          <Text
            style={[
              styles.isCompleted,
              {
                color: borderLine.incompleted
                  ? isDarkMode
                    ? Colors.dark
                    : Colors.white
                  : isDarkMode
                  ? Colors.white
                  : Colors.dark,
              },
            ]}>
            Incomplete
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.flatlistContainer}
        data={allDetails.data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()} // Ensure valid keyExtractor
      />
    </View>
  );
};

export default TodosList;
