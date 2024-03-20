import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import axios from 'axios';

const App = () => {
  const [mesas, setMesas] = useState([]);

  useEffect(() => {
    obtenerMesas();
  }, []);

  const obtenerMesas = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:3000/mesas');
      setMesas(response.data);
    } catch (error) {
      console.error('Error al obtener las mesas:', error);
    }
  };

  const reservarMesa = async numeroMesa => {
    try {
      await axios.put(`http://10.0.2.2:3000/reservar-mesa/${numeroMesa}`);
      obtenerMesas(); // Actualizar la lista de mesas después de la reserva
    } catch (error) {
      console.error('Error al reservar la mesa:', error);
    }
  };

  const liberarMesa = async (numeroMesa) => {
    try {
      await axios.put(`http://10.0.2.2:3000/liberar-mesa/${numeroMesa}`);
      obtenerMesas(); // Actualizar la lista de mesas después de la liberación
    } catch (error) {
      console.error('Error al liberar la mesa:', error);
    }
  };

  return (
    <View>
      <Text>Lista de Mesas</Text>
      {mesas.map((mesa) => (
        <View key={mesa.numero}>
          <Text>{`Mesa ${mesa.numero}: ${mesa.estado}`}</Text>
          {mesa.estado === 'libre' && (
            <Button title="Reservar" onPress={() => reservarMesa(mesa.numero)} />
          )}
          {mesa.estado === 'reservada' && (
            <Button title="Liberar" onPress={() => liberarMesa(mesa.numero)} />
          )}
        </View>
      ))}
    </View>
  );
};

export default App;
