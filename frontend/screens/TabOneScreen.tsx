import React, { useState } from 'react';
import { Button, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';


async function fetchData () {
    const resp = await fetch("http://10.62.70.165:8000/profile");
    const data = await resp.json()
    return JSON.stringify(data)
  };

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>): JSX.Element {
  const [dataThing, setDataThing] = useState('')

  return (
    <View style={styles.container}>
      <Button
      title='ViewProfile'
      color="white"
      onPress={async () => setDataThing(await fetchData())}
      />
      <Text style={styles.title}>Tab One</Text>
      <Text>{dataThing}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
