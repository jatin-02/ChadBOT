import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { COLORS_DARK, COLORS_LIGHT, SPACING } from "../constants";
import { MaterialIcons } from "@expo/vector-icons";
import ThemeContext from "./../hooks/Context";

const SettingsHeader = ({ navigation }) => {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);
  const theme = darkTheme ? darkHeader : lightHeader;

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()}>
        <MaterialIcons
          name="keyboard-backspace"
          size={32}
          color={
            darkTheme ? COLORS_DARK.secondaryTwo : COLORS_LIGHT.secondaryTwo
          }
        />
      </TouchableOpacity>
      <Text style={[styles.title, theme.title]}>Settings</Text>
    </View>
  );
};

export default SettingsHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  title: {
    color: "#222",
    fontSize: 22,
    marginLeft: SPACING.regular,
  },
});

const darkHeader = StyleSheet.create({
  title: {
    color: COLORS_DARK.secondaryTwo,
  },
});

const lightHeader = StyleSheet.create({
  title: {
    color: COLORS_LIGHT.secondaryTwo,
  },
});
