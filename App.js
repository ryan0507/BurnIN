import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './navigations/RootStack';

function App() {
  return (
    <NavigationContainer>
      <RootStack styles={styles.font} />
    </NavigationContainer>
  );
}
export default App;

const styles = StyleSheet.create({
  font: {
    // fontFamily: 'SpoqaHanSansNeo-Regular',
  },
});
