import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const DetalhesPontoTuristico = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { pontoId, nomePonto, descricaoPonto } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{nomePonto}</Text>
      <Text style={styles.descricao}>{descricaoPonto}</Text>
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  descricao: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
});

export default DetalhesPontoTuristico;