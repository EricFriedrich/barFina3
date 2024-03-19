import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';

const App = () => {
  const [menuAlimentos, setMenuAlimentos] = useState([]);
  const [menuBebidas, setMenuBebidas] = useState([]);

  useEffect(() => {
    fetchMenuAlimentos();
    fetchMenuBebidas();
  }, []);

  const fetchMenuAlimentos = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3000/menu');
      const data = await response.json();
      setMenuAlimentos(data);
    } catch (error) {
      console.error('Error al obtener el menú de alimentos:', error);
    }
  };

  const fetchMenuBebidas = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3000/bebidas');
      const data = await response.json();
      setMenuBebidas(data);
    } catch (error) {
      console.error('Error al obtener el menú de bebidas:', error);
    }
  };

  const verMenuAlimentos = () => {
    console.log(menuAlimentos);
  };

  const verMenuBebidas = () => {
    console.log(menuBebidas);
  };

  const renderMenu = (menu: any[]) => {
    return menu.map((item, index) => (
      <View key={index} style={{marginBottom: 10}}>
        <Text>Nombre: {item.nombre}</Text>
        <Text>Precio: {item.precio}</Text>
        <Text>Categoría: {item.categoria}</Text>
      </View>
    ));
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{marginBottom: 20}}>
        <Text>Menú Alimentos</Text>
        <Button title="Ver Menú Alimentos" onPress={verMenuAlimentos} />
        <View style={{marginTop: 20}}>{renderMenu(menuAlimentos)}</View>
      </View>
      <View>
        <Text>Menú Bebidas</Text>
        <Button title="Ver Menú Bebidas" onPress={verMenuBebidas} />
        <View style={{marginTop: 20}}>{renderMenu(menuBebidas)}</View>
      </View>
    </View>
  );
};

export default App;
