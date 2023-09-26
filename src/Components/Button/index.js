import { Pressable, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import styles from "./styles";

export default function Button({ title, iconName, onPress }) {
  if (!iconName) {
    return (
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </Pressable>
    );
  }
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Ionicons color={"#1a3400"} name={iconName} size={24} />
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}
