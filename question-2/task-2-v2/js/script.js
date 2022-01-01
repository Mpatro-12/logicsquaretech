let placesArr;
let cafesArr;
const search_box = document.querySelector('.search_box');
const tableBody = document.querySelector('tbody');

const renderTableRow = (tableContent) => {
  tableBody.innerHTML = tableContent
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
};

const filterTable = async () => {
  const inputVal = search_box.value;
  const placesRes = await fetch(
    'https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/places.json'
  );
  const placesJson = await placesRes.json();
  placesArr = placesJson.places;

  const cafesRes = await fetch(
    'https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/cafes.json'
  );
  const cafesJson = await cafesRes.json();
  cafesArr = cafesJson.cafes;

  if (!!placesArr.length && !!cafesArr.length) {
    let cafesAndPlaces = [];
    for (let cafe of cafesArr) {
      const cafePlace = placesArr.find(
        (place) => cafe.location_id === place.id
      );
      cafesAndPlaces = [...cafesAndPlaces, { ...cafe, ...cafePlace }];
    }
    const getCafesPlaces = cafesAndPlaces.filter((cafePlace) =>
      cafePlace?.name.toLowerCase().includes(inputVal.toLowerCase())
    );
    renderTableRow(getCafesPlaces);
  }
};
search_box.addEventListener('input', filterTable);

filterTable();

(async () => {
  const placesRes = await fetch(
    'https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/places.json'
  );
  const placesJson = await placesRes.json();
  const placesArr = placesJson.places;

  const cafesRes = await fetch(
    'https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/cafes.json'
  );
  const cafesJson = await cafesRes.json();
  const cafesArr = cafesJson.cafes;

  if (!!placesArr.length && !!cafesArr.length) {
    let cafesAndPlaces = [];
    for (let cafe of cafesArr) {
      const cafePlace = placesArr.find(
        (place) => cafe.location_id === place.id
      );
      cafesAndPlaces = [...cafesAndPlaces, { ...cafe, ...cafePlace }];
    }
    renderTableRow(cafesAndPlaces);
  }
})();
