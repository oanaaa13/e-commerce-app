const { v4: uuid } = require("uuid");

exports.Mutation = {
  addCategory: (parent, { input }, { categories }) => {
    const { name } = input;
    const newCategory = {
      id: uuid(),
      name,
    };
    categories.push(newCategory);
    return newCategory;
  },
  addProduct: (parent, { input }, { products }) => {
    const newProduct = {
      id: uuid(),
      name: input.name,
      description: input.description,
      quantity: input.quantity,
      price: input.price,
      image: input.image,
      onSale: input.onSale,
      categoryId: input.categoryId,
    };
    products.push(newProduct);
    return newProduct;
  },
  addReview: (parent, { input }, { reviews }) => {
    const { date, title, comment, rating, productId } = input;
    const newReview = {
      id: uuid(),
      date,
      title,
      comment,
      rating,
      productId,
    };
    reviews.push(newReview);
    return newReview;
  },
  deleteCategory: (parent, { categoryId }, { categories, products }) => {
    const index = categories.findIndex(
      (category) => category.id === categoryId
    );
    if (index === -1) return false;
    products.map((product) => {
      if (product.categoryId === categoryId)
        return {
          ...product,
          categoryId: null,
        };
      return product;
    });
    categories.splice(index, 1);
    return true;
  },
};
