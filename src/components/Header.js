import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>ChadBOT</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    justifyContent: "center",
    marginTop: 50,
    padding: 10,
    alignItems: "center",
  },
  title: {
    color: "#222",
    fontSize: 28,
  },
});
