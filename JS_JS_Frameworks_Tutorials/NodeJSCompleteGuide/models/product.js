const fs = require('fs');
const path = require('path');
const rootPath = require('../helpers/path');

const filePath = path.join(rootPath, 'data', 'products.json');

function getProductsFromFile(callback) {
  fs.readFile(filePath, (err, fileContent) => {
    if (err) {
      callback([]);
      return;
    }

    callback(JSON.parse(fileContent));
    return;
  });
}

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = Math.random().toString();
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(filePath, JSON.stringify(products), (err) => {
        if (err) {
          console.error(err);
        }
      });
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }

  static getById(productId, callback) {
    getProductsFromFile((products) => {
      const product = products.find((item) => item.id === productId);
      callback(product);
    });
  }
};
