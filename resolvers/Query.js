exports.Query = {
  hello: () => {
    return "Hello";
  },
  products: (parent, { filters }, { db }) => {
    let filteredProducts = db.products;
    if (filters) {
      if (filters.onSale != null) {
        filteredProducts = filteredProducts.filter(
          (product) => product.onSale === filters.onSale
        );
      }
      if (
        filters.minimumRating != null &&
        filters.minimumRating >= 1 &&
        filters.minimumRating <= 5
      ) {
        filteredProducts = filteredProducts.filter((product) => {
          let sum = 0;
          let count = 0;
          db.reviews.forEach((review) => {
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
  product: (parent, { id }, { db }) => {
    return db.products.find((product) => product.id === id);
  },
  categories: (parent, args, { db }) => db.categories,
  category: (parent, { id }, { db }) => {
    return db.categories.find((category) => category.id === id);
  },
  reviews: (parent, args, { db }) => db.reviews,
};
