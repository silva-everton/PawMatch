import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

// Token cache implementation for Clerk
const tokenCache = {
  async getToken(key) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log('No values stored under key: ' + key);
      }
      return item;
    } catch (error) {
      console.error('SecureStore get item error: ', error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return await SecureStore.setItemAsync(key, value);
    } catch (err) {
      console.error('SecureStore save item error: ', err);
    }
  },
};

export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  // Load custom fonts
  const [fontsLoaded] = useFonts({
    'NunitoSans-Black': require('../assets/fonts/NunitoSans_10pt-Black.ttf'),
    'NunitoSans-Bold': require('../assets/fonts/NunitoSans_10pt-Bold.ttf'),
    'NunitoSans-ExtraBold': require('../assets/fonts/NunitoSans_10pt-ExtraBold.ttf'),
    'NunitoSans-Light': require('../assets/fonts/NunitoSans_10pt-Light.ttf'),
    'NunitoSans-Medium': require('../assets/fonts/NunitoSans_10pt-Medium.ttf'),
  });

  // Ensure fonts are loaded before rendering
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ClerkProvider 
    tokenCache={tokenCache} 
    publishableKey={publishableKey}>
      <ClerkLoaded>
        <Stack>
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)"
            options={{
              headerShown: false,
            }}
          
          />
          <Stack.Screen
            name="login/index"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </ClerkLoaded>
    </ClerkProvider>
  );
}

