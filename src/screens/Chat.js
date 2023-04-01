import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import React, { useState, useRef, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import ChatHeader from "../components/ChatHeader";
import { API_KEY } from "@env";
import ThemeContext from "../hooks/Context";
import { COLORS_DARK, COLORS_LIGHT, FONTS, SIZES, SPACING } from "../constants";

const Chat = ({ navigation }) => {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);
  const theme = darkTheme ? darkChat : lightChat;
  const [data, setData] = useState([
    {
      type: "bot",
      text: "Hello! I am Chad built by Jatin Soni and I can answer all your questions.",
    },
  ]);
  const [textInput, setTextInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const apiUrl =
    "https://api.openai.com/v1/engines/text-davinci-002/completions";

  const flatListRef = useRef();

  const togglePopup = () => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  };

  const handleCopy = () => {
    const lastMessage = data[data.length - 1]?.text;
    if (lastMessage) {
      Clipboard.setStringAsync(lastMessage);
    }
    togglePopup();
  };

  const handleSend = async () => {
    try {
      setLoading(true);
      Keyboard.dismiss();

      const prompt = textInput + ". Answer it like a chad and in a funny way.";
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
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, theme.container]}>
      <ChatHeader navigation={navigation} />

      <View style={[styles.body, theme.body]}>
        <FlatList
          ref={flatListRef}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              style={item.type === "user" ? styles.userList : styles.botList}
            >
              <Text
                style={
                  item.type === "user"
                    ? [styles.msg, styles.user, theme.user]
                    : [styles.msg, styles.bot, theme.bot]
                }
              >
                {item.text}
              </Text>
            </View>
          )}
        />
        {visible && (
          <View style={styles.copyText}>
            <Text style={{ color: "#fff" }}>Copied!</Text>
          </View>
        )}
      </View>

      <View style={styles.bottom}>
        <TextInput
          value={textInput}
          onChangeText={(text) => setTextInput(text)}
          placeholder="Ask me anything"
          placeholderTextColor={
            darkTheme ? COLORS_DARK.secondaryTwo : COLORS_LIGHT.secondaryTwo
          }
          selectionColor={COLORS_LIGHT.secondaryTwo}
          style={{ width: "80%" }}
        />

        <TouchableOpacity onPress={handleCopy}>
          <MaterialIcons
            name="content-copy"
            size={22}
            color="#919191"
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSend}>
          {loading ? (
            <ActivityIndicator color="#919191" />
          ) : (
            <Ionicons
              name="ios-send-outline"
              size={22}
              color={
                darkTheme ? COLORS_DARK.secondaryTwo : COLORS_LIGHT.secondaryTwo
              }
            />
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
    flex: 1,
    width: "100%",
    padding: SPACING.regular,
  },
  botList: {
    flexDirection: "row",
    padding: SPACING.small,
  },
  userList: {
    flexDirection: "row-reverse",
    padding: SPACING.regular,
  },
  msg: {
    fontWeight: FONTS.bold,
    padding: SPACING.large,
    fontSize: SIZES.regular,
    lineHeight: SPACING.large + 2,
  },
  user: {
    elevation: SPACING.regular + 2,
    shadowColor: "#52006A",

    marginLeft: SPACING.large,

    borderTopLeftRadius: SPACING.large,
    borderTopRightRadius: SPACING.large,
    borderBottomLeftRadius: SPACING.large,
  },
  bot: {
    marginBottom: SPACING.regular,

    borderTopRightRadius: SPACING.large,
    borderBottomLeftRadius: SPACING.large,
    borderBottomRightRadius: SPACING.large,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    padding: SPACING.small,
    marginVertical: SPACING.regular,
    borderRadius: SPACING.large,
  },

  copyText: {
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

const darkChat = StyleSheet.create({
  container: {
    backgroundColor: COLORS_DARK.secondary,
  },
  body: {
    backgroundColor: COLORS_DARK.black,
  },
  user: {
    color: COLORS_DARK.black,
    backgroundColor: COLORS_DARK.primary,
  },
  bot: {
    color: COLORS_DARK.secondaryTwo,
    backgroundColor: COLORS_DARK.secondary,
  },
});

const lightChat = StyleSheet.create({
  container: {
    backgroundColor: COLORS_LIGHT.secondary,
  },
  body: {
    backgroundColor: COLORS_LIGHT.white,
  },
  user: {
    color: COLORS_LIGHT.black,
    backgroundColor: COLORS_LIGHT.primary,
  },
  bot: {
    color: COLORS_LIGHT.secondaryTwo,
    backgroundColor: COLORS_LIGHT.secondary,
  },
});
