// Formata um número como moeda brasileira. Ex.: 199.9 -> "R$ 199,90"
// Feito manualmente para não depender do suporte a Intl de cada dispositivo.
export function formatPrice(value) {
  const number = Number(value) || 0;
  const [integer, decimal] = number.toFixed(2).split('.');
  const withThousands = integer.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `R$ ${withThousands},${decimal}`;
}

// Traduz o nome das categorias da API para exibição
const CATEGORY_LABELS = {
  electronics: 'Eletrônicos',
  jewelery: 'Joias',
  "men's clothing": 'Roupas masculinas',
  "women's clothing": 'Roupas femininas',
};

export function formatCategory(category) {
  return CATEGORY_LABELS[category] || category;
}
