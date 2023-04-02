import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import HomeStackNavigator from "./src/navigation/navigator";
import { useState, useEffect } from "react";
import ThemeContext from "./src/hooks/Context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    const loadDarkTheme = async () => {
      try {
        const value = await AsyncStorage.getItem("darkTheme");
        if (value !== null) {
          setDarkTheme(value === "true");
        }
      } catch (error) {
        console.log("Error loading darkTheme value from async storage:", error);
      }
    };
    loadDarkTheme();
  }, []);

  useEffect(() => {
    const saveDarkTheme = async () => {
      try {
        await AsyncStorage.setItem("darkTheme", darkTheme.toString());
      } catch (error) {
        console.log("Error saving darkTheme value to async storage:", error);
      }
    };
    saveDarkTheme();
  }, [darkTheme]);

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
