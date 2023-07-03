const gerichte = [
    {
        "bild": "./img/burger.jpg",
        "bezeichnung": 'Hamburger',
        "preis" : 3.50,
        "stueck" : 1
    },
    {
        "bild": "./img/cheeseburger.jpg",
        "bezeichnung": 'Cheeseburger',
        "preis" : 4.00,
        "stueck" : 1
    },
    {
        "bild": "./img/pommes.jpg",
        "bezeichnung": 'Pommes',
        "preis" : 2.50,
        "stueck" : 1
    },
    {
        "bild": "./img/cola.jpg",
        "bezeichnung": 'Cola',
        "preis" : 2.00,
        "stueck" : 1
    },
    {
        "bild": "./img/fanta.jpg",
        "bezeichnung": 'Fanta',
        "preis" : 2.00,
        "stueck" : 1
    },
    {
        "bild": "./img/sprite.jpg",
        "bezeichnung": 'Sprite',
        "preis" : 2.00,
        "stueck" : 1
    },
    {
        "bild": "./img/wasser.jpg",
        "bezeichnung": 'Wasser',
        "preis" : 1.50,
        "stueck" : 1
    },
    {
        "bild": "./img/kaffee.jpg",
        "bezeichnung": 'Kaffee',
        "preis" : 2.00,
        "stueck" : 1
    }
]


let basketArray = [];

const einzehlPreis = gerichte.map(gericht => gericht.preis);

function render() {
    let content = document.getElementById('content');
    content.innerHTML = "";
    for (let i = 0; i < gerichte.length; i++) {
      content.innerHTML += generateCardHTML(i);
    }
    setTotal();
    renderLeererWarenkorb();
}
  

function generateCardHTML(i) {
    return /*html*/ `
      <div id="bgImg" class="card">
        <img src="${gerichte[i].bild}">
        <div class="cardBody">
          <div class="bezeichnung">${gerichte[i].bezeichnung}</div>
          <div class="preis">${gerichte[i].preis.toFixed(2)}€</div>
          <button onclick="getProdukt(${i})">+</button>
        </div>
      </div>`;
}

  
function renderBasket() {
    const Basket = document.getElementById('box');
    Basket.innerHTML = "";
  
    if (basketArray.length !== 0) {
        renderTable(Basket);
        renderGesamt(Basket);
        renderBezahlenButton(Basket);
    } else {
        renderLeererWarenkorb();
    }
}

function renderBasketModal() {
    const modal = document.getElementById('modal');
    modal.classList.toggle('none', basketArray.length === 0);
    
    modal.innerHTML = closeModalHTML();
    renderTable(modal);
    renderGesamt(modal);
    renderBezahlenButton(modal);
    amount();
}

  
function generateTableHTML() {
    let tableHTML = /*html*/ `<table>
        <tr>
          <th>Stückzahl</th>
          <th>Produkt</th>
          <th>Preis</th>
          <th></th>
          <th></th>
        </tr>`;
  
    basketArray.forEach((item, i) => {
      tableHTML += /*html*/ `
        <tr>
          <td>${item.stueck}</td>
          <td>${item.bezeichnung}</td>
          <td>${item.preis.toFixed(2)}€</td>
            <td><button onclick="addProdukt(${i})">+</button></td>
          <td><button onclick="removeProdukt(${i})">-</button></td>
        </tr>`;
    });
  
    tableHTML += `</table>`;
    return tableHTML;
}

  
function pay() {
    const payAlert = document.getElementById('payAlert');
    const modal = document.getElementById('modal');
    modal.classList.add('none');
    payAlert.classList.remove('none');
    setTimeout(() => {
      payAlert.classList.add('none');
    }, 2000);
    gerichte.forEach((item) => {
        item.preis = item.preis / item.stueck;
        item.stueck = 1;
    });
    basketArray = [];
    renderBasket();
    renderBasketModal();
    setTotal();
}


function addProdukt(i) {
    basketArray[i].stueck++;
    for (let j = 0; j < gerichte.length; j++) {
        if (gerichte[j].bezeichnung === basketArray[i].bezeichnung) {
            gerichte[j].preis += einzehlPreis[j];
        }
    }
    if (!modal.classList.contains("none")) {
        renderBasketModal();
      }
    renderBasket();
    setTotal();
    amount();
}


function getProdukt(i) {
    let preis = gerichte[i].preis;
    if(basketArray.includes(gerichte[i])) {
        gerichte[i].stueck++;
        gerichte[i].preis += einzehlPreis[i];
    } else {
        basketArray.push(gerichte[i]);
    }
    if (!modal.classList.contains("none")) {
        renderBasketModal();
      }
    renderBasket();
    setTotal();
    amount();
}


function removeProdukt(i) {
  const modal = document.getElementById('modal');
    if (basketArray[i].stueck > 1) {
    basketArray[i].stueck--;
        for (let j = 0; j < gerichte.length; j++) {
                if (gerichte[j].bezeichnung === basketArray[i].bezeichnung) {
                    gerichte[j].preis -= einzehlPreis[j];
                }
            }
        renderBasket();
    } else {
    basketArray.splice(i, 1);
    renderBasket();
    }
    if (!modal.classList.contains("none")) {
      renderBasketModal();
    }
    setTotal();
}


function setTotal() {
  if (!basketArray) {
    const gesamt = document.getElementById('gesamt');
    const summe = basketArray.reduce((total, item) => total + item.preis, 0);
    gesamt.innerHTML = "Gesamt Betrag: " + summe + "€";
  }
}


function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.add('none');
}


function closeModalHTML() {
    let close = /*html*/ `<div class="close" onclick="closeModal()">&times;</div>`;
    return close;
}

function renderTable(modal) {
    const tableHTML = generateTableHTML();
    modal.innerHTML += tableHTML;
}


function renderGesamt(modal) {
    const gesamtHTML = generateGesamtHTML();
    modal.innerHTML += gesamtHTML;
}


function generateGesamtHTML() {
    const gesamtBetrag = basketArray.reduce((total, item) => total + item.preis, 0);
    return /*html*/ `<div id="gesamt">Gesamt Betrag: ${gesamtBetrag.toFixed(2)}€</div>`;
}

  
function amount() {
    let anzahl = document.getElementById('zaehler');
    anzahl.innerHTML = basketArray.length;
}


function renderTable(Basket) {
    const tableHTML = generateTableHTML();
    Basket.innerHTML += tableHTML;
}


function renderGesamt(Basket) {
    const gesamtHTML = generateGesamtHTML();
    Basket.innerHTML += gesamtHTML;
}
  
function renderBezahlenButton(target, includeCloseButton = false) {
    const bezahlenButtonHTML = /*html*/ `<button onclick="pay()" class="BasketButton">Bezahlen</button>`;
    const closeButtonHTML = includeCloseButton ? closeModalHTML() : '';
    target.innerHTML += bezahlenButtonHTML + closeButtonHTML;
  }
  

function renderLeererWarenkorb() {
    const Basket = document.getElementById('box');
    Basket.innerHTML = /*html*/ `<p>Der Warenkorb ist leer</p>`;
}
