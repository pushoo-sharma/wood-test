const GoogleMapsAPI = require("googlemaps");
const Constants = require("../constant/app");

class GoogleMap {
  constructor(API_KEY) {
    const publicConfig = {
      key: API_KEY,
    };
    const gmAPI = new GoogleMapsAPI(publicConfig);
    this.instance = gmAPI;
  }

  static fromEnv() {
    return new GoogleMap(Constants.GOOGLE_MAP_API_KEY);
  }

  async directions(
    sourceAddress,
    destinationAddress,
    mode = "driving",
    departureTime = new Date()
  ) {
    const params = {
      origin: sourceAddress,
      destination: destinationAddress,
      mode: mode,
      departure_time: departureTime.getTime() / 1000,
    };

    return new Promise((resolve, reject) => {
      this.instance.directions(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          if (!data.routes.length) {
            reject(new Error("Out of location"));
            return;
          }
          const legs = data.routes[0].legs[0];
          const distanceInKm = legs.distance.value / 1000;
          const durationInHours = legs.duration.value / 3600;
          const result = {
            ...data,
            distanceInKm,
            durationInHours,
          };
          resolve(result);
        }
      });
    });
  }
}

module.exports = GoogleMap;
