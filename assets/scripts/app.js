class Product {
   // title = "DEFAULT";
   // imageURL;
   // price;
   // description;

   constructor(title, imageURL, price, description) {
      this.title = title;
      this.imageURL = imageURL;
      this.price = price;
      this.description = description;
   }
}

class ProductItem {
   constructor(product) {
      this.product = product;
   }

   render() {
      const prodEl = document.createElement('li');
      prodEl.className = 'product-item';
      prodEl.innerHTML = `
        <div>
          <img src="${this.product.imageUrl}" alt="${this.product.title}" >
          <div class="product-item__content">
            <h2>${this.product.title}</h2>
            <h3>\$${this.product.price}</h3>
            <p>${this.product.description}</p>
            <button>Add to Cart</button>
          </div>
        </div>
      `;
      return prodEl;
   }
}

class ProductList {
   products = [
      new Product(
         'a pillow',
         'https://www.piatafinanciara.ro/wp-content/uploads/2020/04/apple.jpeg',
         99,
         'a soft pillow'
      ),
      new Product(
         'a melon',
         'https://iberianorigin.com/54-large_default/black.jpg',
         9,
         'a dark melon'
      ),
   ];

   constructor() {}

   render() {
      const renderHook = document.getElementById('app');
      const prodList = document.createElement('ul');

      prodList.className = 'product-list';

      for (const prod of this.products) {
         const productItem = new ProductItem(prod);
         const prodEl = productItem.render();
         prodList.append(prodEl);
      }
      renderHook.append(prodList);
   }
}

const productList = new ProductList();
productList.render();
