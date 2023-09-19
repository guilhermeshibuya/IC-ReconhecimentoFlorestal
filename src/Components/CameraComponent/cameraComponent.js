import { Alert, Pressable, StatusBar } from "react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import { Camera, CameraType, FlashMode } from "expo-camera";
import Slider from "@react-native-community/slider";
import * as MediaLibrary from "expo-media-library";
import Ionicons from "@expo/vector-icons/Ionicons";
import styles from "./styles";

export default function CameraComponent() {
  const cameraRef = useRef(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [cameraPermission, requestCameraPermission] =
    Camera.useCameraPermissions();
  const [mediaPermission, requestMediaPermission] =
    MediaLibrary.usePermissions();
  const [flashMode, setflashMode] = useState(FlashMode.off);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [zoom, setZoom] = useState(0);

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

  const handleFlash = () => {
    flashMode === FlashMode.torch
      ? setflashMode(FlashMode.off)
      : setflashMode(FlashMode.torch);
  };

  const handleCameraFlip = () => {
    cameraType === CameraType.back
      ? setCameraType(CameraType.front)
      : setCameraType(CameraType.back);
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
        type={cameraType}
        onCameraReady={onCameraReady}
        useCamera2Api={true}
        flashMode={flashMode}
        zoom={zoom}
        ref={cameraRef}
      >
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          step={0.1}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#fff"
          onValueChange={(value) => {
            setZoom(value);
          }}
        />
        {/* <Pressable style={styles.zoomButton} onPress={handleZoom}>
          <Ionicons name="search" size={24} color="black" />
        </Pressable> */}
      </Camera>
      <View style={styles.buttonContainer}>
        <Pressable onPress={handleFlash}>
          <Ionicons name="flashlight-outline" size={48} color="white" />
        </Pressable>
        <TouchableOpacity
          style={styles.button}
          onPress={takePicture}
        ></TouchableOpacity>
        <Pressable onPress={handleCameraFlip}>
          <Ionicons name="camera-reverse-outline" size={48} color="white" />
        </Pressable>
      </View>
    </View>
  );
}
