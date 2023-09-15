const csvData = [];
const cafes=[];


onload = async () => {
  try {
    const res = await fetch("./data.csv");
    const data = await res.text();
    csvData.push(data);
    const rows = csvData[0].split('\r');
    for (let i=0;i<rows.length;i++){
      const headers=rows[i].split(',');
      cafes.push(headers);
    }
    cafes.forEach((data) => {
      const card = createCard(data);
      cardContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Veri yüklenirken bir hata oluştu:", error);
  }
}
const cardContainer = document.querySelector(".row");
  function createCard(data) {
    const card = document.createElement("div");
    card.className = "col";
    card.innerHTML = `
      <div class="card" style="width: 18rem;">
        <img src="${data[2]}" class="card-img-top" alt="${data[0]}">
        <div class="card-body">
          <h5 class="card-title">${data[0]}</h5>
          <p class="card-text">${data[1]}</p>
          <a href="#" class="btn btn-warning">Detaylar</a>
        </div>
      </div>
    `;
    return card;
  }