export const getUserStateFromLocalstorage = () => {
  const storedDataString = localStorage.getItem('user-storage');
  const parsedData = storedDataString && JSON.parse(storedDataString);
  return parsedData.state;
};
