import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import HomeStackNavigator from "./src/navigation/navigator";
import { useState } from "react";
import ThemeContext from "./src/hooks/Context";

export default function App() {
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <NavigationContainer>
      <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
        <View style={styles.container}>
          <HomeStackNavigator />
        </View>
      </ThemeContext.Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
