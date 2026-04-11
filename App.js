import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import PontoTuristicoCard from './components/PontoTuristicoCard';

export default function App() {
  return (
    <ScrollView style={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={styles.mainTitle}>Conheça Curitiba!</Text>

        <PontoTuristicoCard
          nome="Jardim Botânico"
          descricao="Um dos mais famosos cartões-postais da cidade."
        />
        <PontoTuristicoCard
          nome="Ópera de Arame"
          descricao="Teatro com estrutura tubular e teto transparente, em meio à natureza."
        />
        <PontoTuristicoCard
          nome="Parque Tanguá"
          descricao="Antiga pedreira transformada em parque com cascata e mirante."
        />
        <PontoTuristicoCard
          nome="Museu Oscar Niemeyer"
          descricao="Conhecido como Museu do Olho, com arte moderna e contemporânea."
        />

        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
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
});