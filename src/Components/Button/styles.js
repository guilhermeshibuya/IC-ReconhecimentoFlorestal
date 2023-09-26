import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 12,
    borderRadius: 24,
    backgroundColor: "#b5eb60",
    gap: 12,
  },
  buttonText: {
    textAlign: "center",
    color: "#1a3400",
    textTransform: "uppercase",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default styles;
