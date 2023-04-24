import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation/Navigation';

import { AuthProvider } from './src/context/AuthContext';
import HabitsProvider from './src/context/HabitsContext';
import LoadingModal from './src/components/LoadingModal';
import { UIProvider } from './src/context/UIContext';

export default function App() {
  return (
    <NavigationContainer>
      <UIProvider>
        <AuthProvider>
          <HabitsProvider>
            <LoadingModal />
            <Navigation />
          </HabitsProvider>
        </AuthProvider>
      </UIProvider>
    </NavigationContainer>
  );
}