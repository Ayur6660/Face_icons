export const fetchImageFromUri = async (uri: string): Promise<HTMLImageElement> => {
  const response = await fetch(uri);
  const blob = await response.blob();
  const image = new Image();
  image.src = URL.createObjectURL(blob);
  return new Promise((resolve) => {
    image.onload = () => resolve(image);
  });
};
