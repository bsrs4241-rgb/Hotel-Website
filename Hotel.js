let user = {};
let foodType = "";

// LOCATION-WISE RATES
const rates = {
    hyderabad: {
        room: { AC: {2:1500,3:1700,4:2000}, "NON AC": {2:1000,3:1300,4:1900} },
        food: { veg:300, nonveg:400 }
    },
    chennai: {
        room: { AC: {2:1600,3:1800,4:2100}, "NON AC": {2:1100,3:1400,4:1950} },
        food: { veg:320, nonveg:420 }
    },
    bangalore: {
        room: { AC: {2:1700,3:1900,4:2200}, "NON AC": {2:1200,3:1500,4:2000} },
        food: { veg:350, nonveg:450 }
    },
    ongole: {
        room: { AC: {2:1200,3:1400,4:1700}, "NON AC": {2:800,3:1000,4:1300} },
        food: { veg:200, nonveg:300 }
    }
};

// DISABLE PAST DATES
window.onload = () => {
    let today = new Date().toISOString().split("T")[0];
    fromDate.min = today;
    toDate.min = today;
};

// PAGE 1 → PAGE 2
function goToPage2() {
    let name = nameInput();
    let phone = phoneInput();
    let location = document.getElementById("location").value;
    let aadhar = document.getElementById("aadhar").value.trim();

    if (!location) return alert("Please select location");
    if (phone.length !== 10) return alert("Invalid phone");
    if (aadhar.length !== 12) return alert("Invalid Aadhaar");

    user = { name, phone, location, aadhar };

    document.getElementById("page1").classList.add("hidden");
    document.getElementById("page2").classList.remove("hidden");

    showRates();
}

function nameInput() {
    return document.getElementById("name").value.trim();
}
function phoneInput() {
    return document.getElementById("phone").value.trim();
}

// SHOW RATES
function showRates() {
    let city = document.getElementById("location").value;
    let r = rates[city];
    document.getElementById("rateTable").innerHTML = `
        <table>
            <tr><th>Room</th><th>2</th><th>3</th><th>4</th></tr>
            <tr><td>AC</td><td>₹${r.room.AC[2]}</td><td>₹${r.room.AC[3]}</td><td>₹${r.room.AC[4]}</td></tr>
            <tr><td>NON-AC</td><td>₹${r.room["NON AC"][2]}</td><td>₹${r.room["NON AC"][3]}</td><td>₹${r.room["NON AC"][4]}</td></tr>
        </table>
        <br>Veg: ₹${r.food.veg} | Non-Veg: ₹${r.food.nonveg}
    `;
}

function setFood(type) {
    foodType = type;
    alert("Food selected: " + type);
}

// DATE DIFFERENCE
function calculateDays() {
    let start = new Date(fromDate.value);
    let end = new Date(toDate.value);
    if (end <= start) return alert("Invalid dates");
    days.value = (end - start) / (1000*60*60*24);
}

// BILL
function calculateBill() {
    let members = document.querySelector("input[name='members']:checked")?.value;
    let rtype = document.querySelector("input[name='rtype']:checked")?.value;
    let d = days.value;

    if (!members || !rtype || !foodType || !d) return alert("Fill all fields");

    let r = rates[user.location];
    let total = (r.room[rtype][members] * d) +
                (r.food[foodType] * members * d);

    document.getElementById("page2").classList.add("hidden");
    document.getElementById("page3").classList.remove("hidden");

    bill.innerHTML = `
        Name: ${user.name}<br>
        Location: ${user.location}<br>
        Total Amount: ₹${total}
    `;
}
