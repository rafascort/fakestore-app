import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import GroupInfoScreen from './src/screens/GroupInfoScreen';
import HeaderButton from './src/components/HeaderButton';
import { colors } from './src/theme';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          headerTitleAlign: 'center',
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: 'Produtos',
            headerBackVisible: false,
            gestureEnabled: false,
            // Header personalizado: Logout à esquerda, título no centro, Informações à direita
            headerLeft: () => (
              <HeaderButton
                label="Sair"
                onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Login' }] })}
              />
            ),
            headerRight: () => (
              <HeaderButton label="Info" onPress={() => navigation.navigate('GroupInfo')} />
            ),
          })}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailsScreen}
          options={{ title: 'Detalhes do Produto' }}
        />
        <Stack.Screen
          name="GroupInfo"
          component={GroupInfoScreen}
          options={{ title: 'Informações do Grupo' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
