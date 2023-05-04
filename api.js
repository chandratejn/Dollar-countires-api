const cardsContainer = document.getElementById('cards-container');
const modalOverlay = document.getElementById('modal-overlay');
const modal = document.getElementById('modal');
const modalCountryName = document.getElementById('modal-country-name');
const modalCapital = document.getElementById('modal-capital');
const modalCurrency = document.getElementById('modal-currency');
const modalFlag = document.getElementById('modal-flag');
const modalRegion = document.getElementById('modal-region');
const modalSubregion = document.getElementById('modal-subregion');
const modalPopulation = document.getElementById('modal-population');
const closeModal = document.getElementById('close-modal');

fetch('https://restcountries.com/v3.1/currency/dollar')
  .then(response => response.json())
  .then(data => {
     // Save the data to the countries array
     countries = data;
    // Loop through the array of countries and create a card for each one
    data.forEach(country => {
      const card = createCard(country);
      cardsContainer.appendChild(card);
    });
  })
  .catch(error => {
    console.error(error);
  });

function createCard(country) {
  // Create card container
  const card = document.createElement('div');
  card.classList.add('card');

  // Add event listener for clicking on card
  card.addEventListener('click', () => openModal(country));

  // Add country name
  const name = document.createElement('h2');
  name.innerText = country.name.common;
  card.appendChild(name);

  // Add capital
  
  const capital = document.createElement('p');
  capital.classList.add('capital'); // Add class name
  capital.innerText = `Capital: ${country.capital}`;
  card.appendChild(capital);

  // Add currency
  const currency = document.createElement('p');
  currency.classList.add('currency'); // Add class name
  const currencyCode = Object.keys(country.currencies)[0];
  const currencyValue = country.currencies[currencyCode].name;
  currency.innerText = `Currency: ${currencyCode}`;
  card.appendChild(currency);

  return card;
}

function openModal(country) {

  // Set modal content
  modalCountryName.innerText = country.name.common;
  modalCapital.innerText = `Capital: ${country.capital}`;
  // creating a currency tto add
  const currencyCode = Object.keys(country.currencies)[0];
  const currencyValue = country.currencies[currencyCode].name;
  modalCurrency.innerText = `Currency: ${currencyCode}`;
  modalFlag.src = country.flags.svg;
  modalFlag.alt = `${country.name.common} flag`;
  modalFlag.innerText = `Flag: ${country.flags.svg}`;
  modalRegion.innerText = `Region: ${country.region}`;
  modalSubregion.innerText = `Sub-region: ${country.subregion}`;
  modalPopulation.innerText = `Population: ${country.population}`;

  // Display modal overlay
  modalOverlay.style.display = 'block';




  // Add event listener for closing modal
  closeModal.addEventListener('click', () => closeModalWindow());
  modalOverlay.addEventListener('click', () => closeModalWindow());
  window.addEventListener('keyup', event => {
    if (event.key === 'Escape') {
      closeModalWindow();
    }
  });
}

function closeModalWindow() {
  // Hide modal overlay
  modalOverlay.style.display = 'none';

  // Remove event listener for closing modal
  closeModal.removeEventListener('click', () => closeModalWindow());
  modalOverlay.removeEventListener('click', () => closeModalWindow());
  window.removeEventListener('keyup', event => {
    if (event.key === 'Escape') {
      closeModalWindow();
    }
  });
}

// Search functionality
const searchInput = document.querySelector('#search-input');

const filterCards = (searchValue, cards) => {
  return cards.filter(card => {
    return (
      card.querySelector('h2').innerText.toLowerCase().includes(searchValue) ||
      card.querySelector('p.capital').innerText.toLowerCase().includes(searchValue) ||
      card.querySelector('p.currency').innerText.toLowerCase().includes(searchValue) 
    );
  });
};

// Search functionality

searchInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    const searchValue = searchInput.value.trim().toLowerCase();
    const cards = Array.from(document.querySelectorAll('.card'));
    const filteredCards = filterCards(searchValue, cards);
    if (filteredCards.length > 0) {
      // If no match found , to hide the back button
      backButton.style.display = 'block';

      // Hide all cards
      cards.forEach(card => {
        card.style.display = 'none';
      });
      // Display the matching cards
      filteredCards.forEach(card => {
        card.style.display = 'block';
      });
      // Show back button
      backButton.style.display = 'block';
    // } else if (searchValue.includes('dollar')) {
    //   alert('No country uses dollar currency');
    } else {
      // to hide back button
      backButton.style.display = 'none';

      alert('No matching Data found');
    }
    // Clear search input field 
    searchInput.value = '';
    event.preventDefault();
  }
});

// Back button functionality
const backButton = document.querySelector('#back-button');
backButton.addEventListener('click', event => {
  // Show all cards
  const cards = Array.from(document.querySelectorAll('.card'));
  cards.forEach(card => {
    card.style.display = 'block';
  });
  // Clear search input
  searchInput.value = '';
  // Hide back button
  backButton.style.display = 'none';
  
});

