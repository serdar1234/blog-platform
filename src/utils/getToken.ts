type T =
  | {
      headers: {
        Authorization: string;
      };
    }
  | undefined;

const getToken = (): T => {
  const token = localStorage.getItem("token");
  if (token)
    return {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
  return;
};

export default getToken;
