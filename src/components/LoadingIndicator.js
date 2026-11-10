import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '../theme';

// Indicador de carregamento centralizado, reutilizável em qualquer tela
export default function LoadingIndicator({ message }) {
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color={colors.primary} />
      {message ? <Text style={styles.text}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { marginTop: 8, color: colors.muted },
});
