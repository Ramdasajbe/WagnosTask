const TaskStyles = (isDarkMode, Colors, Dimensions) => {
  return {
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? Colors.dark : Colors.white,
    },
    loadingContainer: {
      height: Dimensions.get('window').height,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 18,
      paddingVertical: 2,
      fontWeight: 'bold',
      color: isDarkMode ? Colors.white : Colors.dark,
    },
    isCompleted: {
      color: isDarkMode ? Colors.white : Colors.dark,
      fontSize: 16,
      paddingVertical: 6,
    },
    list: {
      backgroundColor: isDarkMode ? Colors.dark : Colors.white,
    },
    bottamLine: {
      borderBottomWidth: 0.5,
      borderBottomColor: isDarkMode ? Colors.white : Colors.dark,
    },
    listItem: {
      padding: 15,
    },
    buttonView: {
      height: Dimensions.get('window').height * 0.1,
      flexDirection: 'row',
      justifyContent: 'space-around',

      alignItems: 'center',
    },
    flatlistContainer: {
      height: Dimensions.get('window').height * 0.9,
    },
    button: {
      //backgroundColor: isDarkMode ? Colors.dark : Colors.white,
      padding: 10,
      borderRadius: 5,
      width: Dimensions.get('window').width * 0.3,
      alignItems: 'center',
      justifyContent: 'space-around',
      borderWidth: 1,
      borderColor: isDarkMode ? Colors.white : Colors.dark,
      // backgroundColor: isDarkMode ? Colors.white : Colors.dark,
    },
  };
};

export default TaskStyles;
