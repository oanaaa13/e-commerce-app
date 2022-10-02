exports.Category = {
  products: ({ id }, { filters }, { db }) => {
    if (filters && filters.onSale != null)
      return db.products.filter(
        (product) =>
          product.categoryId === id && product.onSale === filters.onSale
      );
    return db.products.filter((product) => product.categoryId === id);
  },
};
