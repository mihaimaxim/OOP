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

const productList = {
   products: [
      new Product(
         "a pillow",
         "https://www.shopmarriott.com/images/products/v2/xlrg/Marriott-The-Marriott-Pillow-MAR-108-L_xlrg.jpg",
         99,
         "a soft pillow"
      ),
      new Product(
         "a melon",
         "https://iberianorigin.com/54-large_default/black.jpg",
         9,
         "a dark melon"
      ),
   ],
   render() {
      const renderHook = document.getElementById("app");
      const prodList = document.createElement("ul");
      prodList.className = "product-list";
      for (const prod of this.products) {
         const prodItem = document.createElement("li");
         prodItem.className = "product-item";
         prodItem.innerHTML = `
            <div>
               <img src="${prod.imageURL}" alt="${prod.title}" />
               <div class="product-item__content">
                  <h2>${prod.title}</h2>
                  <h3>\$${prod.price}</h3>
                  <p>${prod.description}</p>
                     <button>add to cart</button>
               </div>
            </div>
         `;
         prodList.append(prodItem);
      }
      renderHook.append(prodList);
   },
};

productList.render();
