export const commonHeader = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

export const authHeader = (token) => ({
  Authorization: `Bearer ${token}`,
});
