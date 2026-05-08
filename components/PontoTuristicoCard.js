import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PontoTuristicoCard = (props) => {
  return (
    <TouchableOpacity style={styles.card} onPress={props.onPress}>
      <Text style={styles.titulo}>{props.nome}</Text>
      <Text style={styles.descricao}>{props.descricao}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  descricao: {
    fontSize: 14,
    color: '#666',
  },
});

export default PontoTuristicoCard;