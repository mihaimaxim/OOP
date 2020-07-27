class Product {
   constructor(title, image, price, desc) {
      this.title = title;
      this.imageURL = image;
      this.price = price;
      this.description = desc;
   }
}

class ElementAttribute {
   constructor(attributeName, attributeValue) {
      this.name = attributeName;
      this.value = attributeValue;
   }
}

class Component {
   constructor(renderHookID) {
      this.hookID = renderHookID;
   }

   createRootElement(tag, cssClass, attributes) {
      const rootElement = document.createElement(tag);
      if (cssClass) {
         rootElement.cssClass = cssClass;
      }
      if (attributes && attributes.length > 0) {
         for (const attribute of attributes) {
            rootElement.setAttribute(attribute.name, attribute.value);
         }
      }
      document.getElementById(this.hookID).append(rootElement);
      return rootElement;
   }
}

class ShoppingCart {
   items = [];

   // get totalAmount() {
   //    const sum = this.items.reduce((previousValue, currentItem) => {
   //       return previousValue + currentItem.price;
   //    }, 0);
   //    return sum;
   // }

   // addProductToCart = (product) => {
   //    this.items.push(product);
   //    this.totalOutput.innerHTML = `<h2>Total \$${this.totalAmount}</h2>`;
   // };

   // one way

   set cartItems(value) {
      this.items = value;
      this.totalOutput.innerHTML = `<h2>Total \$${this.totalAmount.toFixed(
         2
      )}</h2>`;
   }

   get totalAmount() {
      const sum = this.items.reduce((previousValue, currentItem) => {
         return previousValue + currentItem.price;
      }, 0);
      return sum;
   }

   addProductToCart(product) {
      const updatedItems = [...this.items];
      updatedItems.push(product);
      this.cartItems = updatedItems;
   }

   // second way

   render() {
      const cartEl = document.createElement('section');
      cartEl.className = 'cart';

      cartEl.innerHTML = `
         <h2>Total \$${0}</h2>
         <button>Order now!</button>
      `;
      this.totalOutput = cartEl.querySelector('h2');
      return cartEl;
   }
}

class ProductItem {
   constructor(product) {
      this.product = product;
   }

   addToCart = () => {
      App.addProductToCart(this.product);
   };

   render() {
      const prodEl = document.createElement('li');
      prodEl.className = 'product-item';
      prodEl.innerHTML = `
        <div>
          <img src="${this.product.imageURL}" alt="${this.product.title}">
          <div class="product-item__content">
            <h2>${this.product.title}</h2>
            <h3>\$${this.product.price}</h3>
            <p>${this.product.description}</p>
            <button>Add to Cart</button>
          </div>
        </div>
      `;
      const addToCartButton = prodEl.querySelector('button');
      addToCartButton.addEventListener('click', this.addToCart);
      return prodEl;
   }
}

class ProductList {
   products = [
      new Product(
         'a pillow',
         'https://www.shopmarriott.com/images/products/v2/xlrg/Marriott-The-Marriott-Pillow-MAR-108-L_xlrg.jpg',
         99,
         'a soft pillow'
      ),
      new Product(
         'a melon',
         'https://upload.wikimedia.org/wikipedia/commons/2/28/Cantaloupes.jpg',
         9,
         'a golden melon'
      ),
   ];

   constructor() {}

   render() {
      const prodList = document.createElement('ul');
      prodList.className = 'product-list';

      for (const prod of this.products) {
         const productItem = new ProductItem(prod);
         const prodEl = productItem.render();
         prodList.append(prodEl);
      }
      return prodList;
   }
}

class Shop {
   render() {
      const renderHook = document.getElementById('app');

      this.cart = new ShoppingCart();
      const cartEl = this.cart.render();
      const productList = new ProductList();
      const prodListEl = productList.render();

      renderHook.append(cartEl, prodListEl);
   }
}

class App {
   static cart;

   static init() {
      const shop = new Shop();
      shop.render();
      this.cart = shop.cart;
   }

   static addProductToCart(product) {
      this.cart.addProductToCart(product);
   }
}

App.init();
