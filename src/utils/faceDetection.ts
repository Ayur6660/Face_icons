import * as faceapi from 'face-api.js';

export const loadModels = async () => {
  const modelUri = '/assets/models';
  await faceapi.nets.ssdMobilenetv1.loadFromUri(modelUri);
  await faceapi.nets.faceLandmark68Net.loadFromUri(modelUri);
  await faceapi.nets.faceRecognitionNet.loadFromUri(modelUri);
};

export const detectFaces = async (image: string) => {
    const img = await faceapi.fetchImage(image);
    const detections = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors();
    return detections;
};
