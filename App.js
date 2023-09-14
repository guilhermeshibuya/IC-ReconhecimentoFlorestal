import { Dimensions, StatusBar } from "react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { Camera, CameraType } from "expo-camera";

const WINDOW_WIDTH = Dimensions.get("window").width;

export default function App() {
  const [type, setType] = useState();
  const [permission, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      requestPermission(status === "granted");
    };
  }, []);

  const takePicture = () => {
    
  };

  // const toggleCameraType = () => {
  //   setType((current) =>
  //     current === CameraType.back ? CameraType.front : CameraType.back
  //   );
  // };

  if (!permission) {
    return <Text>Permissão para a câmera negada</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <Camera
        style={styles.camera}
        type={CameraType.back}
        useCamera2Api={true}
      ></Camera>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}></TouchableOpacity>
      </View>
    </View>
  );
}

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
    justifyContent: "flex-end",
    backgroundColor: "transparent",
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
