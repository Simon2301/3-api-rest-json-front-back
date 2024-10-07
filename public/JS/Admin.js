// Event listener para el botón "Añadir Producto"
document.getElementById('añadir').addEventListener('click', function () {
  const formulario = document.getElementById('prodNuevo');
  formulario.classList.toggle('new');
});

fetch('http://localhost:3000/productos')
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
    <a class="btn btn-outline-danger" type="submit">
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
formulario.addEventListener('submit', (event) => {
  event.preventDefault();

  let titulo = formulario.Titulo.value
  let descripcion = formulario.Descripcion.value
  let precio = formulario.Precio.value
  // console.log(titulo,descripcion,precio);

  // Objetos con los datos obtenidos en el formulario
  let newDatos = {titulo: titulo, descripcion: descripcion, precio: precio}
  
  let nuevosDatosJson = JSON.stringify(newDatos)
  console.log(nuevosDatosJson)
})
