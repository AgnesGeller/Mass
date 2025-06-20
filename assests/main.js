// Árak (Excel adatok alapján szerkeszthető)
const prices = [
  { id: "mowing", name: "Svéd Masszázs", unit: "fél óra", price: 5000 },
    { id: "mowing", name: "Svéd Masszázs", unit: "óra", price: 10000 },
    { id: "gravel", name: "Mélyszöveti Masszázs", unit: "fél óra", price: 5000 },
    { id: "gravel", name: "Mélyszöveti Masszázs", unit: "óra", price: 10000 },
    { id: "planting", name: "Relaxációs Masszázs", unit: "fél óra", price: 5000 },
    { id: "planting", name: "Relaxációs Masszázs", unit: "óra", price: 10000 }, 
    { id: "paving", name: "Aromaterápia Masszázs", unit: "fél óra", price: 5000 },
    { id: "paving", name: "Aromaterápia Masszázs", unit: "óra", price: 10000 },
    { id: "weeding", name: "Talp Reflexológia", unit: "fél óra", price: 5000 },
    { id: "weeding", name: "Talp Reflexológia", unit: "óra", price: 10000 },
    
    ];
    
    // További tételek hozzáadhatók...

  
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
    const hour = parseFloat(document.getElementById("area").value) || 0;
    const count = parseFloat(document.getElementById("count").value) || 0;
  
    // Ellenőrzés: nincs negatív érték
    if (!workTypeId || hour < 0 || count < 0 || (hour === 0 && count === 0)) {
      alert("Kérlek, adj meg érvényes és pozitív adatokat!");
      return;
    }
  
    const task = prices.find(item => item.id === workTypeId);
  
    let cost = 0;
    if (task.unit === "óra") {
      cost = task.price * hour; // Négyzetméter alapú számítás
    } else if (task.unit === "db") {
      cost = task.price * count; // Darabszám alapú számítás
    } else if (task.unit === "óra") {
      cost = task.price * hour; // Köbméter alapú számítás
    } else {
      alert("Nem támogatott egység.");
      return;
    }
  
    cart.push({ name: task.name, hour, count, cost });
    updateItemList();
    updateTotalCost();
  }
  
  // Kiválasztott tételek megjelenítése a kosárban
  function updateItemList() {
    const itemList = document.getElementById("itemList");
    itemList.innerHTML = ""; // Korábbi tételek törlése
  
    cart.forEach((item, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${item.name} - ${item.area ? `${item.area} óra` : ""} ${item.count ? `${item.count} db` : ""} = ${item.cost} HUF`;
  
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

  document.getElementById("bookingForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Megakadályozza az oldal újratöltését
    
    let massageType = document.getElementById("massageType").value;
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;
    
    alert(`Foglalás sikeres!\nMasszázs: ${massageType}\nDátum: ${date}\nIdőpont: ${time}`);
});

document.addEventListener("DOMContentLoaded", function() {
    const calendar = document.getElementById("calendar");
    const startTime = 8; // Reggel 8-tól
    const endTime = 20; // Este 20-ig

    let bookings = JSON.parse(localStorage.getItem("bookings")) || {}; // Tárolt foglalások

    // Időpontok létrehozása
    for (let hour = startTime; hour <= endTime; hour++) {
        let timeSlot = document.createElement("div");
        timeSlot.classList.add("day");
        timeSlot.innerText = `${hour}:00`;

        if (bookings[hour]) {
            timeSlot.classList.add("booked");
        }

        timeSlot.addEventListener("click", function () {
            if (bookings[hour]) return;

            bookings[hour] = true;
            localStorage.setItem("bookings", JSON.stringify(bookings));
            timeSlot.classList.add("booked");
            alert(`Foglalás sikeres: ${hour}:00`);
        });

        calendar.appendChild(timeSlot);
    }
});

