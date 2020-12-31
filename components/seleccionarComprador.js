import {CheckBox, Divider, List, Text} from '@ui-kitten/components';
import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {StoreContext} from '../context/storeContext';

const styles = StyleSheet.create({
  chip: {width: 30, height: 10, borderRadius: 10},
  list: {backgroundColor: 'transparent', marginTop: 10},
  item: {paddingVertical: 20},
});

const SeleccionarComprador = ({producto}) => {
  const {
    obtenerCompradoresProducto,
    compradores,
    agregarProductoAComprador,
    quitarProductoAComprador,
  } = useContext(StoreContext);
  const compradoresProducto = obtenerCompradoresProducto(producto);

  const renderItem = ({item, index}) => {
    const comprador = item;

    const renderColor = (color) => {
      return (
        <View
          style={[
            styles.chip,
            {
              backgroundColor: color,
            },
          ]}
        />
      );
    };

    const compradorAsignado = compradoresProducto
      .map((c) => c.id)
      .includes(comprador.id);

    return (
      <View style={styles.item}>
        <CheckBox
          status="primary"
          checked={compradorAsignado}
          onChange={() => {
            if (!compradorAsignado) {
              agregarProductoAComprador(comprador, producto);
            } else {
              quitarProductoAComprador(comprador, producto);
            }
          }}>
          <Text category="s1">
            {comprador.nombre}
            {'    '}
          </Text>
        </CheckBox>
      </View>
    );
  };

  return (
    <List
      style={styles.list}
      data={compradores}
      ItemSeparatorComponent={Divider}
      renderItem={renderItem}
    />
  );
};

export default SeleccionarComprador;
