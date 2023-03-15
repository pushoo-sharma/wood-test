const GoogleMap = require("./googleMap");

const getTransportationCost = async (supply, customer) => {
  const supplerAddress = supply.supplier.address;
  const customerAddress = customer.address;
  const googleMap = GoogleMap.fromEnv();
  const data = await googleMap.directions(supplerAddress, customerAddress);
  const transportation_cost = data.distanceInKm * (2.246 + 1.738);
  return transportation_cost;
};

const assignSuppliers = async (order, supplies) => {
  const suppliers = [];
  let totalCost = 0;
  const { user, quantity } = order;
  let remainingQuantity = parseInt(quantity);

  while (remainingQuantity > 0) {
    let minCost = Infinity;
    let minCostSupplier, minCostQuantity, minCostTransportation;

    for (const supply of supplies) {
      if (supply.stock > 0) {
        const quantityToAssign = Math.min(remainingQuantity, supply.stock);
        const transportationCost = await getTransportationCost(supply, user);
        const total = supply.price * quantityToAssign + transportationCost;
        if (total < minCost) {
          minCost = total;
          minCostSupplier = supply;
          minCostQuantity = quantityToAssign;
          minCostTransportation = transportationCost;
        }
      }
    }
    if (minCostSupplier) {
      remainingQuantity -= minCostQuantity;
      minCostSupplier.stock -= minCostQuantity;

      minCostSupplier = minCostSupplier.toJSON();
      // add new properties
      totalCost += minCost;
      minCostSupplier.quantity = minCostQuantity;
      suppliers.push(minCostSupplier);
      minCostSupplier = null;
    }
  }
  return { suppliers, totalCost, remainingQuantity };
};

module.exports = {
  assignSuppliers,
};
