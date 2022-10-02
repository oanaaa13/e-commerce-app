exports.Category = {
  products: ({ id }, { filters }, { products }) => {
    if (filters && filters.onSale != null)
      return products.filter(
        (product) =>
          product.categoryId === id && product.onSale === filters.onSale
      );
    return products.filter((product) => product.categoryId === id);
  },
};
