class Product {
   // title = "DEFAULT";
   // imageURL;
   // price;
   // description;

   constructor(title, image, price, description) {
      this.title = title;
      this.imageURL = image;
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
            <img src="${this.product.imageURL}" alt="${this.product.title}" />
            <div class="product-item__content">
      	      <h2>${this.product.title}</h2>
      	      <h3>\$${this.product.price}</h3>
               <p>${this.product.description}</p>
               <button>add to cart</button>
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
         'https://www.shopmarriott.com/images/products/v2/xlrg/Marriott-The-Marriott-Pillow-MAR-108-L_xlrg.jpg',
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
         const ProductItem = new Product();
         const prodEl = ProductItem.render();
         prodList.append(prodEl);
      }
      renderHook.append(prodList);
   }
}

const productList = new ProductList();
productList.render();
