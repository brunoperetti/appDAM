import React, {useContext, useState} from 'react';
import {Button, Card, Icon, Text} from '@ui-kitten/components';
import {StyleSheet, View, FlatList, TextInput} from 'react-native';
import {StoreContext} from '../context/storeContext';
import BottomSheetModal from './bottomSheetModal';
import useOrientation, {SCREEN} from '../hooks/useOrientation';
import {TouchableOpacity} from 'react-native-gesture-handler';


const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: '#121212'},
    card: {flex: 1, margin: 5, backgroundColor: 'blue'},
    button: {
      position: 'absolute',
      bottom: 30,
      right: 30,
      zIndex: 999,
      borderRadius: 60,
      width: 60,
      height: 60,
      backgroundColor: '#bb86fc',
    },
    modalView: {
      backgroundColor: '#121212',
      paddingVertical: 10,
      borderTopStartRadius: 20,
      borderTopEndRadius: 20,
      height: '50%',
      padding: 10,

    },
    modalContainer: {
      backgroundColor: '#121212',
      flex: 1,
      flexDirection: 'column-reverse',
    },
    textInput: {
      height: 40,
      borderColor: 'blue',
      borderWidth: 2,
      borderRadius: 20,
      paddingHorizontal: 10,
      backgroundColor: 'lightgrey',
      marginVertical: 10,
    },
    modalButton: {
      marginVertical: 10,
      backgroundColor: '#bb86fc'
    },
    cardText: {textAlign: 'center', fontWeight: 'bold', color: 'white'},
  });

export const ListaCompradores = () => {
    const {compradores, setCompradores} = useContext(StoreContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [primaraPantalla, setPrimeraPantalla] = useState(true);
    const [nombreNuevoComprador, setNombreNuevoComprador] = useState('');
    const [emailNuevoComprador, setEmailNuevoComprador] = useState('');
    const screenDirection = useOrientation();

    const crearComprador = () => {
        setCompradores([
          ...compradores,
          {
            nombre: nombreNuevoComprador,
            email: emailNuevoComprador,
            id: Math.random(),
          },
        ]);

        setNombreNuevoComprador('');
        setEmailNuevoComprador('');
        setModalVisible(false);
      };

      return (
        <View style={styles.container}>
          <BottomSheetModal
            visible={modalVisible}
            onClosePressed={() => setModalVisible(false)}
            title={primaraPantalla ? 'Crear un comprador' : 'Elegir Color'}>
            <>
              {primaraPantalla && (
                <PrimeraPantalla
                  nombreNuevoComprador={nombreNuevoComprador}
                  setNombreNuevoComprador={setNombreNuevoComprador}
                  emailNuevoComprador={emailNuevoComprador}
                  setEmailNuevoComprador={setEmailNuevoComprador}
                  setPrimeraPantalla={setPrimeraPantalla}
                  crearComprador={crearComprador}
                />
              )}
              {!primaraPantalla && (
                <SegundaPantalla
                  setPrimeraPantalla={setPrimeraPantalla}
                  setEmailNuevoComprador={setEmailNuevoComprador}
                />
              )}
            </>
          </BottomSheetModal>
          <Button 
            style={styles.button}
            accessoryLeft={PlusIcon}
            onPress={() => setModalVisible(true)}
          />
          <FlatList
            data={compradores}
            key={screenDirection}
            numColumns={screenDirection === SCREEN.LANDSCAPE ? 4 : 2}
            renderItem={({item}) => {
              return (
                <Card
                  style={{...styles.card, backgroundColor: item.color}}
                  key={item.id}>
                  <Text style={styles.cardText}>{item.nombre}</Text>
                </Card>
              );
            }}
          />
        </View>
      );
    };



    const PrimeraPantalla = ({
        nombreNuevoComprador,
        setNombreNuevoComprador,
        emailNuevoComprador,
        setEmailNuevoComprador,
        setPrimeraPantalla,
        crearComprador,
      }) => {
        return (
          <>
            <TextInput
              placeholder="Nombre de Comprador"
              style={styles.textInput}
              value={nombreNuevoComprador}
              onChangeText={(nuevoTexto) => {
                setNombreNuevoComprador(nuevoTexto);
              }}
            />
            <TouchableOpacity onPress={() => setPrimeraPantalla(false)}>
              <TextInput
                placeholder="Email de comprador"
                style={styles.textInput}
                value={emailNuevoComprador}
                onChangeText={(nuevoTexto) => {
                  setEmailNuevoComprador(nuevoTexto);
                }}
              />
            </TouchableOpacity>
            <Button style={styles.modalButton} onPress={() => crearComprador()}>
              Crear Comprador
            </Button>
          </>
        );
      };
      
      const SegundaPantalla = ({setEmailNuevoComprador, setPrimeraPantalla}) => {
        return (
          <>
            <ColorPicker
              onColorSelected={(color) => {
                setPrimeraPantalla(true);
                setEmailNuevoComprador(email);
              }}
              hideSliders={true}
              style={styles.container}
            /> 
            <Button
              style={styles.modalButton}
              onPress={() => setPrimeraPantalla(true)}>
              Volver
            </Button>
          </>
        );
      };
      
      const PlusIcon = (props) => <Icon {...props} name="plus-outline" />;