class Producto {
    constructor(id, nombre, precio, marca, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.marca = marca;
        this.imagen = imagen;
    }
}
let productoSeleccionado;
/*
const producto1 = new Producto(
    1,
    "Laptop Lenovo IdeaPad 5i",
    4000,
    "Lenovo",
    "./Images/lenovo_idepad.jpg"
);
const producto2 = new Producto(
    2,
    "Laptop Miray LPM-BW15-i3",
    5000,
    "Miray",
    "./Images/miray.jpg"
);
const producto3 = new Producto(
    3,
    "Laptop Dell Inspiron 3515 D6DM6",
    6000,
    "Dell",
    "./Images/dell.jpg"
);
const producto4 = new Producto(
    4,
    "Macbook Air 13",
    5200,
    "Apple",
    "./Images/macbook.jpg"
);
const producto5 = new Producto(
    5,
    "Laptop Asus X571GT-HN1020T ",
    3340,
    "Asus",
    "./Images/asus_x4.jpg"
);
 
*/


/*.catch(error => {
    console.log(error)
    terminarSpinner;
} */
//console.log(productos)


//const productos = [producto1, producto2, producto3, producto4, producto5];



let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

var cantTotal = localStorage.getItem("cant");
let numCarrito = document.getElementById("cart_menu_num");

numCarrito.textContent = cantTotal;

let row2 = document.getElementById("row2");

let row = document.getElementById("row");

/*
function iniciarSpinner();
function terminarSpinner();
*/

let productos = []
    //iniciarSpinner();




const mostrarProductos = () => {
    productos.forEach((element, indice) => {
        let { id, imagen, nombre, precio, marca } = element;
        row.innerHTML += `
    <div class="card my-2" id="producto${element.indice}" style="width: 18rem;">
    <div class="card-body text-center">
    <p id="codigo"  hidden="hidden" class="text">${id}</p>
    <img class="imagen" id="img" src="./Images/${imagen}" alt="..." style="width:160px">
        <p name="label_name" class="card-text">${nombre}</p>
        <p  id="precio" class="precio card-text">${precio}</p>
        <p  id="marca" class="precio card-text">${marca}</p>
        <button name="add-item" class="btnAgregar btn btn-dark  shadow" id="btn">Agregar</button>
            </div>
        </div>`;
    });
}

mostrarProductos()


const mostrarFunciones = () => {
    mostrarProductos()
    ordenarProd()
    rangoProd()
    addEventToButtons();
    carritoOffcanvas();
    botonCarrito();
    //vaciarCarrito();
    escucharBotonesCarrito();
    //mostrarCarrito();
    //escucharBotonesCarrito();

}
async function obtenerProductos() {
    const response = await fetch(`./json/productos.json`)
    return await response.json()

}

obtenerProductos().then(productos1 => {
        productos1.forEach((producto) => {
            productos.push(producto)
        })
        console.log(productos)
        mostrarFunciones()



    })
    //mostrarProductos()


const ordenarProd = () => {
    let btnOrdenar = document.getElementById("btnOrdenar");

    btnOrdenar.addEventListener("click", () => {
        console.log("click sort");
        row.innerHTML = "";
        if (document.getElementById("flexRadioDefault1").checked) {
            productos.sort((a, b) => {
                if (a.precio < b.precio) {
                    return -1;
                } else if (a.precio > b.precio) {
                    return 1;
                } else {
                    return 0;
                }
            });
            console.log(productos);
            productos.forEach((element, indice) => {
                let { id, imagen, nombre, precio, marca } = element;
                row.innerHTML += `
                <div class="card my-2" id="producto${indice}" style="width: 18rem;">
                <div class="card-body text-center">
                <p id="codigo"  hidden="hidden" class="text">${id}</p>
                <img class="imagen" id="img" src="./Images/${imagen}" alt="..." style="width:160px">
                    <p name="label_name" class="card-text">${nombre}</p>
                    <p  id="precio" class="precio card-text">${precio}</p>
                    <p  id="marca" class="precio card-text">${marca}</p>
                    <button name="add-item" class="btnAgregar btn btn-dark shadow" id="btn">Agregar</button>
                    </div>
                </div>`;
            });
        } else {
            productos.sort((a, b) => {
                if (a.precio > b.precio) {
                    return -1;
                } else if (a.precio < b.precio) {
                    return 1;
                } else {
                    return 0;
                }
            });
            productos.forEach((element, indice) => {
                let { id, imagen, nombre, precio, marca } = element;
                row.innerHTML += `
    <div class="card my-2" id="producto${indice}" style="width: 18rem;">
    <div class="card-body text-center">
    <p id="codigo"  hidden="hidden" class="text">${id}</p>
    <img class="imagen" id="img" src="./Images/${imagen}" alt="..." style="width:160px">
        <p name="label_name" class="card-text">${nombre}</p>
        <p  id="precio" class="precio card-text">${precio}</p>
        <p  id="marca" class="precio card-text">${marca}</p>
        <button name="add-item" class="btnAgregar btn btn-dark" id="btn">Agregar</button>
        </div>
    </div>`;
            });
        }

        addEventToButtons();
    });
};

const rangoProd = () => {
    let mayor = document.getElementById("rangeMayor")
    let menor = document.getElementById("rangeMenor")
    let btnRange = document.getElementById("btnRangos")
    let txtMayor = document.getElementById("mayorText")
    let txtMenor = document.getElementById("menorText")

    const Menor = () => {
        menor.oninput = () => {
            console.log(menor.value)
            txtMenor.textContent = "S/." + menor.value
        }
        return menor.value
    }
    const Mayor = () => {
        mayor.oninput = () => {
            console.log(mayor.value)
            txtMayor.textContent = "S/." + mayor.value

        }
        return mayor.value
    }

    Menor()
    Mayor()

    btnRange.addEventListener("click", () => {
        let precioMenor = Menor()
        let precioMayor = Mayor()


        console.log(precioMenor)
        console.log(precioMayor)

        let productosRange = productos.filter(producto => producto.precio <= precioMayor && producto.precio >= precioMenor)
        console.log(productosRange)
        row.innerHTML = ""
        if (productosRange.length == 0) {
            row.innerHTML = `<h6 class="px-5">No hay productos disponibles</h6>`


        } else {
            productosRange.forEach((element, indice) => {
                let { id, imagen, nombre, precio, marca } = element;
                row.innerHTML += `
            <div class="card my-2" id="producto${indice}" style="width: 18rem;">
            <div class="card-body text-center">
            <p id="codigo"  hidden="hidden" class="text">${id}</p>
            <img class="imagen" id="img" src="./Images/${imagen}" alt="..." style="width:160px">
                <p name="label_name" class="card-text">${nombre}</p>
                <p  id="precio" class="precio card-text">${precio}</p>
                <p  id="marca" class="precio card-text">${marca}</p>
                <button name="add-item" class="btnAgregar btn btn-dark shadow" id="btn">Agregar</button>
                </div>
            </div>`;
            });
        }




        addEventToButtons();


    })




}



rangoProd();
ordenarProd();