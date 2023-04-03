import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation/Navigation';

import { AuthProvider } from './src/context/AuthContext';
import HabitsProvider from './src/context/HabitsContext';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <HabitsProvider>
          <Navigation />
        </HabitsProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}