// Fetch the items from the JSON file
function loadItems() {
  return fetch('data/data.json')
  .then(response => response.json())
  .then(json => json.items);
}


function displayItems(items) {
  const container = document.querySelector('.items');
  const html = items.map(item => createHTMLString(item));
  container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

function createHTMLString(item) {
  return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item__thumbnail" />
        <span class="item__description">${item.gender}, ${item.size}</span>
    </li>
    `;
}

// main
loadItems() 
  .then(items => {
    console.log(items);
    displayItems(items);
    //setEventListners(items)
  })
  .catch(console.log)