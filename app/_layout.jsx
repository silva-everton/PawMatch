import { useFonts } from 'expo-font';
import { Stack } from "expo-router";

export default function RootLayout() {

  useFonts({
    'NunitoSans-Black': require('../assets/fonts/NunitoSans_10pt-Black.ttf'),
    'NunitoSans-Bold': require('../assets/fonts/NunitoSans_10pt-Bold.ttf'),
    'NunitoSans-ExtraBold': require('../assets/fonts/NunitoSans_10pt-ExtraBold.ttf'),
    'NunitoSans-Light': require('../assets/fonts/NunitoSans_10pt-Light.ttf'),
    'NunitoSans-Medium': require('../assets/fonts/NunitoSans_10pt-Medium.ttf'),
  })

  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="login/index" 
        options={{
          headerShown: false,
        }}
      />

    </Stack>
  );
}
