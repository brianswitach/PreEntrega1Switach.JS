
const precios = [10, 20, 30];


const descuentouno = 50;
const descuentodos = 0.1; 

function calculateTotalCost() {
  
  let cantidades = precios.map((price, index) => {
    let cantidad = parseInt(prompt(`Ingrese la cantidad para el Producto ${index + 1} ($${price}):`)) || 0;
    return cantidad;
  });


  let total = cantidades.reduce((acc, cantidad, index) => acc + (quantity * precios[index]), 0);

 
  if (total > descuentouno) {
    total -= total * descuentodos;
  }

  
  alert(`Costo Total: $${total.toFixed(2)}`);
}


calculateTotalCost();
