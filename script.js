
fetch("../productos.json")
    .then(response => response.json())
    .then(productosObtenidos => {

        miPrograma(productosObtenidos)

    })

function miPrograma(productosObtenidos) {

    let productos = []
    let carrito = []
    let arrCarrito = []

    let productosBusqueda = []

    let carritoEnLs = JSON.parse(localStorage.getItem("carrito1"))

    let productosEnLs = JSON.parse(localStorage.getItem("productos1"))


    if (carritoEnLs) {
        arrCarrito = carritoEnLs
    }

    if (localStorage.getItem('productos1') == null) {

        productos = productosObtenidos

        actualizaLs("productos1", productos)

    } else {

        productos = productosEnLs
    }


    let contenedorCarrito = document.getElementById("contenedorCarrito")

    let obCarrito

    let obtenerIndiceProductos = (id, arr) => arr.findIndex(elemento => elemento.id === id)

    let obtenerIndiceCarrito = (id, arr) => arr.findIndex(elemento => elemento.idEstambre === id)

    function generaAlerta(texto, icono, confirmacion, tiempo) {

        Swal.fire({
            text: texto,
            icon: icono,
            showConfirmButton: confirmacion,
            timer: tiempo
        })

    }

    function producto(idEstambre, cantidad) {
        this.idEstambre = idEstambre
        this.cantidad = cantidad
    }


    function actualizaLs(nombreStorage, infoActualizar) {

        localStorage.setItem(nombreStorage, JSON.stringify(infoActualizar))

    }

    function consultaLs(nombreStorage) {

        return JSON.parse(localStorage.getItem(nombreStorage))

    }

    /*Mostrar productos disponibles*/

    renderizarProductos(productos)

    function renderizarProductos(arrayDeProductos) {

        let contadorInput
        let contenedor = document.getElementById("contenedorProductos")
        contenedor.innerHTML = ""
        for (const producto of arrayDeProductos) {

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
    }


    /*Agregar al carrito*/

    function agregarAlCarrito(e) {

        productos = consultaLs("productos1")

        let idInput
        let cantidadSeleccionada

        let productoBuscado = productos.find(producto => producto.id == e.target.id)

        let indexBuscado = productos.findIndex(producto => producto.id == e.target.id)

        idInput = "input" + e.target.id

        let cant1 = document.getElementById(idInput)
        cantidadSeleccionada = Number(cant1.value)

        if ((cantidadSeleccionada > 0) && (cantidadSeleccionada <= productoBuscado.stock)) {

            encuentraArrCarrito = obtenerIndiceCarrito(productoBuscado.id, arrCarrito)

            if (encuentraArrCarrito < 0) {

                obCarrito = new producto(productoBuscado.id, cantidadSeleccionada)

                arrCarrito.push(obCarrito)

            } else {

                arrCarrito[encuentraArrCarrito].cantidad = arrCarrito[encuentraArrCarrito].cantidad + cantidadSeleccionada
            }

            productoBuscado.stock = productoBuscado.stock - cantidadSeleccionada

            productos[indexBuscado].stock = productoBuscado.stock

            actualizaLs("carrito1", arrCarrito)

            actualizaLs("productos1", productos)

            generaAlerta('Producto agregado correctamente', 'success', false, 2000)

            renderizarProductos(productos)

        } else {
            /*Alerta no se puede agregar*/

            generaAlerta('Favor de seleccionar una cantidad válida', 'error', false, 2000)

        }
    }


    let botonLlamaCarrito = document.getElementById("idCarrito")
    botonLlamaCarrito.addEventListener('click', event => {
        renderizarCarrito(arrCarrito)

    })

    /*Actualizar carrito*/

    function renderizarCarrito(arrayDeProductos) {

        document.getElementById("collapseExample").style.visibility = "hidden"
        document.getElementById("idInputBusqueda").style.visibility = "hidden"
        document.getElementById("idBusqueda").style.visibility = "hidden"
        document.getElementById("idBusquedaImagen").style.visibility = "hidden"
        document.getElementById("idCarrito").style.visibility = "hidden"

        if (arrCarrito.length > 0) {

            document.getElementById("textoPrincipalEst").innerHTML = "Productos agregados al carrito de compras"

        } else {

            document.getElementById("textoPrincipalEst").innerHTML = "El carrito está vacío"

        }

        /*Crea el botón para vaciar el carrito*/

        let contenedorBotonVaciar = document.getElementById("vaciarCarrito")

        contenedorBotonVaciar.innerHTML = `
            <button class="boton" id="botonVaciarCarrito">Vaciar carrito</button>
              `
        let botonVaciarCarrito = document.getElementById("botonVaciarCarrito")
        botonVaciarCarrito.addEventListener('click', event => {
            vaciarCarrito()
        })

        /*Crea el contenedor de los productos a desplegar en el carrito*/

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
                 <button class="botonEliminar" id=${producto.idEstambre}>Eliminar del carrito</button>
                 </div>
                 `

            let botonesEliminar = document.getElementsByClassName("botonEliminar")
            for (const botonEliminar of botonesEliminar) {
                botonEliminar.addEventListener("click", eliminarDeCarrito)
            }
        }
    }


    /*Vaciar carrito*/

    function vaciarCarrito() {

        productosCarritoLs = consultaLs("carrito1")
        productosEnLs = consultaLs("productos1")


        let idProducto
        let cantidadProducto


        for (const productoEnLs1 of productosCarritoLs) {

            idProducto = productoEnLs1.idEstambre
            cantidadProducto = productoEnLs1.cantidad

            regresarCantidad(idProducto, cantidadProducto)
        }

        console.log(productosEnLs)

        arrCarrito = []

        localStorage.removeItem("carrito1")

        renderizarCarrito(arrCarrito)

    }

    /*Regresar cantidad*/

    let indiceProductoLs

    function regresarCantidad(idProducto1, cantidadProducto1) {

        let productosEnLs = JSON.parse(localStorage.getItem("productos1"))

        let indexBuscadoProductos = productos.findIndex(producto => producto.id == idProducto1)

        productosEnLs[indexBuscadoProductos].stock = productosEnLs[indexBuscadoProductos].stock + cantidadProducto1

        actualizaLs("productos1", productosEnLs)

    }

    /*Eliminar del carrito*/

    function eliminarDeCarrito(e2) {

        let consultaCarrito = consultaLs("carrito1")

        let indexBuscadoCarrito = consultaCarrito.findIndex(productoCarrito => productoCarrito.idEstambre == e2.target.id)


        if (consultaCarrito.length == 1) {

            vaciarCarrito()

        } else {

            if (consultaCarrito[indexBuscadoCarrito].cantidad >= 1) {

                regresarCantidad(consultaCarrito[indexBuscadoCarrito].idEstambre, consultaCarrito[indexBuscadoCarrito].cantidad)

                consultaCarrito.splice(indexBuscadoCarrito, 1)

                actualizaLs("carrito1", consultaCarrito)

                renderizarCarrito(consultaCarrito)

                console.log(productosEnLs)

            }
        }
    }


    /*Buscar productos*/

    let buscador = document.getElementById("idInputBusqueda")
    let botonBuscador = document.getElementById("idBusqueda")
    botonBuscador.addEventListener('click', renderizarProductosFiltrados)

    function renderizarProductosFiltrados() {

        let productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().includes(buscador.value.toLowerCase()) || producto.material.toLowerCase().includes(buscador.value))

        renderizarProductos(productosFiltrados)

    }
}