import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { INTEGRANTES } from '../constants/grupo';
import { colors } from '../theme';

export default function GroupInfoScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Sobre o app</Text>
        <Text style={styles.text}>
          Este aplicativo foi desenvolvido em React Native com Expo como trabalho acadêmico na
          ATITUS Educação. Ele consome a Fake Store API para autenticar usuários, listar produtos
          com filtro por categoria e exibir os detalhes de cada produto.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Desenvolvedores</Text>
      {INTEGRANTES.map((integrante) => (
        <View key={integrante.ra} style={styles.member}>
          <Text style={styles.memberName}>{integrante.nome}</Text>
          <Text style={styles.memberRa}>RA: {integrante.ra}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: { backgroundColor: colors.card, borderRadius: 12, padding: 16, marginBottom: 20 },
  title: { fontSize: 18, fontWeight: 'bold', color: colors.text, marginBottom: 8 },
  text: { fontSize: 15, lineHeight: 22, color: colors.muted },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: colors.text, marginBottom: 12 },
  member: {
    backgroundColor: colors.card,
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  memberName: { fontSize: 16, fontWeight: '600', color: colors.text },
  memberRa: { fontSize: 14, color: colors.muted, marginTop: 2 },
});
