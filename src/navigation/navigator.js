import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Chat from "./../screens/Chat";
import Landing from "./../screens/Landing";

const Stack = createNativeStackNavigator();
const screenOptionStyle = {
  headerShown: false,
};

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
