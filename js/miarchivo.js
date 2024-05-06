import _ from 'https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/lodash.min.js';

const MIN_COSTO_DESCUENTO = 50;
const PORCENTAJE_DESCUENTO = 0.1;
let productosGlobal = [];

async function cargarProductos() {
  try {
    const respuesta = await fetch('/js/productos.json');
    if (!respuesta.ok) {
      throw new Error(`Error HTTP! estado: ${respuesta.status}`);
    }
    const productos = await respuesta.json();
    productosGlobal = productos; 
    mostrarProductos(productosGlobal);
    mostrarInformacionDescuento();
    recuperarCostosAnteriores();
  } catch (e) {
    console.error('No se pudieron cargar los productos:', e);
    alert('No se pudieron cargar los productos: ' + e);
  }
}

function mostrarProductos(productos) {
  const form = document.getElementById('productForm');
  form.innerHTML = '';

  productos.forEach(producto => {
    const label = document.createElement('label');
    label.innerHTML = `${producto.nombre} (<span class="precio-verde">$${producto.precio}</span>): `;
    const input = document.createElement('input');
    input.type = 'number';
    input.min = '0';
    input.value = '0';
    input.id = _.camelCase(producto.nombre);
    label.appendChild(input);

    const descripcion = document.createElement('small');
    descripcion.textContent = ` - ${producto.descripcion}`;
    label.appendChild(descripcion);

    form.appendChild(label);
    form.appendChild(document.createElement('br'));
  });

  document.getElementById('calculateBtn').addEventListener('click', (event) => calculateTotalCost(productos, event));
}

function calculateTotalCost(productos, event) {
  event.preventDefault();


  let validInputs = true;
  productos.forEach(producto => {
    const cantidad = parseInt(document.getElementById(_.camelCase(producto.nombre)).value) || 0;
    if (cantidad < 0) {
      validInputs = false;
      Swal.fire({
        icon: 'error',
        title: 'Cantidad Inválida',
        text: `La cantidad de ${producto.nombre} debe ser un valor positivo.`,
      });
    }
  });

  if (!validInputs) {
    return; 
  }

  let total = productos.reduce((acc, producto) => {
    const cantidad = parseInt(document.getElementById(_.camelCase(producto.nombre)).value) || 0;
    return acc + (cantidad * producto.precio);
  }, 0);

  let descuentoAplicado = false;
  let ahorro = 0;

  
  if (total > MIN_COSTO_DESCUENTO) {
    ahorro = total * PORCENTAJE_DESCUENTO;
    total -= ahorro;
    descuentoAplicado = true;
  }

  const totalFinal = total.toFixed(2);
  const ahorroFinal = ahorro.toFixed(2);
  localStorage.setItem('totalCost', totalFinal);
  document.getElementById('totalCostDisplay').textContent = `Costo Total: $${totalFinal}`;

  if (descuentoAplicado) {
    Swal.fire({
      icon: 'info',
      title: 'Descuento Aplicado',
      html: `Un descuento del 10% fue aplicado porque superaste los $${MIN_COSTO_DESCUENTO}.<br>` +
            `<span class="precio-final">El costo total fue de $${totalFinal}</span> y te ahorraste ` +
            `<span class="ahorro-color">$${ahorroFinal}</span>.`,
      footer: '¡Aprovecha esta oferta especial!'
    });
  } else {
    Swal.fire({
      icon: 'info',
      title: 'Sin Descuento',
      text: `No se aplicó un descuento ya que el costo total es menor a $${MIN_COSTO_DESCUENTO}.`,
    });
  }

  mostrarMensajeAnterior();
}

function mostrarInformacionDescuento() {
  const infoDescuento = document.getElementById('descuentoInfo');
  infoDescuento.textContent = `Obtén un 10% de descuento al superar los $${MIN_COSTO_DESCUENTO}.`;
}

function recuperarCostosAnteriores() {
  const totalAnterior = localStorage.getItem('totalCost');
  if (totalAnterior) {
    document.getElementById('totalCostDisplay').textContent = `Último costo calculado: $${totalAnterior}`;
  }
}


document.getElementById('searchBar').addEventListener('input', function() {
  const query = this.value.toLowerCase();
  const productosFiltrados = productosGlobal.filter(producto => producto.nombre.toLowerCase().includes(query));
  mostrarProductos(productosFiltrados);
});

document.addEventListener('DOMContentLoaded', cargarProductos);
