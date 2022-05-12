export const isId = id => {
  const idRegex = /^[a-z]+[a-z0-9]{5,19}$/g;
  return idRegex.test(id);
};

export const isPassword = pw => {
  const passwordRegex = /^[a-z]+[a-z0-9]{8,16}$/g;
  return passwordRegex.test(pw);
};
