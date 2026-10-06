import { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { getProductById, getErrorMessage } from '../services/api';
import { formatPrice, formatCategory } from '../utils/format';
import ErrorMessage from '../components/ErrorMessage';
import { colors } from '../theme';

export default function ProductDetailsScreen({ route }) {
  const { id } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProduct = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await getProductById(id);
      // A API pode responder 200 com corpo vazio para ids inexistentes
      if (!data) throw new Error('Produto não encontrado.');
      setProduct(data);
    } catch (err) {
      setError(getErrorMessage(err, 'Não foi possível carregar o produto.'));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Carregando produto...</Text>
      </View>
    );
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={loadProduct} />;
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
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 8, color: colors.muted },
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
