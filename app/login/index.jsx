import { View, Text, Image, Pressable } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import Colors from './../../constants/Colors';
import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@clerk/clerk-expo';

// Warm-up browser to improve UX
export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  const navigation = useNavigation();
  const { isLoaded, userId } = useAuth();

  // Handle navigation if the user is already logged in
  useEffect(() => {
    if (isLoaded && userId) {
      console.log('User is authenticated, navigating to home...');
      navigation.navigate('home');
    }
  }, [isLoaded, userId, navigation]);

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/(tabs)/home', { scheme: 'myapp' }),
      });

      if (createdSessionId) {
        // Set the active session
        await setActive({ session: createdSessionId });
        console.log('Session set successfully.');
        // Navigate to the home screen
        navigation.navigate('home');
      } else {
        console.error('OAuth completed, but no session created.');
      }
    } catch (err) {
      console.error('OAuth error:', err);
    }
  }, [startOAuthFlow, navigation]);

  return (
    <View style={{
      backgroundColor: Colors.WHITE,
      height: '100%',
    }}>
      <Image 
        source={require('./../../assets/images/login.png')}
        style={{
          width: '100%',
          height: '65%',
        }}
      />

      <View style={{
        padding: 20,
        display: 'flex',
        alignItems: 'center',
      }}>
        <Text style={{
          fontSize: 30,
          textAlign: 'center',
          fontFamily: 'NunitoSans-Black',
          color: Colors.PRIMARY,
        }}>
          Ready to make a new Friend?
        </Text>

        <Text style={{
          fontSize: 18,
          textAlign: 'center',
          fontFamily: 'NunitoSans-ExtraBold',
          color: Colors.CORALPINK,
          marginTop: 10,
        }}>
          Let's adopt the pet which you like and make their life happy again.
        </Text>
        
        <Pressable 
          onPress={onPress}
          style={{
            backgroundColor: Colors.PRIMARY,
            padding: 10,
            borderRadius: 15,
            marginTop: 30,
            width: '100%',
          }}
        >
          <Text style={{
            textAlign: 'center',
            color: 'white',
            fontSize: 20,
            fontFamily: 'NunitoSans-Black',
          }}>
            Get Started
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
