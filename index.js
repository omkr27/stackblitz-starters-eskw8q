const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());
let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

//function
function addItem(cart, productId, name, price, quantity) {
  let newItem = {
    productId: productId,
    name: name,
    price: price,
    quantity: quantity,
  };
  cart.push(newItem);
  return cart;
}

//Endpoint 1
app.get('/cart/add/:productId/:name/:price/:quantity', (req, res) => {
  let productId = parseInt(req.params.productId);
  let name = req.params.name;
  let price = parseInt(req.params.price);
  let quantity = parseInt(req.params.quantity);
  let cartItems = addItem(cart, productId, name, price, quantity);
  res.json({ cartItems: cartItems });
});

//function
function editQuantityById(cart, productId, quantity) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity = quantity;
    }
  }
  return cart;
}

//Endpoint 2
app.get('/cart/edit/:productId/:quantity', (req, res) => {
  let productId = parseInt(req.params.productId);
  let quantity = parseInt(req.params.quantity);
  let cartItems = editQuantityById(cart, productId, quantity);
  res.json({ cartItems: cartItems });
});

//function
function deleteItemById(item, productId) {
  return item.productId !== productId;
}

//Endpoint 3
app.get('/cart/delete/:productId', (req, res) => {
  let productId = parseInt(req.params.productId);
  let cartItems = cart.filter((item) => deleteItemById(item, productId));
  res.json({ cartItems: cartItems });
});

//Endpoint 4
app.get('/cart', (req, res) => {
  cartItems = cart;
  res.json({ cartItems: cartItems });
});

//function
function calcQuantityOfItems(cart) {
  let totalQuantity = 0;
  for (let i = 0; i < cart.length; i++) {
    totalQuantity = totalQuantity + cart[i].quantity;
  }
  return totalQuantity;
}

//Endpoint 5
app.get('/cart/total-quantity', (req, res) => {
  let totalQuantity = calcQuantityOfItems(cart);
  res.json({ totalQuantity: totalQuantity });
});

//function
function calcPriceofItems(cart) {
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    totalPrice = totalPrice + cart[i].price * cart[i].quantity;
  }
  return totalPrice;
}

//Endpoint 6
app.get('/cart/total-price', (req, res) => {
  let totalPrice = calcPriceofItems(cart);
  res.json({ totalPrice: totalPrice });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
