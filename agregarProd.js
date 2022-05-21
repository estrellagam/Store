function createConfirmationMessage(product_name) {
    let div = document.createElement("div");
    div.className = "col-12";
    div.id = "item-added-message";
    // div.textContent = `AGREGASTE : ${product_name}`

    return div;
}

function getImg(evt) {
    return evt.target.parentElement.querySelector('img[class="imagen"]').src;
}

function getCod(evt) {
    return evt.target.parentNode.querySelector('p[id="codigo"]').textContent;
}

function getProductName(evt) {
    return evt.target.parentNode.querySelector('p[class="card-text"]')
        .textContent;
}

function getPrecio(evt) {
    return evt.target.parentNode.querySelector('p[id="precio"]').textContent;
}

function getMarca(evt) {
    return evt.target.parentNode.querySelector('p[id="marca"]').textContent;
}

addEventToButtons();

function addEventToButtons() {
    const btnAgregar = document.querySelectorAll(".btnAgregar");

    //document.getElementsByClassName("btnAgregar").forEach(item => {
    btnAgregar.forEach((item) => {
        item.addEventListener("click", (evt) => {
            console.log(evt);
            var id = getCod(evt);
            var product_name = getProductName(evt);
            var product_precio = getPrecio(evt);
            var product_marca = getMarca(evt);
            var product_img = getImg(evt);
            console.log("nombre del prod " + product_name);
            console.log(product_precio);
            console.log(product_marca);
            console.log(product_img);

            const productoCarrito = new Producto(
                id,
                product_name,
                product_precio,
                product_marca,
                product_img
            );

            let existe = carrito.some((element) => element.id === productoCarrito.id);

            if (existe) {
                carrito.map((element) => {
                    if (element.id === productoCarrito.id) {
                        element.cantidad++;
                        return element;
                    } else {
                        return element;
                    }
                });
            } else {
                productoCarrito.cantidad = 1;
                carrito.push(productoCarrito);
                localStorage.setItem("productoscarrito", JSON.stringify(carrito));
            }

            console.log(carrito.length);

            var message = document.getElementById("item-added-message");

            cantTotal = 0; // creo si no existe

            carrito.forEach((productoCarrito) => {
                cantTotal = productoCarrito.cantidad + cantTotal;
            });

            numCarrito.textContent = cantTotal;


            //   localStorage.setItem("cant", cantTotal);

            if (message != null) {
                row.removeChild(message);
            }
            let div = createConfirmationMessage(product_name);
            row.appendChild(div);
            var option = {
                animation: true,
                delay: 2000,
            };

            div.innerHTML += ` <div class="toast mt-2 end-0" id="EpicToast" role="alert" aria-live="assertive" aria-atomic="true" style="position: absolute; top: 20px; right: 20px;">
            <div class="toast-header">
                <strong class="mr-auto">Se agrego al carrito:</strong>
    
                <small></small>
        </div>
      <div class="toast-body">
                ${product_name}
            </div>
        </div>`;
            var toastHTMLElement = document.getElementById("EpicToast");
            var toastElement = new bootstrap.Toast(toastHTMLElement, option);
            toastElement.show();
            mostrarCarrito(carrito);

            setTimeout(function() {
                var message = document.getElementById("item-added-message");
                if (message != null) {
                    row.removeChild(message);
                }
            }, 4000);
        });
    });
}