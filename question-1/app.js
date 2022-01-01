const cafes = require("./cafe");
const places = require("./place");

const findTheCafes = (cafe) => {
  const getCafes = cafes.filter((item) =>
    item.name.toLowerCase().includes(cafe.trim().toLowerCase())
  );
  const matchThePlaces = [];
  for (let cafe of getCafes) {
    const getPlace = places.find((place) => cafe.place_id === place.id);
    delete cafe.place_id;
    delete getPlace.id;

    matchThePlaces.push({ ...cafe, ...getPlace });
  }
  return matchThePlaces;
};

const getRequiredPlace = findTheCafes("Philz");

console.log(getRequiredPlace);
