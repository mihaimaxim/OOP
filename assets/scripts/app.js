class Product {
   // the fields :
   //
   // title = 'DEFAULT';
   // imageURL;
   // price;
   // description;

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
   constructor(renderHookID, shouldRender = true) {
      this.hookID = renderHookID;
      if (shouldRender) {
         this.render();
      }
   }

   render() {}

   createRootElement(tag, cssClass, attributes) {
      const rootElement = document.createElement(tag);
      if (cssClass) {
         rootElement.className = cssClass;
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

class ShoppingCart extends Component {
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
      const sum = this.items.reduce(
         (previousValue, currentItem) => previousValue + currentItem.price,
         0
      );
      return sum;
   }

   constructor(renderHookID) {
      super(renderHookID, false);
      this.orderProducts = () => {
         console.log('Ordering ...');
         console.log(this.items);
      };
      this.render();
   }

   addProductToCart(product) {
      const updatedItems = [...this.items];
      updatedItems.push(product);
      this.cartItems = updatedItems;
   }

   // second way

   render() {
      // const cartEl = document.createElement('section');   // swaped with Component class method
      // cartEl.className = 'cart';   // swaped with Component class method
      const cartEl = this.createRootElement(
         'section',
         'cart' /* cartEL.className */
      );

      cartEl.innerHTML = `
         <h2>Total \$${0}</h2>
         <button>Order now!</button>
      `;
      const orderButton = cartEl.querySelector('button');
      orderButton.addEventListener('click', this.orderProducts);
      this.totalOutput = cartEl.querySelector('h2');
   }
}

class ProductItem extends Component {
   constructor(renderHookID, product) {
      super(renderHookID, false);
      this.product = product;
      this.render();
   }

   addToCart() {
      App.addProductToCart(this.product);
   }

   render() {
      // const prodEl = document.createElement('li');
      // prodEl.className = 'product-item';
      const prodEl = this.createRootElement('li', 'product-item');
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
      addToCartButton.addEventListener('click', this.addToCart.bind(this));
   }
}

class ProductList extends Component {
   products = [];

   constructor(renderHookID) {
      super(renderHookID);
      this.fetchProducts();
   }

   fetchProducts() {
      this.products = [
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
      this.renderProducts();
   }

   renderProducts() {
      for (const prod of this.products) {
         new ProductItem('prod-list', prod);
      }
   }

   render() {
      // const prodList = document.createElement('ul');
      // prodList.className = 'product-list';
      this.createRootElement('ul', 'product-list', [
         new ElementAttribute('id', 'prod-list'),
      ]);
      if (this.products && this.products.length > 0) {
         this.renderProducts();
      }
   }
}

class Shop {
   constructor() {
      this.render();
   }

   render() {
      this.cart = new ShoppingCart('app');
      new ProductList('app');
   }
}

class App {
   static cart;

   static init() {
      const shop = new Shop();
      this.cart = shop.cart;
   }

   static addProductToCart(product) {
      this.cart.addProductToCart(product);
   }
}

App.init();
