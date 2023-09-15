import { Alert, StatusBar } from "react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import styles from "./styles";

export default function CameraComponent() {
  const cameraRef = useRef(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [cameraPermission, requestCameraPermission] =
    Camera.useCameraPermissions();
  const [mediaPermission, requestMediaPermission] =
    MediaLibrary.usePermissions();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      requestCameraPermission(status === "granted");
    })();

    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      requestMediaPermission(status === "granted");
    })();
  }, []);

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const takePicture = async () => {
    if (cameraRef.current && isCameraReady) {
      const { uri } = await cameraRef.current.takePictureAsync();
      const asset = await MediaLibrary.createAssetAsync(uri);
    } else {
      Alert.alert(
        "Erro!",
        "Não foi possível tirar a foto, câmera não iniciada",
        [{ text: "Ok" }]
      );
    }
  };

  if (!cameraPermission) {
    return <Text>Permissão para a câmera negada</Text>;
  }

  if (cameraPermission === null) {
    return <View></View>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <Camera
        style={styles.camera}
        type={CameraType.back}
        useCamera2Api={true}
        onCameraReady={onCameraReady}
        ref={cameraRef}
      ></Camera>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={takePicture}
        ></TouchableOpacity>
      </View>
    </View>
  );
}
