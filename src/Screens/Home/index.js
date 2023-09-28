import { Pressable, View, Text, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import styles from "./styles";
import { useEffect, useState } from "react";
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

  const createAlbumAddAsset = async (uri) => {
    const cachedAsset = await MediaLibrary.createAssetAsync(uri);
    const albumName = "Reconhecimento Florestal";
    const album = await MediaLibrary.getAlbumAsync(albumName);

    if (album === null) {
      await MediaLibrary.createAlbumAsync(albumName, cachedAsset, false)
        .then(() => alert("Imagem salva no dispositivo"))
        .catch((err) => {
          alert("Erro ao salvar a imagem no dispostivo");
          console.log(err);
        });
    } else {
      await MediaLibrary.addAssetsToAlbumAsync([cachedAsset], album, false)
        .then(() => alert("Imagem salva no dispositivo"))
        .catch((err) => {
          alert("Erro ao salvar a imagem no dispostivo");
          console.log(err);
        });
    }
  };

  const launchCameraAsync = async () => {
    if (!cameraPermissions?.granted)
      Alert.alert(
        "Permissão negada",
        "É necessário fornecer as permissões para acessar a câmera.",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Ok",
            onPress: () => requestCameraPermissions(),
          },
        ]
      );

    if (cameraPermissions?.granted) {
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        createAlbumAddAsset(result.assets[0].uri);
      } else {
        alert("Nenhuma imagem selecionada");
      }
    }
  };

  const launchMediaAsync = async () => {
    if (!mediaPermissions?.granted)
      Alert.alert(
        "Permissão negada",
        "É necessário fornecer as permissões para acessar a galeria.",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Ok",
            onPress: () => requestMediaPermissions(),
          },
        ]
      );
    if (mediaPermissions?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: false,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        createAlbumAddAsset(result.assets[0].uri);
      } else {
        alert("Nenhuma imagem selecionada");
      }
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
        title="escolher foto"
        iconName="image-outline"
        onPress={() => launchMediaAsync()}
      />
    </View>
  );
}
