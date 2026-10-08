import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';

// Botão usado no header da Home (Sair / Info)
export default function HeaderButton({ label, onPress }) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 14,
  },
  text: { color: colors.primary, fontSize: 15, fontWeight: 'bold' },
});
