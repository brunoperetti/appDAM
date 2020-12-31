import React from 'react';
import {Button, Card, Text} from '@ui-kitten/components';
import {StyleSheet, View, Image} from 'react-native';

const styles = StyleSheet.create({
  tituloContainer: {
    flexDirection: 'column',
    marginBottom: 20,
  },
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  titulo: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold', // 100 - 200 - 300 - 400
    color: '#ffffff',
  },
  precio: {
    fontSize: 15,
    textAlign: 'center',
    color: '#ffffff'
  },
  card: {
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: '#121212',
  },

  botonComprar:{
    backgroundColor: 'black', 
    borderColor:'#03dac6'
  },

  botonDetalles:{
    backgroundColor: 'black', 
    borderColor:'#bb86fc'
  }
});

const Tarjeta = ({titulo, precio, onPressVerDetalles}) => {
  return (
    <Card style={styles.card}>
      <View style={styles.tituloContainer}>
        <Text style={styles.titulo}>{titulo}</Text>
        <Text style={styles.precio}>Precio: ${precio}</Text>
      </View>
      <View style={styles.botonesContainer}>
        <Button style={styles.botonDetalles} appearance="outline" onPress={onPressVerDetalles} >
          <Text style={{color:'#bb86fc'}} >Ver detalles</Text> 
        </Button>
        <Button style={styles.botonComprar}><Text style={{color:'#03dac6'}}>COMPRAR</Text></Button>
      </View>
    </Card>
  );
};

export default Tarjeta;
