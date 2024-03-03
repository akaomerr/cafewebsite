const csvData = [];
const cafes = [];
const cardContainer = document.querySelector(".row");

onload = async () => {
  try {
    const res = await fetch("./data.csv");
    const data = await res.text();
    csvData.push(data);
    const rows = csvData[0].split('\r\n').filter(row => row.trim() !== '');
    rows.forEach(row => {
      const columns = row.split('|');
      cafes.push(columns);
    });
    console.log(cafes)
    displayCafes(cafes);
  } catch (error) {
    console.error("Veri yüklenirken bir hata oluştu:", error);
  }
}

function displayCafes(data) {
  cardContainer.innerHTML = '';
  data.forEach((cafe) => {
    const card = createCard(cafe);
    cardContainer.appendChild(card);
  });
}

function createCard(data) {
  const card = document.createElement("div");
  card.className = "col";
  card.innerHTML = `
    <div class="card" style="width: 18rem;">
      <img src="${data[3]}" class="card-img-top" alt="${data[0]}">
      <div class="card-body">
        <h5 class="card-title">${data[0]}</h5>
        <p class="card-text">${data[1]}</p>
        <a href="detail.html?id=${data[0]}" class="btn" style="background-color: #E2C799">Details</a>
      </div>
    </div>
  `;
  return card;
}

const searchInput = document.querySelector("input[type='search']");

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredCafes = cafes.filter((cafe) => cafe[0].toLowerCase().includes(searchTerm));
  displayCafes(filteredCafes);
});
