import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useContext } from "react";
import SettingsHeader from "../components/SettingsHeader";
import { COLORS_DARK, COLORS_LIGHT, SIZES, SPACING } from "../constants";
import ThemeContext from "./../hooks/Context";
import { Switch } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Setting = ({ navigation }) => {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);
  const theme = darkTheme ? darkSettings : lightSettings;

  const [visible, setVisible] = useState(false);

  const togglePopup = () => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 4000);
  };

  const deleteChat = async () => {
    try {
      await AsyncStorage.removeItem("@chatData");
      togglePopup();
    } catch (error) {
      console.log("Error while deleting chat data: ", error);
    }
  };

  return (
    <View style={[styles.container, theme.container]}>
      <SettingsHeader navigation={navigation} />

      <View style={[styles.card, theme.card]}>
        <Text style={[styles.cardTitle, theme.cardTitle]}>Appearance</Text>
        <View style={styles.cardItem}>
          <Text style={[styles.itemText, theme.itemText]}>Dark Mode</Text>
          <Switch
            value={darkTheme}
            onValueChange={(newValue) => {
              setDarkTheme(newValue);
            }}
            trackColor={{
              false: COLORS_DARK.secondaryTwo,
              true: COLORS_DARK.primary,
            }}
            thumbColor={darkTheme ? COLORS_DARK.primaryTwo : "#555"}
          />
        </View>
      </View>

      {visible && (
        <View style={styles.popUp}>
          <Text style={{ color: "#222" }}>
            Chat Deleted! Please restart the app once.
          </Text>
        </View>
      )}

      <View style={[styles.card, theme.card]}>
        <Text style={[styles.cardTitle, theme.cardTitle]}>Data</Text>
        <TouchableOpacity onPress={deleteChat} style={styles.cardItem}>
          <Text style={[styles.itemText, theme.itemText]}>Delete Chat</Text>
        </TouchableOpacity>
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
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    marginBottom: SPACING.regular,
  },
  cardItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemText: {
    fontSize: SIZES.regular,
    paddingLeft: SPACING.large,
  },
  popUp: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    backgroundColor: "#BFC869",
    padding: SPACING.regular,

    borderTopLeftRadius: SPACING.large,
    borderTopRightRadius: SPACING.large,
    borderBottomRightRadius: SPACING.large,
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
