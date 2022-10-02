exports.Query = {
  hello: () => {
    return "Hello";
  },
  products: (parent, { filters }, { products, reviews }) => {
    let filteredProducts = products;
    const { onSale, minimumRating } = filters;
    if (filters) {
      if (onSale != null) {
        filteredProducts = filteredProducts.filter(
          (product) => product.onSale === filters.onSale
        );
      }
      if (minimumRating != null && minimumRating >= 1 && minimumRating <= 5) {
        filteredProducts = filteredProducts.filter((product) => {
          let sum = 0;
          let count = 0;
          reviews.forEach((review) => {
            if (review.productId === product.id) {
              count += 1;
              sum += review.rating;
            }
          });
          if (count > 0) {
            rating = sum / count;
            return rating >= filters.minimumRating;
          }
          return false;
        });
      }
    }
    return filteredProducts;
  },
  product: (parent, { id }, { products }) => {
    return products.find((product) => product.id === id);
  },
  categories: (parent, args, { categories }) => categories,
  category: (parent, { id }, { categories }) => {
    return categories.find((category) => category.id === id);
  },
  reviews: (parent, args, { reviews }) => reviews,
};
