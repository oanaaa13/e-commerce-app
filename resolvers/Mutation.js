const { v4: uuid } = require("uuid");

exports.Mutation = {
  addCategory: (parent, { input }, { db }) => {
    const { name } = input;
    const newCategory = {
      id: uuid(),
      name,
    };

    db.categories.push(newCategory);
    return newCategory;
  },
  addProduct: (parent, { input }, { db }) => {
    const { name, description, price, quantity, categoryId, onSale, image } =
      input;

    const newProduct = {
      id: uuid(),
      name,
      description,
      price,
      quantity,
      categoryId,
      onSale,
      image,
    };

    db.products.push(newProduct);
    return newProduct;
  },
  addReview: (parent, { input }, { db }) => {
    const { date, title, rating, comment, productId } = input;
    const newReview = {
      id: uuid(),
      date,
      title,
      rating,
      comment,
      productId,
    };
    db.reviews.push(newReview);
    return newReview;
  },
  deleteCategory: (parent, { categoryId }, { db }) => {
    const index = db.categories.findIndex(
      (category) => category.id === categoryId
    );
    if (index === -1) return false;
    db.products.map((product) => {
      if (product.categoryId === categoryId)
        return {
          ...product,
          categoryId: null,
        };
      return product;
    });
    db.categories.splice(index, 1);
    return true;
  },
  deleteProduct: (parent, { id }, { db }) => {
    db.products = db.products.filter((product) => product.id !== id);
    db.reviews = db.reviews.filter((review) => review.productId !== id);
    return true;
  },
  deleteReview: (parent, { id }, { db }) => {
    db.reviews = db.reviews.filter((review) => review.id !== id);
    return true;
  },
};
