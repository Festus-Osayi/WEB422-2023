let vehicleData = [{
  "id": 1,
  "year": 1994,
  "make": "Suzuki",
  "model": "SJ",
  "vin": "JN8AZ2KR6CT544012"
}, {
  "id": 2,
  "year": 1999,
  "make": "Chrysler",
  "model": "300",
  "vin": "1B3CC5FB5AN648885"
}, {
  "id": 3,
  "year": 2005,
  "make": "BMW",
  "model": "X3",
  "vin": "JTHBP5C29E5152916"
}, {
  "id": 4,
  "year": 2006,
  "make": "Honda",
  "model": "CR-V",
  "vin": "WBAVD53557A338302"
}, {
  "id": 5,
  "year": 1981,
  "make": "Chevrolet",
  "model": "Camaro",
  "vin": "JM1GJ1T56E1803549"
}]

module.exports.getAllVehicles = function () {
  return new Promise(function (resolve, reject) {
    resolve(vehicleData);
  });

};

module.exports.addVehicle = function (vehicle) {
  return new Promise(function (resolve, reject) {
    const newVehicle = { id: generateId(), ...vehicle };
    vehicleData.push(newVehicle);
    resolve(newVehicle);
  });
};

module.exports.deleteVehicle = function (id) {
  return new Promise(function (resolve, reject) {
    const index = vehicleData.findIndex((vehicle) => vehicle.id === id);
    if (index !== -1) {
      const deletedVehicle = vehicleData.splice(index, 1);
      resolve(deletedVehicle[0]);
    } else {
      resolve(null);
    }
  });
};

// Function to generate a unique ID for new vehicles
function generateId() {
  // Generate a random number between 1 and 100000
  return Math.floor(Math.random() * 100000) + 1;
}