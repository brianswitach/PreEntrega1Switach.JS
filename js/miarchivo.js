
const prices = [10, 20, 30];


const discountThreshold = 50;
const discountRate = 0.1; 

function calculateTotalCost() {
  
  let quantities = prices.map((price, index) => {
    let quantity = parseInt(prompt(`Ingrese la cantidad para el Producto ${index + 1} ($${price}):`)) || 0;
    return quantity;
  });


  let total = quantities.reduce((acc, quantity, index) => acc + (quantity * prices[index]), 0);

 
  if (total > discountThreshold) {
    total -= total * discountRate;
  }

  
  alert(`Costo Total: $${total.toFixed(2)}`);
}


calculateTotalCost();
