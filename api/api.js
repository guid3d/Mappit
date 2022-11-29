import axios from "axios";

export default {
  stationLocations: async ({ latitude, longtitude }) => 
    await axios
      .get(
        `https://www.mvg.de/api/fahrinfo/location/nearby?latitude=${latitude}&longitude=${longtitude}`
      )
      .then((res) => res.data)
  ,
  // stationLocationsDummy: () => {
  //   fetch(
  //     `https://www.mvg.de/api/fahrinfo/location/nearby?latitude=48.12046&longitude=11.61869`
  //   ).then((res) => res.json());
  // },
};
