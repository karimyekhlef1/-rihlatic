export const commonHeader = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const authHeader = (token) => ({
  Authorization: `Bearer ${token}`,
});
