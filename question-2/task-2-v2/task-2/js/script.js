const placesAPI =
  'https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/places.json';
const cafesAPI =
  'https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/cafes.json';

let cafes;
let places;
const searchField = document.querySelector('#searchField');
const table_body = document.querySelector('.table_body');

const findCaliforniaCafes = (cafes, places) => {
  const matchCafePlace = [];
  for (let cafe of cafes) {
    const getPlace = places.find((place) => cafe.place_id === place.id);
    delete getPlace.id;
    delete cafe.place_id;
    console.log({ getPlace });
    matchCafePlace.push({ ...cafe, ...getPlace });
  }
  return matchCafePlace;
};

function UpdateDisplay() {
  const inputVal = searchField.value;
  fetch(placesAPI)
    .then((res) => res.json())
    .then((resp) => {
      if (!resp.error) {
        places = resp.places;
        fetch(cafesAPI)
          .then((res) => res.json())
          .then((resp) => {
            if (!resp.error) {
              cafes = resp.cafes;
              let matchCafePlace = [];
              for (let cafe of cafes) {
                const getPlace = places.find(
                  (place) => cafe.location_id === place.id
                );
                matchCafePlace.push({ ...cafe, ...getPlace });
              }
              const filteredMatchCafePlace = matchCafePlace.filter(
                (cafePlace) =>
                  cafePlace?.name.toLowerCase().includes(inputVal.toLowerCase())
              );
              // console.log({ filteredMatchCafePlace });
              table_body.innerHTML = filteredMatchCafePlace
                .sort((a, b) =>
                  a.name > b.name ? 1 : b.name > a.name ? -1 : 0
                )
                .map(
                  (cafePlace, indx) => `
              <tr>
                <td> ${indx + 1} </td>
                <td class="column2">${cafePlace?.name}</td>
                <td class="column3">${cafePlace?.locality}</td>
                <td class="column4">${cafePlace?.postal_code}</td>
                <td class="column5">${cafePlace?.lat}</td>
                <td class="column6">${cafePlace?.long}</td>
              </tr>`
                )
                .join('');
            }
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
}
searchField.addEventListener('input', UpdateDisplay);

UpdateDisplay();

fetch(placesAPI)
  .then((res) => res.json())
  .then((resp) => {
    if (!resp.error) {
      places = resp.places;
      fetch(cafesAPI)
        .then((res) => res.json())
        .then((resp) => {
          if (!resp.error) {
            cafes = resp.cafes;
            let matchCafePlace = [];
            for (let cafe of cafes) {
              const getPlace = places.find(
                (place) => cafe.location_id === place.id
              );
              matchCafePlace.push({ ...cafe, ...getPlace });
            }
            table_body.innerHTML = matchCafePlace
              .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
              .map(
                (cafePlace, indx) => `
              <tr>
                <td>${indx + 1}</td>
                <td class="column2">${cafePlace?.name}</td>
                <td class="column3">${cafePlace?.locality}</td>
                <td class="column4">${cafePlace?.postal_code}</td>
                <td class="column5">${cafePlace?.lat}</td>
                <td class="column6">${cafePlace?.long}</td>
              </tr>`
              )
              .join('');
          }
        })
        .catch((err) => console.log(err));
    }
  })
  .catch((err) => console.log(err));
