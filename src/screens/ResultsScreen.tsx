import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App'; // Ensure this path is correct
import { detectFaces, loadModels } from '../utils/faceDetection';
import { findPersonByFace } from '../api/database';
import { getCCTVFeeds } from '../api/cctv';

type ResultsScreenRouteProp = RouteProp<RootStackParamList, 'Results'>;

type ResultsScreenProps = {
  route: ResultsScreenRouteProp;
};

const ResultsScreen: React.FC<ResultsScreenProps> = ({ route }) => {
  const { photo, area, cameraType } = route.params;
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    const analyzeImage = async () => {
      // Load image as a blob
      await loadModels();  // Load face-api.js models

      const response = await fetch(photo);
      const blob = await response.blob();
      const img = URL.createObjectURL(blob); // Correctly create object URL from blob

      const detections = await detectFaces(img);
      if (detections.length) {
        const person = await findPersonByFace(Array.from(detections[0].descriptor));
        const cctvFeeds = await getCCTVFeeds(area, cameraType);
        setResults({ person, cctvFeeds });
      }
    };
    analyzeImage();
  }, [photo, area, cameraType]);

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.image} />
      {results && (
        <>
          <Text style={styles.title}>Analysis Results</Text>
          <Text style={styles.text}>Name: {results.person.name}</Text>
          <Text style={styles.text}>Address: {results.person.address}</Text>
          <Text style={styles.subTitle}>CCTV Feeds:</Text>
          {results.cctvFeeds.map((feed: string, index: number) => (
            <Text key={index} style={styles.text}>{feed}</Text>
          ))}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center' },
  image: { width: '100%', height: 200, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  text: { fontSize: 16, marginBottom: 10 },
});

export default ResultsScreen;
