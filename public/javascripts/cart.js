console.log("cart connected!!");
if (!sessionStorage.getItem("cart-ar3dex")) {
  sessionStorage.setItem("cart-ar3dex", JSON.stringify([]));
}

var cart = JSON.parse(sessionStorage.getItem("cart-ar3dex"));
const cartTotalItems = document.getElementById("cart-total-items");

window.onload = () => {
  showCartTotalItems(cart.length);
  if (document.getElementById("cart-box")) {
    showProductInCart(cart);
  }
};

const calcCost = (products) => {
    const cartSubtotal =   document.getElementById("cart-subtotal")
    const cartCostSend =   document.getElementById("cart-cost-send")
    const cartTotal =   document.getElementById("cart-total")
cartSubtotal.innerHTML =products
      .map((item) => item.quantity * item.price)
      .reduce((a, b) => a + b, 0);

      cartTotal.innerHTML =products
      .map((item) => item.quantity * item.price)
      .reduce((a, b) => a + b, 0) + +cartCostSend.textContent;

};



const showProductInCart = (products = []) => {
  const cartBox = document.getElementById("cart-box");
  cartBox.innerHTML = null;

  if (products.length) {
    products.forEach(({ id, name, image, price, quantity }) => {
      cartBox.innerHTML += `
        <article class="productCart_section_article">
            <div class="productCart_main_section_article_div">
                <span class="productCart_main_section_article_div_images">
                <img src="/images/products/${image}" alt="producto" class="producto1 article_img" />
                <button class="btn btn-sm btn-dark" onclick="decrementQuantity(${id})"><i class="fa-solid fa-minus"></i></button>
                <p class="contador" id="contador${id}">${quantity}</p>
                <button class="btn btn-sm btn-dark" onclick="incrementQuantity(${id})"><i class="fa-solid fa-plus"></i></button>
                </span>
                <p class="fs-4">${name}: $<span>${price}</span></p>
                <a class="basura" onclick="event.preventDefault();removeProduct(${id})"
                ><i class="fa-solid fa-trash-can"></i
                ></a>
            </div>
        </article>
            `;
    });
    document.getElementById("form-cart").style.display = "block";

    calcCost(products);
  } else {
    cartBox.innerHTML += `
    <article class="productCart_section_article">
    <div class="productCart_main_section_article_div">

            <p class="fs-3">El carrito está vacío</p>
            </div>
            </article>
        `;
    document.getElementById("form-cart").style.display = "none";
  }
};

const showCartTotalItems = (count) => {
  if (!count) {
    cartTotalItems.style.display = "none";
  } else {
    cartTotalItems.style.display = "block";
    cartTotalItems.innerHTML = count;
  }
};

const addToCart = (id, name, price, image, quantity = 1) => {
  const product = cart.find((item) => item.id == id);

  if (product) {
    const cartUpdated = cart.map((item) => {
      if (item.id == id) {
        item.quantity = item.quantity + 1;
      }
      return item;
    });
    sessionStorage.setItem("cart-ar3dex", JSON.stringify(cartUpdated));
  } else {
    const newProduct = {
      id,
      name,
      price,
      image,
      quantity,
    };
    cart.push(newProduct);
    sessionStorage.setItem("cart-ar3dex", JSON.stringify(cart));

    showCartTotalItems(
      JSON.parse(sessionStorage.getItem("cart-ar3dex")).length
    );
  }
};

const removeProduct = (id) => {
  const cart = JSON.parse(sessionStorage.getItem("cart-ar3dex"));
  const cartUpdated = cart.filter((item) => item.id != id);
  sessionStorage.setItem("cart-ar3dex", JSON.stringify(cartUpdated));

  showCartTotalItems(JSON.parse(sessionStorage.getItem("cart-ar3dex")).length);
  showProductInCart(cartUpdated);
};

const incrementQuantity = (id) => {
  const counter = document.getElementById("contador" + id);
  let currentValue = parseInt(counter.textContent);
  counter.textContent = currentValue + 1;
  modifyQuantity(id, currentValue + 1);
};

const decrementQuantity = (id) => {
  const counter = document.getElementById("contador" + id);
  let currentValue = parseInt(counter.textContent);
  if (currentValue > 1) {
    counter.textContent = currentValue - 1;
    modifyQuantity(id, currentValue - 1);
  }
};

const modifyQuantity = (id, quantity) => {
  const cart = JSON.parse(sessionStorage.getItem("cart-ar3dex"));
  const cartUpdated = cart.map((item) => {
    if (item.id == id) {
      item.quantity = quantity;
    }
    return item;
  });
  sessionStorage.setItem("cart-ar3dex", JSON.stringify(cartUpdated));
  calcCost(cartUpdated);
};


const sendCart = () => {

    /* 

    sessionStorage
        {
            user : idUser
            products [
                {
                    idProduct,
                    name,
                    price,
                    image,
                    quantity,

                }
            ]
        }
    */

        //enviar a la api por fetch

        /* 
        
         {
            user : idUser
            products [
                {
                    idProduct,
                    price,
                    quantity,

                }
            ],
            total : sessionStorage.products.map((item) => item.quantity * item.price)
      .reduce((a, b) => a + b, 0),
            method : idMethod
        }
        */

        /* 
        la api:
        
        debe generar el ticket
            user : idUser
            total : sessionStorage.products.map((item) => item.quantity * item.price).reduce((a, b) => a + b, 0)
            method : idMethod

        debe guardar los items
            idTicket,
            products [
                {
                    idProduct,
                    price,
                    quantity,
                }
            ],

        
        */
            sessionStorage.setItem("cart-ar3dex", JSON.stringify([]));


            Swal.fire({
                title: "Gracias por tu compra",
                text: "En breve recibirás la información de tu pedido",
                icon: "info",
                confirmButtonAriaLabel: "Volver al Home",

              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  location.href = '/'
                } 
              });
}