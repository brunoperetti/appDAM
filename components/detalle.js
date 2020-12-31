import React, {useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ScrollView, View, Image, StyleSheet, Text as TextNative} from 'react-native';
import {Text, Button, Icon} from '@ui-kitten/components';
import {StoreContext} from '../context/storeContext';
import {FlatList} from 'react-native-gesture-handler';
import BottomSheetModal from './bottomSheetModal';
import SeleccionarCategoria from './seleccionarCategoria';
import SeleccionarComprador from './seleccionarComprador';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: '#121212'
  },
  logo: {
    flex: 1,
    height: 240,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25
  },
  contenedorImgPrecio: {
    flexDirection: 'row',
    backgroundColor: '#121212',
    borderRadius: 25,
    borderColor: 'grey',
    borderWidth: 2,
    marginBottom: 20,
    marginTop: 20
  },
  infoProducto: {
    borderLeftColor: 'grey',
    borderLeftWidth: 2,
    flexDirection: 'column',
    flex: 2,
    justifyContent: 'center',
  },
  form: {marginBottom: 30},
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
 
  btnGuardar: {
    flex: 2,
    marginHorizontal: 5,
    marginTop: 10,
    backgroundColor: 'black', 
    borderColor:'#03dac6'
  },
  text: {
    fontSize: 22,
    fontWeight: '200',
    fontStyle: 'italic',
    textAlign: 'left',
    marginLeft: 10,
    marginTop: 10,
    color: 'white'
  },
  textPrice: {
    fontSize: 30,
    fontWeight: '300',
    fontStyle: 'italic',
    textAlign: 'left',
    marginTop: 'auto',
    marginLeft: 10,
    color: 'white'
  },
  textPriceDiscount: {
    fontSize: 20,
    color: '#00a650',
  },
  textEnvio: {
    fontSize: 18,
    fontWeight: '200',
    fontStyle: 'italic',
    textAlign: 'left',
    color: '#ffffff',
    marginTop: 5,
    lineHeight: 32, // Mismo height que el icono para que el texto tenga la base en la misma linea
  },
  icon: {
    marginTop: 2,
    marginRight: 5,
    width: 32,
    height: 32,
  },
  chip: {
    height: 40,
    justifyContent: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginRight: 5,
  },
  
  categoria:{
    color: 'white',
    textAlign: 'center'
  },


  botonModyVolver:{
    flex: 1,
    marginHorizontal: 5,
    marginTop: 10,
    backgroundColor: 'black', 
    borderColor:'#bb86fc'
  }


});

const Detalle = ({route: {params}, ...props}) => {
  const navigator = useNavigation();
  const {producto} = params;
  const {obtenerCategoriasDelProducto} = useContext(StoreContext);
  const categorias = obtenerCategoriasDelProducto(producto);
  const [categoriasModal, setCategoriasModal] = useState(false);
  const {obtenerCompradoresProducto} = useContext(StoreContext);
  const compradores = obtenerCompradoresProducto(producto);
  const [compradoresModal, setCompradoresModal] = useState(false);


  return (
    <ScrollView style={styles.container}>
      <BottomSheetModal
        visible={categoriasModal}
        onClosePressed={() => setCategoriasModal(false)}
        title="Seleccionar Categoria">
        <SeleccionarCategoria producto={producto} />
      </BottomSheetModal>
      <BottomSheetModal
        visible={compradoresModal}
        onClosePressed={() => setCompradoresModal(false)}
        title="Seleccionar Comprador">
        <SeleccionarComprador producto={producto} />
      </BottomSheetModal>
      <Text category="h4" style={{color:'white', textAlign:'center', padding: 10}}>{producto.title}</Text>
      <View style={[styles.contenedorImgPrecio]}>
        <Image
          style={styles.logo}
          source={{
            uri: producto.thumbnail,
          }}
        />
        <View style={styles.infoProducto}>
          <TextNative style={styles.text}>
            Estado: {producto.condition}
          </TextNative>
          <View style={{flexDirection: 'row', marginTop: 20, marginLeft: 10}}>
            <Icon style={styles.icon} fill="#00a650" name="car-outline" />
            <TextNative style={styles.textEnvio}>
              Llega gratis el{' '}
              <TextNative style={{fontWeight: 'bold'}}>Miércoles</TextNative>
            </TextNative>
          </View>
          <TextNative style={styles.text}>
            Forma de pago: {'\n' + producto.installments.quantity} cuotas de ${''}
            {producto.installments.amount}
          </TextNative>
          <TextNative style={styles.textPrice}>
            ${producto.price}{' '}
            <TextNative style={styles.textPriceDiscount}>
              {100 - producto.installments.rate}% Off
            </TextNative>
          </TextNative>
        </View>
      </View>
      <Text style={styles.categoria}>Categorias:</Text>
      <FlatList
        data={categorias}
        horizontal
        renderItem={({item}) => (
          <View style={[styles.chip, {backgroundColor: item.color}]}>
            <Text>{item.nombre}</Text>
          </View>
        )}
      />
      <Text style={styles.categoria}>Comprador:</Text>
      <FlatList
        data={compradores}
        horizontal
        renderItem={({item}) => (
          <View style={[styles.chip, {backgroundColor: 'white'}]}>
            <Text>{item.nombre}</Text>
          </View>
        )}
      />
      <View style={styles.form}>
        <Button
          appearance="outline"
          style={styles.botonModyVolver}
          onPress={() => {
            setCategoriasModal(true);
          }}>
          <Text style={{color:'#bb86fc'}}>MODIFICAR CATEGORIAS</Text>
        </Button>
        <Button
          appearance="outline"
          style={styles.botonModyVolver}
          onPress={() => {
            setCompradoresModal(true);
          }}>
          <Text style={{color:'#bb86fc'}}>ELEGIR COMPRADOR</Text>
        </Button>
        <View style={styles.buttons}>
          <Button
            appearance="outline"
            style={styles.botonModyVolver}
            onPress={() => {
              navigator.goBack();
            }}>
            <Text style={{color:'#bb86fc'}}>VOLVER</Text>
          </Button>
          <Button
            status="success"
            style={styles.btnGuardar}
            onPress={() => {
              navigator.goBack();
            }}>
            <Text style={{color:'#03dac6'}}>GUARDAR</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default Detalle;
