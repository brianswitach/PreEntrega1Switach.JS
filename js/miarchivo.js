// Precios de los productos en un array para cumplir con la especificación de usar arrays
const prices = [10, 20, 30];

// Descuento y umbral
const discountThreshold = 50;
const discountRate = 0.1; // Descuento del 10%

function calculateTotalCost() {
  // Usando prompt para capturar la cantidad de cada producto
  let quantities = prices.map((price, index) => {
    let quantity = parseInt(prompt(`Ingrese la cantidad para el Producto ${index + 1} ($${price}):`)) || 0;
    return quantity;
  });

  // Calcular el costo total
  let total = quantities.reduce((acc, quantity, index) => acc + (quantity * prices[index]), 0);

  // Aplicar descuento si corresponde
  if (total > discountThreshold) {
    total -= total * discountRate;
  }

  // Usando alert para mostrar el costo total
  alert(`Costo Total: $${total.toFixed(2)}`);
}

// Llamar a la función para ejecutar el simulador inmediatamente
calculateTotalCost();
