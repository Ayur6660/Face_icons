import axios from 'axios';

export const getCCTVFeeds = async (area: string, cameraType: string): Promise<string[]> => {
  // Mock CCTV feed URLs based on area and camera type
  return [
    `http://cctv-feed/${area}/${cameraType}/camera1`,
    `http://cctv-feed/${area}/${cameraType}/camera2`,
  ];
};
