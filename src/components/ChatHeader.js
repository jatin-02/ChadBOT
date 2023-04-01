import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import ThemeContext from "../hooks/Context";
import { COLORS_DARK, COLORS_LIGHT } from "../constants";
import { Ionicons } from "@expo/vector-icons";

const ChatHeader = ({ navigation }) => {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);
  const theme = darkTheme ? darkHeader : lightHeader;

  return (
    <View style={styles.headerContainer}>
      <Text style={[styles.title, theme.title]}>ChadBOT</Text>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate("Settings")}
      >
        <Ionicons
          name="ios-settings-outline"
          size={24}
          color={
            darkTheme ? COLORS_DARK.secondaryTwo : COLORS_LIGHT.secondaryTwo
          }
        />
      </TouchableOpacity>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 30,
    padding: 20,
    alignItems: "center",
  },
  title: {
    color: "#222",
    fontSize: 26,
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
