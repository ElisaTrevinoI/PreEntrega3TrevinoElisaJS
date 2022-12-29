let productos = [
    {
        id: 1, nombre: "Mandala OMBRÉ", stock: 23, precio: 100,
        imgUrl: "../img/estambre1_1.jpg", material: "Algodon"
    },
    {
        id: 2, nombre: "Mandala THICK & QUICK", stock: 10, precio: 90,
        imgUrl: "../img/estambre1_2.jpg", material: "Algodon"
    },
    {
        id: 3, nombre: "Mandala BABY", stock: 34, precio: 80,
        imgUrl: "../img/estambre1_3.jpg", material: "Algodon"
    },
    {
        id: 4, nombre: "Mandala SEQUINS", stock: 16, precio: 120,
        imgUrl: "../img/estambre1_4.jpg", material: "Algodon"
    },
    {
        id: 5, nombre: "Wool Ease WOW", stock: 23, precio: 150,
        imgUrl: "../img/estambre2_1.jpg", material: "Lana"
    },
    {
        id: 6, nombre: "Wool Ease", stock: 10, precio: 130,
        imgUrl: "../img/estambre2_2.jpg", material: "Lana"
    },
    {
        id: 7, nombre: "Wool Ease THICK & QUICK", stock: 34, precio: 100,
        imgUrl: "../img/estambre2_3.jpg", material: "Lana"
    },
    {
        id: 8, nombre: "Wool Ease THICK & QUICK", stock: 16, precio: 120,
        imgUrl: "../img/estambre2_4.jpg", material: "Lana"
    },
]

let carrito = []
let arrCarrito = []

/*localStorage.setItem("carrito1", JSON.stringify(arrCarrito))*/

let carritoEnLS = JSON.parse(localStorage.getItem("carrito1"))

if (carritoEnLS) {
    arrCarrito = carritoEnLS
}

let contenedorCarrito = document.getElementById("contenedorCarrito")

let obCarrito

let obtenerIndiceProductos = (id, arr) => arr.findIndex(elemento => elemento.id === id)

let obtenerIndiceCarrito = (id, arr) => arr.findIndex(elemento => elemento.idEstambre === id)


function producto(idEstambre, cantidad) {
    this.idEstambre = idEstambre
    this.cantidad = cantidad
}

/*Mostrar productos disponibles*/


let contadorInput
let contenedor = document.getElementById("contenedorProductos")

for (const producto of productos) {

    let tarjetaProducto = document.createElement("div")

    tarjetaProducto.className = "producto"
    tarjetaProducto.id = producto.id

    contadorInput = "input" + producto.id
    if (producto.id < 5) {

        tarjetaProducto.innerHTML = `
            <div class="mostrarEstambre">
            <img class="estambre" src=${producto.imgUrl}>
            <p class="datosEstambre">${producto.nombre}</p>
            <p class="datosEstambre">Material: ${producto.material}</p>
            <p class="datosEstambre">Inventario: ${producto.stock} u.</p>
            <p class="datosEstambre">Precio: $${producto.precio}</p>
            <p class="datosEstambre"><label>Cantidad:</label>
            <input id=${contadorInput} class="campoEntrada" type="number" name="quantity" value="0"></p>
            <button class="boton" id=${producto.id}>Añadir al carrito</button>
            </div>
         `
        contenedor.append(tarjetaProducto)

    } else {
        tarjetaProducto.innerHTML = `
            <div class="mostrarEstambre">
            <img class="estambre" src=${producto.imgUrl}>
            <p class="datosEstambre">${producto.nombre}</p>
            <p class="datosEstambre">Material: ${producto.material}</p>
            <p class="datosEstambre">Inventario: ${producto.stock} u.</p>
            <p class="datosEstambre">Precio: $${producto.precio}</p>
            <p class="datosEstambre"><label>Cantidad:</label>
            <input id=${contadorInput} class="campoEntrada" type="number" name="quantity" value="0"></p>
            <button class="boton" id=${producto.id}>Añadir al carrito</button>
            </div>
         `
        contenedor.append(tarjetaProducto)
    }

    let botones = document.getElementsByClassName("boton")
    for (const boton of botones) {
        boton.addEventListener("click", agregarAlCarrito)
    }
}


/*Agregar al carrito*/

function agregarAlCarrito(e) {



    let idInput
    let cantidadSeleccionada

    let productoBuscado = productos.find(producto => producto.id == e.target.id)

    idInput = "input" + e.target.id

    let cant1 = document.getElementById(idInput)
    cantidadSeleccionada = Number(cant1.value)

    encuentraArrCarrito = obtenerIndiceCarrito(productoBuscado.id, arrCarrito)


    if (encuentraArrCarrito < 0) {

        obCarrito = new producto(productoBuscado.id, cantidadSeleccionada)

        arrCarrito.push(obCarrito)

    } else {

        arrCarrito[encuentraArrCarrito].cantidad = arrCarrito[encuentraArrCarrito].cantidad + cantidadSeleccionada

    }

    localStorage.setItem("carrito1", JSON.stringify(arrCarrito))


}


let botonLlamaCarrito = document.getElementById("idCarrito");
botonLlamaCarrito.addEventListener('click', event => {
    renderizarCarrito(arrCarrito)

})

/*Actualizar carrito*/

function renderizarCarrito(arrayDeProductos) {


    document.getElementById("textoPrincipalEst").innerHTML = "Productos agregados al carrito de compras"


    let contenedor = document.getElementById("contenedorProductos")
    contenedorProductos.innerHTML = ""
    for (const producto of arrayDeProductos) {

        encuentraArrEstambres = obtenerIndiceProductos(producto.idEstambre, productos)

        let totalEstambre = productos[encuentraArrEstambres].precio * producto.cantidad

        contenedorProductos.innerHTML += `
        <div class="mostrarEstambre">
        <img class="estambre" src=${productos[encuentraArrEstambres].imgUrl}>
        <p class="datosEstambre">${productos[encuentraArrEstambres].nombre}</p>
        <p class="datosEstambre">Material: ${productos[encuentraArrEstambres].material}</p>
        <p class="datosEstambre">Cantidad: ${producto.cantidad}</p>
        <p class="datosEstambre">Precio: ${productos[encuentraArrEstambres].precio}</p>
        <p class="datosEstambre">Total: ${totalEstambre}</p>
        </div>
        `

    }
}








