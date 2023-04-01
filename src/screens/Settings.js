import { StyleSheet, Text, View } from "react-native";
import React, { useState, useContext } from "react";
import SettingsHeader from "../components/SettingsHeader";
import { COLORS_DARK, COLORS_LIGHT, SIZES, SPACING } from "../constants";
import ThemeContext from "./../hooks/Context";
import Checkbox from "expo-checkbox";

const Setting = ({ navigation }) => {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);
  const theme = darkTheme ? darkSettings : lightSettings;

  return (
    <View style={[styles.container, theme.container]}>
      <SettingsHeader navigation={navigation} />

      <View style={[styles.card, theme.card]}>
        <Text style={[styles.cardTitle, theme.cardTitle]}>Appearance</Text>
        <View style={styles.cardItem}>
          <Text style={[styles.itemText, theme.itemText]}>Dark Mode</Text>
          <Checkbox
            style={styles.checkbox}
            value={darkTheme}
            onValueChange={(newValue) => {
              setDarkTheme(newValue);
            }}
            color={darkTheme ? COLORS_DARK.primaryTwo : undefined}
          />
        </View>
      </View>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    padding: 20,
  },
  cardTitle: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    marginBottom: SPACING.regular,
  },
  cardItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: SPACING.regular,
  },
  itemText: {
    fontSize: SIZES.regular,
  },
  checkbox: {
    height: 20,
    width: 20,
  },
});

const darkSettings = StyleSheet.create({
  container: {
    backgroundColor: COLORS_DARK.secondary,
  },
  card: {
    backgroundColor: COLORS_DARK.black,
  },
  cardTitle: {
    color: COLORS_DARK.white,
  },
  itemText: {
    color: COLORS_DARK.secondaryTwo,
  },
});

const lightSettings = StyleSheet.create({
  container: {
    backgroundColor: COLORS_LIGHT.secondary,
  },
  card: {
    backgroundColor: COLORS_LIGHT.white,
  },
});
