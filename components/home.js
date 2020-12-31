import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Button} from '@ui-kitten/components';
import {screens} from '../App';
import {useNavigation} from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    backgroundColor: '#121212', 
  },
  button: {
    margin: 2,
    marginBottom: 10,
    width: 200,
    backgroundColor: 'black',
    borderColor:'#bb86fc',


  },
  buttonGhost: {
    margin: 2,
    marginTop: 5,
    width: 200,
    textDecorationLine: 'underline',
  },
  homeTittle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: "#ffffff"
    
  },
  ghostContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
});

export const Home = () => {
  const navigator = useNavigation();

  return (
    <View
      style={{flex: 1, alignItems: 'center', justifyContent: 'space-evenly', backgroundColor: '#121212'}}>
      <Text style={styles.homeTittle}>Bienvenidos!</Text>
      <View style={styles.container}>
        <Button
          style={styles.button}
          appearance="outline"
          status="info"
          onPress={() => navigator.navigate(screens.listar)}>
          <Text style={{color:'#bb86fc'}}>LISTAR PRODUCTOS</Text>
        </Button>
        <Button
          style={styles.button}
          appearance="outline"
          status="info"
          onPress={() => navigator.navigate(screens.listaCategorias)}>
          <Text style={{color:'#bb86fc'}}>VER CATEGORÍAS</Text>
        </Button>
        <Button
          style={styles.button}
          appearance="outline"
          status="info"
          onPress={() => navigator.navigate(screens.compradores)}>
          <Text style={{color:'#bb86fc'}}>VER COMPRADORES</Text>
        </Button>

      </View>
    </View>
  );
};
