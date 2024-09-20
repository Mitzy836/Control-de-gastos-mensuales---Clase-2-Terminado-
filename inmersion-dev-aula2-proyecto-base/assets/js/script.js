let listaNombresGastos = [];
let listaValoresGastos = [];
let listaDescripcion = [];

// Variable para el indice del gasto al editar
let indiceEdiccion = null; 

//Se invoca cuando el usuario hace click en el boton
function clickBoton() {
    let nombreGasto = document.getElementById('nombreGasto').value;
    let valorGasto = document.getElementById('valorGasto').value;
    let descripcionGasto = document.getElementById('descripcionGasto').value;
    
    console.log(nombreGasto);
    console.log(valorGasto);


    if (indiceEdiccion !== null ){

        // Editar el gasto ya existente 
        listaNombresGastos[indiceEdiccion] = nombreGasto;
        listaValoresGastos[indiceEdiccion] = valorGasto;
        listaDescripcion[indiceEdiccion] = descripcionGasto;
        // Retornar el indice
        indiceEdiccion = null;

        // Cambiar el boton
        document.getElementById('botonFormulario').innerHTML = "Agregar Gasto"; 

    } else {

        // Agregar un gasto nuevo 
        if ( Number (valorGasto) >= 150){
            Swal.fire({
                title: "¡Hola!",
                text: "Tienes un gasto igual o mayor a 150 USD",
                icon: "success"
            });
            
        }
        listaNombresGastos.push(nombreGasto);
        listaValoresGastos.push(valorGasto);
        listaDescripcion.push(descripcionGasto);
    }

    
    console.log(listaNombresGastos);
    console.log(listaValoresGastos);   

    limpiar();
    actualizarListaGastos();
}

function actualizarListaGastos() {
    // pintar en el html sin hacer nada en html
    const listaElementos = document.getElementById('listaDeGastos');
    const totalElementos = document.getElementById('totalGastos');

    let htmlLista = '';
    let totalGastos = 0;

    listaNombresGastos.forEach((elemento,posicion) => {
        const valorGasto = Number (listaValoresGastos [posicion]);
        const descripcionGasto = listaDescripcion[posicion];

        htmlLista += `<li>${elemento} - USD ${valorGasto.toFixed(2)}
             <button onclick="eliminarGasto(${posicion});">Eliminar</button>
             <button onclick="editarGasto(${posicion});">Editar</button>
        </li>`;
        
        //Calculamos el total de gastos
        totalGastos += Number (valorGasto);
    });

    listaElementos.innerHTML = htmlLista;
    totalElementos.innerHTML = totalGastos.toFixed(2);
    limpiar();
}

function editarGasto(indice) {
    //Ingresar al modo editor

    Swal.fire({
        title: "¡BIENVENIDO!",
        text: "QUIERES INGRESAR A EDITAR ALGO?",
        icon: "success"
    }).then((result) => {
        if (result.isConfirmed) {

            // Guardar el índice del gasto a editar
            indiceEdicion = indice; 

            document.getElementById('nombreGasto').value = listaNombresGastos[indice];
            document.getElementById('valorGasto').value = listaValoresGastos[indice];
            document.getElementById('descripcionGasto').value = listaDescripcion[indice];

            document.getElementById('botonFormulario').innerText = "Guardar"; // Cambiar el botón a "Guardar"
        }
    });
}


function limpiar() {
    document.getElementById('nombreGasto').value = '';
    document.getElementById('valorGasto').value = '';
    document.getElementById('descripcionGasto').value = '';
}

function eliminarGasto(posicion) {
    listaNombresGastos.splice(posicion,1);
    listaValoresGastos.splice(posicion,1);
    listaDescripcion.splice(posicion,1);
    actualizarListaGastos();
}
