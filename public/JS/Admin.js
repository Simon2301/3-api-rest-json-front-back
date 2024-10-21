const endpoint = 'http://localhost:3000/productos'

// Event listener para el botón "Añadir Producto"
document.getElementById('añadir').addEventListener('click', function () {
  const formulario = document.getElementById('prodNuevo');
  formulario.classList.toggle('new');
});

fetch(endpoint)
  .then(respuesta => respuesta.json())
  .then(datos => mostrarProductos(datos))

const mostrarProductos = (datos) => {
  let productos = ''
  const contenedor = document.querySelector('#contProducAdmin')
  datos.forEach(datos => {
    productos +=
      `<div class="card border border-1 border-dark d-flex flex-column align-items-center"
            style="width: 100%; max-width: 300px; margin:30px">
            <img src="${datos.imagen}" class="card-img-top" alt="...">
            <div class="card-body ">
                <h4>${datos.titulo}</h4>
                <p class="card-text ">${datos.descripcion}</p>
            </div>
<div class="d-flex justify-content-between align-items-center w-100 mb-2 px-2">
  <p class="card-text border border-secondary rounded p-2 mb-0">
    <strong>${datos.precio}</strong>
  </p>
  <div class="d-flex ms-auto">
    <a href="#prodEditar" class="btn btn-outline-warning me-2 edit">
      <i class="bi bi-pencil"></i>
    </a>
    <a onclick="eliminar(${datos.id})" class="btn btn-outline-danger" type="submit">
      <i class="bi bi-trash"></i>
    </a>
  </div>
</div>


        </div>`
  })
  contenedor.innerHTML = productos

  // Añadir event listeners a los botones "Editar"
  const editButtons = document.querySelectorAll('.edit');
  editButtons.forEach(button => {
    button.addEventListener('click', function () {
      const formulario = document.getElementById('prodEditar');
      formulario.classList.toggle('newE');
    });
  });
}

const formulario = document.forms['formAñadir']
console.log(formulario)

//Añadir Producto

formulario.addEventListener('submit', (event) => {
  event.preventDefault();

  let titulo = formulario.Titulo.value
  let descripcion = formulario.Descripcion.value
  let precio = formulario.Precio.value
  let img = "./img/img3.jpg"
  // console.log(titulo,descripcion,precio);

  // Objetos con los datos obtenidos en el formulario
  let newDatos = { imagen: img, titulo: titulo, descripcion: descripcion, precio: precio }


  if (!newDatos.titulo || !newDatos.descripcion || !newDatos.precio) {
    document.querySelector('#mensaje').innerHTML = '*Complete todos los datos'
    return
  }
  else {
    document.querySelector('#mensaje').innerHTML = ''
    // return
  }

  let nuevosDatosJson = JSON.stringify(newDatos)
  console.log(nuevosDatosJson)
  const enviarNewProducto = async() =>{ //enviar datos al back
    try{
      const enviarDatos = await fetch(endpoint, {
        method: 'post',
        headers: { 
          'content-type': 'application/json'
        },
        body: nuevosDatosJson
      })
      //obtengo la respuesta del back
      const respuesta = await enviarDatos.json()
      console.log(respuesta)
      //limpiar formulario
     // document.querySelector('#formAñadir').reset()

      document.querySelector('#formAñadir').style.display='none'
      mostrarMensaje(respuesta.mensaje)
      setTimeout(()=>{location.reload();}, 5000)
    }
    catch(error){
      console.log(error)
    }
  }
  enviarNewProducto()

  mostrarMensaje=(mensaje)=>{
    document.querySelector('#contMensaje').innerHTML = mensaje
  }
})


//Eliminar Producto
const eliminar = (id)=>{
  console.log("eliminar id: "+id)
  console.log(endpoint+'/'+ id)

  //enviamos datos al backend


const eliminarProd = async()=>{
  try{
    const res = await fetch (endpoint+'/'+id,{
      method: 'delete'
    })
    //obtengo respuesta del backend
    const respuesta = await res.json
    //mostrar mensaje de producto eliminado
    mostrarMensaje(respuesta.mensaje)
  }catch{
    mostrarMensaje('Error al borrar')
  }
  eliminarProd()
}

}