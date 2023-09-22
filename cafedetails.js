const csvData = [];
const cafes = [];

onload = async () => {
  try {
    const res = await fetch("./data.csv");
    const data = await res.text();
    csvData.push(data);
    const rows = csvData[0].split('\n');
    for (let i = 0; i < rows.length; i++) {
      const columns = rows[i].split('|');
      cafes.push(columns);
    }

    const urlParams = new URLSearchParams(window.location.search);
    const cafeID = urlParams.get('id');
    
    const selectedCafe = cafes.find(data => data[0] === cafeID);
    
    console.log(selectedCafe[0]);
    const cafeImage = document.getElementById('cafeImage');
    cafeImage.src = selectedCafe[3];
    document.title=selectedCafe[0];
    const cafeText=document.getElementById('cafeText');
    cafeText.textContent=selectedCafe[1];
  } catch (error) {
    console.error("Veri yüklenirken bir hata oluştu:", error);
  }
}


