// Árak (Excel adatok alapján szerkeszthető)
const prices = [
    { id: "mowing", name: "Fűnyírás", unit: "m²", price: 500 },
    { id: "planting", name: "Ültetés", unit: "db", price: 1000 },
    { id: "gravel", name: "Kavics elrendezés", unit: "m³", price: 15000 },
    { id: "paving", name: "Térkövezés", unit: "m²", price: 20000 },
    { id: "weeding", name: "Gyomirtás", unit: "m²", price: 300 },
    // További tételek hozzáadhatók...
  ];
  
  // Kosár tételeinek tárolása
  const cart = [];
  
  // Munka típusok betöltése (dinamikus generálás)
  function populateWorkTypes() {
    const workTypeSelect = document.getElementById("workType");
    prices.forEach(task => {
      const option = document.createElement("option");
      option.value = task.id;
      option.textContent = `${task.name} (${task.price} HUF/${task.unit})`;
      workTypeSelect.appendChild(option);
    });
  }
  
  // Új tétel hozzáadása a kosárhoz
  function addItem() {
    const workTypeId = document.getElementById("workType").value;
    const area = parseFloat(document.getElementById("area").value) || 0;
    const count = parseFloat(document.getElementById("count").value) || 0;
  
    // Ellenőrzés: nincs negatív érték
    if (!workTypeId || area < 0 || count < 0 || (area === 0 && count === 0)) {
      alert("Kérlek, adj meg érvényes és pozitív adatokat!");
      return;
    }
  
    const task = prices.find(item => item.id === workTypeId);
  
    let cost = 0;
    if (task.unit === "m²") {
      cost = task.price * area; // Négyzetméter alapú számítás
    } else if (task.unit === "db") {
      cost = task.price * count; // Darabszám alapú számítás
    } else if (task.unit === "m³") {
      cost = task.price * area; // Köbméter alapú számítás
    } else {
      alert("Nem támogatott egység.");
      return;
    }
  
    cart.push({ name: task.name, area, count, cost });
    updateItemList();
    updateTotalCost();
  }
  
  // Kiválasztott tételek megjelenítése a kosárban
  function updateItemList() {
    const itemList = document.getElementById("itemList");
    itemList.innerHTML = ""; // Korábbi tételek törlése
  
    cart.forEach((item, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${item.name} - ${item.area ? `${item.area} m²` : ""} ${item.count ? `${item.count} db` : ""} = ${item.cost} HUF`;
  
      // Eltávolítás gomb hozzáadása
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Eltávolítás";
      deleteButton.onclick = () => removeItem(index);
      listItem.appendChild(deleteButton);
  
      itemList.appendChild(listItem);
    });
  }
  
  // Tétel eltávolítása a kosárból
  function removeItem(index) {
    cart.splice(index, 1); // Tétel törlése
    updateItemList();
    updateTotalCost();
  }
  
  // Végösszeg frissítése
  function updateTotalCost() {
    const total = cart.reduce((sum, item) => sum + item.cost, 0); // Teljes ár kiszámítása
    document.getElementById("totalCost").textContent = `${total} HUF`;
  }
  
  // Oldal betöltésekor a munka típusok megjelenítése
  document.addEventListener("DOMContentLoaded", populateWorkTypes);