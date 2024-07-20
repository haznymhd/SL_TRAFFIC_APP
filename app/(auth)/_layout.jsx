import { Stack } from 'expo-router';

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen 
        name="public-login"
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="admin-login"
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="public-register"
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="home"
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="admin-home"
        options={{ headerShown: false }}
      />      
      <Stack.Screen 
      name="add-laws"
      options={{ headerShown: false }}
    />
    </Stack>
    
  );
};

export default AuthLayout;