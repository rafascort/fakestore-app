import { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { getProducts, getProductsByCategory, getCategories } from '../services/api';
import { formatPrice, formatCategory } from '../utils/format';
import useFetch from '../hooks/useFetch';
import ErrorMessage from '../components/ErrorMessage';
import LoadingIndicator from '../components/LoadingIndicator';
import { colors } from '../theme';

// Usadas caso o endpoint de categorias falhe
const DEFAULT_CATEGORIES = ['electronics', 'jewelery', "men's clothing", "women's clothing"];
const NO_PRODUCTS = [];
const PRODUCTS_ERROR = 'Não foi possível carregar os produtos.';

export default function HomeScreen({ navigation }) {
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState(null); // filtro começa vazio

  // Carrega a lista de categorias uma vez
  useEffect(() => {
    getCategories()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setCategories(data);
      })
      .catch(() => {
        // mantém a lista padrão
      });
  }, []);

  // Busca os produtos (todos ou da categoria selecionada) e refaz ao mudar o filtro
  const fetchProducts = useCallback(
    () => (selectedCategory ? getProductsByCategory(selectedCategory) : getProducts()),
    [selectedCategory]
  );
  const {
    data: products,
    loading,
    error,
    reload,
  } = useFetch(fetchProducts, { fallbackMessage: PRODUCTS_ERROR, initialData: NO_PRODUCTS });

  function renderProduct({ item }) {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('ProductDetails', { id: item.id })}
      >
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.price}>{formatPrice(item.price)}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      {/* Filtro por categoria */}
      <View style={styles.filterBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => {
            const active = category === selectedCategory;
            return (
              <TouchableOpacity
                key={category}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => setSelectedCategory(category)}
                disabled={loading}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>
                  {formatCategory(category)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        {selectedCategory && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setSelectedCategory(null)}
            disabled={loading}
          >
            <Text style={styles.clearText}>Limpar filtro ✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {loading ? (
        <LoadingIndicator message="Carregando produtos..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={reload} />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderProduct}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.empty}>Nenhum produto encontrado.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  filterBar: {
    backgroundColor: colors.card,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.primary,
    marginHorizontal: 4,
  },
  chipActive: { backgroundColor: colors.primary },
  chipText: { color: colors.primary, fontWeight: '500' },
  chipTextActive: { color: '#fff' },
  clearButton: { alignSelf: 'flex-end', marginTop: 8, marginRight: 4 },
  clearText: { color: colors.error, fontWeight: '600' },
  list: { padding: 12 },
  card: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  image: { width: 80, height: 80, marginRight: 12 },
  info: { flex: 1 },
  name: { fontSize: 15, color: colors.text, marginBottom: 6 },
  price: { fontSize: 16, fontWeight: 'bold', color: colors.price },
  empty: { textAlign: 'center', color: colors.muted, marginTop: 32 },
});
