// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getDatabase, ref, set, push, update, remove, get } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAH8Z5oudMPqIIr7AfFYTQTQzi_624cD5Q",
    authDomain: "skolekantine-9cb28.firebaseapp.com",
    projectId: "skolekantine-9cb28",
    storageBucket: "skolekantine-9cb28.firebasestorage.app",
    messagingSenderId: "491530190578",
    appId: "1:491530190578:web:f83e7ec1e072a611719a6b"
};

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const loginBtn = document.getElementById("login");
const epost = document.getElementById("epost");
const passord = document.getElementById("passord");

// Wait until DOM is ready so we don't read missing elements
document.addEventListener("DOMContentLoaded", () => {
  const insertInput = document.getElementById("INSERT");
  const insertIdInput = document.getElementById("insertId");
  const kostnadInput = document.getElementById("kostnad");
  const insertBtn = document.getElementById("insertBtn");

  const removeInput = document.getElementById("REMOVE");
  const removeBtn = document.getElementById("removeBtn");

  const updateInput = document.getElementById("UPDATE");
  const updateBtn = document.getElementById("updateBtn");

  const produktGrid = document.getElementById("produkt-grid");

  // Insert: if an id is provided we set it, otherwise push a new child
  function InsertData(name, price, id) {
    if (!name) return Promise.reject(new Error("Missing name"));
    const data = { VareNavn: name, Kostnad: Number(price) || 0 };
    if (id) {
      return set(ref(db, `Varer/${id}`), data);
    }
    return push(ref(db, "Varer"), data);
  }

  function RemoveData(id) {
    if (!id) return Promise.reject(new Error("Missing id"));
    return remove(ref(db, `Varer/${id}`));
  }

  function UpdateData(id, newName, newPrice) {
    if (!id) return Promise.reject(new Error("Missing id for update"));
    const updates = {};
    if (newName) updates.VareNavn = newName;
    if (newPrice !== undefined && newPrice !== "") updates.Kostnad = Number(newPrice);
    return update(ref(db, `Varer/${id}`), updates);
  }

  function renderVarer() {
    if (!produktGrid) return;
    produktGrid.innerHTML = "";
    get(ref(db, "Varer"))
      .then((snapshot) => {
        if (!snapshot.exists()) {
          produktGrid.textContent = "Ingen varer funnet.";
          return;
        }
        const data = snapshot.val();
        for (const key in data) {
          if (!data.hasOwnProperty(key)) continue;
          const v = data[key];
          const produkt = document.createElement("article");
          produkt.className = "produkt";
          produkt.innerHTML = `\
            <div class="accent"></div>\
            <h3>${v.VareNavn}</h3>\
            <p class="pris">${v.Kostnad} kr</p>
          `;
          produktGrid.appendChild(produkt);
        }
      })
      .catch((err) => console.error("Hent varer feilet:", err));
  }

  if (insertBtn) {
    insertBtn.addEventListener("click", () => {
      const name = insertInput?.value?.trim();
      const price = kostnadInput?.value;
      const id = insertIdInput?.value;
      InsertData(name, price, id)
        .then(() => {
          if (insertInput) insertInput.value = "";
          if (kostnadInput) kostnadInput.value = "";
          if (insertIdInput) insertIdInput.value = "";
          renderVarer();
          insertInput.value = "";
          kostnadInput.value = "";
          insertIdInput.value = "";
        })
        .catch((err) => console.error("Insert feilet:", err));
        
    });
  }

  if (removeBtn) {
    removeBtn.addEventListener("click", () => {
      const id = removeInput?.value;
      RemoveData(id)
        .then(() => {
          if (removeInput) removeInput.value = "";
          renderVarer();
        })
        .catch((err) => console.error("Remove feilet:", err));
    });
  }

  if (updateBtn) {
    updateBtn.addEventListener("click", () => {
      // Expect input like: id,newName,newPrice
      const raw = updateInput?.value;
      if (!raw) return;
      const [id, newName, newPrice] = raw.split(",").map((s) => s.trim());
      UpdateData(id, newName, newPrice)
        .then(() => {
          if (updateInput) updateInput.value = "";
          renderVarer();
        })
        .catch((err) => console.error("Update feilet:", err));
    });
  }

  // Initial render
  renderVarer();
});
loginBtn.addEventListener("click", () => {
  console.log("inn");
  const epostValue = epost.value;
  const passordValue = passord.value;
  if (epostValue === "simenhei@afk.no" && passordValue === "admin") {
    location.href = "database.html";
    console.log("riktig");
  } else {
    alert("Feil epost eller passord.");
  }
});