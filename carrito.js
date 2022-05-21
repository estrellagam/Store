function carritoOffcanvas() {
    return (row2.innerHTML += ` <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
    <div class="offcanvas-header">
        <h5 id="offcanvasRightLabel">Carrito</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
   <div id="divPadre"></div> 
    <div class="offcanvas-body" id="mostrarProdCarrito">
    </div>
</div>`);
}

carritoOffcanvas();

let btnCarrito = document.getElementById("btnCarrito");


const botonCarrito = () => {
    btnCarrito.addEventListener("click", () => {

        mostrarCarrito(carrito);

    });
}

botonCarrito()




const vaciarCarrito = () => {
    let padre = document.getElementById("divPadre")
    let vaciar = document.getElementById("vaciarCarrito")
    console.log(" reset cart", vaciar);

    vaciar.addEventListener("click", () => {
        Swal.fire({
            title: 'Estás seguro de vaciar tu carrito?',
            text: "No se podrá revertir",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#8ED63B',
            cancelButtonColor: '#3B3B3A',
            confirmButtonText: 'Sí,estoy seguro!',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                carrito = []
                padre.removeChild(padre.firstElementChild);
                localStorage.setItem("carrito", JSON.stringify(carrito));
                localStorage.setItem("cant", 0);
                numCarrito.textContent = 0;


                Swal.fire({
                        title: 'Productos eliminados',
                        confirmButtonColor: '#8ED63B',

                    }


                )
                mostrarCarrito(carrito);
            }
        })
    })

}

const mostrarCarrito = (cart) => {
    let lista = document.getElementById("mostrarProdCarrito");
    let padre = document.getElementById("divPadre")
    padre.innerHTML = "";
    lista.innerHTML = "";

    if (cart.length > 0) {

        console.log(" total of elemtns ", cart)

        padre.innerHTML += `<a id="vaciarCarrito" style="text-align:right">Vaciar Carrito</a>`

        cantTotal == 1 ?
            (lista.innerHTML += `Tienes agregado ${cantTotal}  producto</p>`) :
            (lista.innerHTML += `Tienes agregados ${cantTotal}  productos</p>`);
        localStorage.setItem("cant", cantTotal);

        cart.forEach((productoCarrito) => {


            lista.innerHTML += `
        <div class="container border bg-white shadow-sm rounded my-2">
                <div class="row p-1">
                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 py-0 my-0">
                        <p class="card-title" style="font-weight:bold">${productoCarrito.marca.toUpperCase()}</p>
                    </div>

                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 align-self-end" id="trash">
                    <button class="btn-borrar" data-id="${productoCarrito.id}" style="width:50px"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/></svg></button>
                    </div>

                </div>
                <p class="card-text">${productoCarrito.nombre}</p>

                    <div class="row py-3">
                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 ">
                        <p class="card-text my-1">s/${productoCarrito.precio}</p>
                        <p class="cant my-1" id="cantidad"></p>
                        <div class="row  d-flex justify-content-evenly w-100" id="">
                        <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3 p-0" id="btns"> 
                        <button class="btn-restar shadow" data-id="${productoCarrito.id}">-</button>
                    </div> <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3  pt-1 px-0">  <h5 class="px-2">${ productoCarrito.cantidad}</h5>   </div>
                    <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3 p-0"> <button class="btn-aumentar shadow" data-id="${productoCarrito.id}">+</button>
            <br>
                    </div>

   
            </div>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 align-self-end" id="trash">
            <img src="${productoCarrito.imagen}" alt="..." style="width:80px">
        </div>


</div>


</div>  `;
        });

        // console.log("lista", lista)
        localStorage.setItem("carrito", JSON.stringify(cart));

        calcularTotal();
        vaciarCarrito();
    } else {
        lista.innerHTML = "No se agrego ningún producto";
        localStorage.setItem("cant", 0);
        localStorage.setItem("carrito", JSON.stringify(cart));

    }
    //vaciarCarrito()

}



const aumentarProducto = (productoAumentar) => {
    let productoEncontrado = carrito.find(
        (element) => element.id === productoAumentar

    );
    if (productoEncontrado) {
        productoEncontrado.cantidad++;
        cantTotal++
    }
    console.log("Aumentar:" + productoEncontrado.cantidad)

};

const restarProducto = (productoRestar) => {
    console.log("remove item")
    let productoEncontrado = carrito.find(
        (element) => element.id === productoRestar
    );
    if (productoEncontrado) {
        productoEncontrado.cantidad--;


        if (productoEncontrado.cantidad === 0) {
            productoEncontrado.cantidad = 1;

        } else {
            cantTotal--;
        }
    }
    console.log("Restar:" + productoEncontrado.cantidad)
        // mostrarCarrito(carrito);
};

const borrarProducto = (productoBorrar) => {
    let productoEncontrado = carrito.find(
        (element) => element.id === productoBorrar
    );
    //c
    let borrar = cantTotal - productoEncontrado.cantidad
    cantTotal = borrar
    carrito = carrito.filter((element) => element.id !== productoBorrar);
    console.log(carrito)

    mostrarCarrito(carrito);
};

const escucharBotonesCarrito = () => {
    let lista = document.getElementById("mostrarProdCarrito");


    lista.addEventListener("click", (e) => {

        //        console.log(e.target)

        if (e.target.classList.contains("btn-restar")) {
            var dataId = e.target.getAttribute("data-id");
            console.log(dataId)
            restarProducto(dataId);
            console.log("cantidad en restar" + cantTotal)
        }
        if (e.target.classList.contains("btn-borrar")) {
            var dataId = e.target.getAttribute("data-id");
            console.log(dataId)
            borrarProducto(dataId);
        }
        if (e.target.classList.contains("btn-aumentar")) {
            // aumentarProducto(e.target.getAttribute("data-id"));
            var dataId = e.target.getAttribute("data-id");
            console.log(dataId)
            var contador = 0;
            e.target.classList.contains("btn-aumentar").onclick = function() {
                contador++;

            }
            console.log("contador" + contador)
            aumentarProducto(dataId);
            console.log("cantidad en aumentar" + cantTotal)

        }
        numCarrito.textContent = cantTotal;
        mostrarCarrito(carrito);
    });
};

const calcularTotal = () => {
    let lista = document.getElementById("mostrarProdCarrito");
    let total = carrito.reduce((acc, ite) => acc + ite.cantidad * ite.precio, 0);
    lista.innerHTML += `<div class="" ><h5 style="text-align:right">Total:   ${total}</h5>
    </div>`;
};

//escucharBotonesCarrito();
mostrarCarrito(carrito);
//vaciarCarrito();
//escucharBotonesCarrito();