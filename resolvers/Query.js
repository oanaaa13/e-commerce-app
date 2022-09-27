exports.Query = {
  hello: () => {
    return "Hello";
  },
  products: (parent, args, { products }) => products,
  product: (parent, { id }, { products }) => {
    return products.find((x) => x.id === id);
  },
  categories: (parent, args, { categories }) => categories,
  category: (parent, { id }, { categories }) => {
    return categories.find((category) => category.id === id);
  },
  reviews: (parent, args, {reviews})=> reviews
};
