import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Dimensions,
} from 'react-native';
import React, {use, useEffect, useState, useNavigation} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import axios, {all} from 'axios';
import TaskStyles from './Styles';
const TaskList = () => {
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

  const getAllTask = async status => {
    try {
      setallDetails({loading: true, data: [], error: null});
      setborderLine({
        all: status === 'all',
        completed: status === true,
        incompleted: status === false,
      });
      // Define the API endpoint
      const apiUrl = 'https://jsonplaceholder.typicode.com/todos';

      // Fetch the data from the API
      const response = await axios.get(apiUrl);

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
            data: response.data.filter((item, index) =>
              typeof status == 'boolean' ? item.completed === status : item,
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
    } catch (error) {
      setallDetails({
        loading: false,
        data: [],
        error: error.message,
      });
    }
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
      <TouchableOpacity style={styles.list} key={item.id}>
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
            },
          ]}>
          <Text style={styles.isCompleted}>All</Text>
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
            },
          ]}>
          <Text style={styles.isCompleted}>Completed</Text>
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
            },
          ]}>
          <Text style={styles.isCompleted}>Incomplete</Text>
        </TouchableOpacity>
      </View>

      {/* <FlatList
        style={styles.flatlistContainer}
        data={allDetails.data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()} // Ensure valid keyExtractor
      /> */}
    </View>
  );
};

export default TaskList;
