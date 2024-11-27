export const mockDatabase = [
  {
    id: 1,
    name: 'John Doe',
    address: '123 Main St, Springfield',
    cctvAppearances: ['CCTV-1', 'CCTV-2'],
  },
  {
    id: 2,
    name: 'Jane Smith',
    address: '456 Elm St, Springfield',
    cctvAppearances: ['CCTV-3'],
  },
];

export const findPersonByFace = async (faceDescriptor: number[]): Promise<any> => {
  // Simulate a search in the database
  return mockDatabase.find((person) => Math.random() > 0.5); // Mock match
};
