import { useCallback } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { getProductById } from '../services/api';
import { formatPrice, formatCategory } from '../utils/format';
import useFetch from '../hooks/useFetch';
import ErrorMessage from '../components/ErrorMessage';
import LoadingIndicator from '../components/LoadingIndicator';
import { colors } from '../theme';

export default function ProductDetailsScreen({ route }) {
  const { id } = route.params;
  const fetchProduct = useCallback(() => getProductById(id), [id]);
  const {
    data: product,
    loading,
    error,
    reload,
  } = useFetch(fetchProduct, { fallbackMessage: 'Não foi possível carregar o produto.' });

  if (loading) {
    return <LoadingIndicator message="Carregando produto..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={reload} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageBox}>
        <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.card}>
        <Text style={styles.category}>{formatCategory(product.category)}</Text>
        <Text style={styles.name}>{product.title}</Text>
        <Text style={styles.price}>{formatPrice(product.price)}</Text>
        <Text style={styles.sectionTitle}>Descrição</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  imageBox: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  image: { width: '100%', height: 260 },
  card: { backgroundColor: colors.card, borderRadius: 12, padding: 16 },
  category: {
    alignSelf: 'flex-start',
    backgroundColor: '#DBEAFE',
    color: colors.primaryDark,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    fontSize: 13,
    fontWeight: '600',
    overflow: 'hidden',
    marginBottom: 10,
  },
  name: { fontSize: 20, fontWeight: 'bold', color: colors.text, marginBottom: 8 },
  price: { fontSize: 22, fontWeight: 'bold', color: colors.price, marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: colors.text, marginBottom: 6 },
  description: { fontSize: 15, lineHeight: 22, color: colors.muted },
});
