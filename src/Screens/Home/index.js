import { Pressable, View, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import styles from "./styles";
import { useEffect } from "react";
import Button from "../../Components/Button";

export default function HomeScreen({ navigation }) {
  const [cameraPermissions, requestCameraPermissions] =
    ImagePicker.useCameraPermissions();

  const [mediaPermissions, requestMediaPermissions] =
    ImagePicker.useMediaLibraryPermissions();

  useEffect(() => {
    if (!cameraPermissions?.granted) requestCameraPermissions();
    if (!mediaPermissions?.granted) requestMediaPermissions();
  }, []);

  const launchCameraAsync = async () => {
    if (!cameraPermissions?.granted)
      alert("Não foi possível abrir a câmera. Permissão negada!");

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      await MediaLibrary.createAssetAsync(result.assets[0].uri);
    } else {
      alert("Nenhuma imagem selecionada");
    }
  };

  const launchMediaAsync = async () => {
    if (!mediaPermissions?.granted)
      alert("Não foi possível abrir a galeria. Permissão negada!");

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: false,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      await MediaLibrary.createAssetAsync(result.assets[0].uri);
    } else {
      alert("Nenhuma imagem selecionada");
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="tirar foto"
        iconName="camera-outline"
        onPress={() => launchCameraAsync()}
      />
      <Button
        title="tirar foto"
        iconName="image-outline"
        onPress={() => launchMediaAsync()}
      />
    </View>
  );
}
