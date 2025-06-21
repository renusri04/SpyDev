export const getProducts = (uid) => {
  return JSON.parse(localStorage.getItem(`user_products_${uid}`)) || [];
};

export const saveManualProduct = (uid, product) => {
  const current = getProducts(uid);
  localStorage.setItem(`user_products_${uid}`, JSON.stringify([...current, product]));
};

export const saveCSVProducts = (uid, products) => {
  const current = getProducts(uid);
  localStorage.setItem(`user_products_${uid}`, JSON.stringify([...current, ...products]));
};
