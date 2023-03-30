import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

const Landing = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/landing-img.png")}
        style={styles.image}
      />

      <Text style={{ fontWeight: "bold", fontSize: 25 }}>
        Welcome to ChadBOT
      </Text>
      <Text style={styles.landingText}>
        Your friendly and intelligent chatbot. Ask me anything!
      </Text>

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.btn}
        onPress={() => navigation.navigate("Chat")}
      >
        <Text style={styles.btnText}>Let's Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Landing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 0.5,
    width: 400,
    height: 400,
    resizeMode: "contain",
  },
  landingText: {
    fontSize: 18,
    marginHorizontal: 35,
    marginVertical: 5,
    textAlign: "center",
    lineHeight: 30,
    color: "grey",
  },
  btn: {
    backgroundColor: "#B95476",
    padding: 20,
    marginTop: 30,
    borderRadius: 30,
  },
  btnText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
