import { StyleSheet, Dimensions } from "react-native";

const WINDOW_WIDTH = Dimensions.get("window").width;

const styles = StyleSheet.create({
  camera: {
    width: WINDOW_WIDTH,
    height: WINDOW_WIDTH * (4 / 3),
  },
  header: {
    flex: 1,
    backgroundColor: "#000",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  button: {
    backgroundColor: "#fff",
    width: 80,
    height: 80,
    borderRadius: 100,
    borderColor: "#dedede",
    borderWidth: 8,
    marginBottom: 24,
  },
});

export default styles;
