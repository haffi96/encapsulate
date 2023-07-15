// Screen not in use
// To display, add this to the HomeScreen view and App.jsx
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import React, { useEffect } from 'react';
import { styled, useColorScheme } from 'nativewind';
import defaultScheme from '../colors';

const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);
const StyledView = styled(View);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: defaultScheme.background,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function SettingsScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  console.log(colorScheme);
  useEffect(() => {
    // console.log(AsyncStorage.getAllKeys());
    console.log(colorScheme);
  }, []);

  return (
    <StyledView style={styles.container}>
      <StyledView style={styles.buttonContainer}>
        <StyledText>Settings</StyledText>
        <StyledTouchableOpacity
          className="p-5 bg-zinc-600 dark:bg-zinc-900"
          onPress={toggleColorScheme}
        >
          <StyledText className="text-red-500 dark:text-white">Toggle</StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    </StyledView>
  );
}

export default SettingsScreen;
