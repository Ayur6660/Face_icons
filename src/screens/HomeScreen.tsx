import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, Text, TextInput } from 'react-native';
import { launchImageLibrary, ImageLibraryOptions } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App'; // Import the RootStackParamList type

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Results'>;

const HomeScreen: React.FC = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [area, setArea] = useState<string>('');
  const [cameraType, setCameraType] = useState<string>('road');
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const selectImage = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
    };
    launchImageLibrary(options, (response) => {
      if (response.assets && response.assets[0]?.uri) {
        setPhoto(response.assets[0].uri);
      }
    });
  };

  const handleAnalyze = () => {
    if (photo) {
      navigation.navigate('Results', { photo, area, cameraType });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Face Icon</Text>
      <Button title="Select Image" onPress={selectImage} />
      {photo && <Image source={{ uri: photo }} style={styles.image} />}
      {photo && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter Area"
            value={area}
            onChangeText={setArea}
          />
          <Picker
            selectedValue={cameraType}
            style={styles.picker}
            onValueChange={(itemValue) => setCameraType(itemValue)}
          >
            <Picker.Item label="Road Camera" value="road" />
            <Picker.Item label="Toll Camera" value="toll" />
            <Picker.Item label="Shop Camera" value="shop" />
          </Picker>
          <Button title="Analyze Image" onPress={handleAnalyze} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  image: { width: 200, height: 200, marginTop: 20 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginVertical: 10, width: '80%', paddingLeft: 8 },
  picker: { height: 50, width: '80%', marginVertical: 10 },
});

export default HomeScreen;
