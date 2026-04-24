import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const pontos = [
  {
    id: '1',
    nome: 'Jardim Botânico',
    descricao: 'Um dos mais famosos cartões-postais da cidade, com belas estufas em estilo art nouveau.',
  },
  {
    id: '2',
    nome: 'Ópera de Arame',
    descricao: 'Teatro com estrutura tubular e teto transparente, em meio à natureza.',
  },
  {
    id: '3',
    nome: 'Parque Tanguá',
    descricao: 'Antiga pedreira transformada em parque com cascata e mirante.',
  },
  {
    id: '4',
    nome: 'Museu Oscar Niemeyer',
    descricao: 'Conhecido como Museu do Olho, com arte moderna e contemporânea.',
  },
];

const ListaPontosTuristicos = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.mainTitle}>Conheça Curitiba!</Text>

        {pontos.map(ponto => (
          <TouchableOpacity
            key={ponto.id}
            style={styles.card}
            onPress={() => navigation.navigate('DetalhesPonto', {
              pontoId: ponto.id,
              nomePonto: ponto.nome,
              descricaoPonto: ponto.descricao,
            })}
          >
            <Text style={styles.titulo}>{ponto.nome}</Text>
            <Text style={styles.descricao}>{ponto.descricao}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 30,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
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

export default ListaPontosTuristicos;