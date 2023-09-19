import { StyleSheet, Dimensions } from "react-native";

const WINDOW_WIDTH = Dimensions.get("window").width;

const styles = StyleSheet.create({
  camera: {
    width: WINDOW_WIDTH,
    height: WINDOW_WIDTH * (4 / 3),
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 24,
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#000",
    paddingHorizontal: 32,
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
  zoomButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    borderRadius: 100,
    backgroundColor: "#fff",
  },
  slider: {
    width: WINDOW_WIDTH * 0.8,
    height: 40,
  },
});

export default styles;
