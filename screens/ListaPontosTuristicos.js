import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PontoTuristicoCard from '../components/PontoTuristicoCard';
import api from '../services/api';

const ListaPontosTuristicos = () => {
  const navigation = useNavigation();
  const [pontosTuristicos, setPontosTuristicos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timerId);
  }, [searchTerm]);

  useEffect(() => {
    const fetchPontosTuristicos = async () => {
      try {
        const response = await api.get('/posts');
        const dadosAdaptados = response.data.map(item => ({
          id: String(item.id),
          nome: item.title,
          descricao: item.body,
          imagem: `https://picsum.photos/id/${item.id % 100}/150/150`,
          latitude: -25.4284 + (Math.random() - 0.5) * 0.1,
          longitude: -49.2733 + (Math.random() - 0.5) * 0.1,
          detalhesCompletos: item.body + ' ' + item.title,
          categoria: item.id % 3 === 0 ? 'Parque' : (item.id % 3 === 1 ? 'Museu' : 'Teatro'),
        }));
        setPontosTuristicos(dadosAdaptados);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        setError("Não foi possível carregar os pontos turísticos.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPontosTuristicos();
  }, []);

  const filteredPontos = useMemo(() => {
    let currentFiltered = pontosTuristicos;

    if (debouncedSearchTerm) {
      const lowerCaseSearchTerm = debouncedSearchTerm.toLowerCase();
      currentFiltered = currentFiltered.filter(ponto =>
        ponto.nome.toLowerCase().includes(lowerCaseSearchTerm) ||
        ponto.descricao.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    if (selectedCategory !== 'Todos') {
      currentFiltered = currentFiltered.filter(ponto =>
        ponto.categoria === selectedCategory
      );
    }

    return currentFiltered;
  }, [pontosTuristicos, debouncedSearchTerm, selectedCategory]);

  const handlePontoPress = (ponto) => {
    navigation.navigate('DetalhesPonto', { pontoDetalhes: ponto });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Carregando pontos turísticos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Pontos Turísticos</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar pontos turísticos..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <View style={styles.categoryFilterContainer}>
        {['Todos', 'Parque', 'Museu', 'Teatro'].map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategoryButton,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategory === category && styles.selectedCategoryButtonText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {filteredPontos.length === 0 && debouncedSearchTerm !== '' ? (
        <Text style={styles.noResultsText}>Nenhum resultado encontrado para "{debouncedSearchTerm}".</Text>
      ) : (
        <FlatList
          data={filteredPontos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PontoTuristicoCard
              ponto={item}
              onPress={() => handlePontoPress(item)}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  searchInput: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginHorizontal: 20,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  categoryFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
  selectedCategoryButton: {
    backgroundColor: '#007bff',
  },
  categoryButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  selectedCategoryButtonText: {
    color: '#fff',
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffe0e0',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginHorizontal: 20,
  },
});

export default ListaPontosTuristicos;