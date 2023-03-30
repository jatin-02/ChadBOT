import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import React, { useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import Header from "../components/Header";
import { API_KEY } from "@env";

const Chat = () => {
  const [data, setData] = useState([
    {
      type: "bot",
      text: "Hello! I am ChadBOT built by Jatin Soni and I can answer all your questions.",
    },
  ]);
  const [textInput, setTextInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const apiUrl =
    "https://api.openai.com/v1/engines/text-davinci-002/completions";

  const flatListRef = useRef();

  const handleSend = async () => {
    try {
      setLoading(true);
      Keyboard.dismiss();

      const prompt = textInput;
      setIsTyping(true);
      const response = await axios.post(
        apiUrl,
        {
          prompt: prompt,
          max_tokens: 1024,
          temperature: 0.5,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      const text = response.data.choices[0].text.trim();

      setData([
        ...data,
        { type: "user", text: textInput },
        { type: "bot", text: text },
      ]);

      setTextInput("");
      setLoading(false);
      flatListRef.current.scrollToEnd();
      setIsTyping(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header />

      <FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        style={styles.body}
        renderItem={({ item }) => (
          <View style={item.type === "user" ? styles.userList : styles.botList}>
            <Text
              style={
                item.type === "user"
                  ? [styles.msg, styles.user]
                  : [styles.msg, styles.bot]
              }
            >
              {item.text}
            </Text>
          </View>
        )}
      />

      <View style={styles.bottom}>
        <TextInput
          value={textInput}
          onChangeText={(text) => setTextInput(text)}
          placeholder="Ask me anything"
          placeholderTextColor="#919191"
          style={{ width: "80%" }}
        />

        <TouchableOpacity onPress={handleSend}>
          {loading ? (
            <ActivityIndicator color="#919191" />
          ) : (
            <Ionicons name="ios-send-outline" size={22} color="#919191" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  body: {
    width: "100%",
    padding: 10,
    backgroundColor: "#fff",
  },
  botList: {
    flexDirection: "row",
    padding: 5,
  },
  userList: {
    flexDirection: "row",
    flexDirection: "row-reverse",
    padding: 10,
  },
  msg: {
    fontWeight: "bold",
    padding: 20,
    fontSize: 16,
    lineHeight: 22,
  },
  user: {
    color: "#222",
    backgroundColor: "#F8ECEB",
    shadowColor: "#52006A",
    elevation: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  bot: {
    color: "grey",
    backgroundColor: "#F3F3F3",
    marginBottom: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    padding: 5,
    marginVertical: 10,
    borderRadius: 15,
  },
});
