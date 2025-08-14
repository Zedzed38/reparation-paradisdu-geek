// Script de calcul du prix de reprise pour Paradis du Geek

// Tableau des valeurs de base (déjà réduites de 50 € par rapport à la grille Apple). Les
// montants sont exprimés en euros et correspondent au maximum pour un appareil en
// parfait état. Ces valeurs proviennent de la grille de reprise Apple, publiée
// en mai 2025, moins une remise de 50 €【422933826965694†L240-L259】.
const buybackBasePrices = {
  "iPhone 13 Pro Max": 330,
  "iPhone 13 Pro": 260,
  "iPhone 13": 220,
  "iPhone 13 mini": 160,
  "iPhone 12 Pro Max": 250,
  "iPhone 12 Pro": 200,
  "iPhone 12": 150,
  "iPhone 12 mini": 80,
  "iPhone SE (2e génération)": 10,
  "iPhone 11 Pro Max": 150,
  "iPhone 11 Pro": 110,
  "iPhone 11": 100,
  "iPhone XS Max": 80,
  "iPhone XS": 45,
  "iPhone XR": 55,
  "iPhone X": 15,
  "iPhone 8 Plus": 15,
  "iPhone 8": 10
};

/**
 * Remplit le sélecteur de modèles avec les clés de buybackBasePrices.
 */
function populateModelSelect() {
  const modelSelect = document.getElementById('model-select');
  if (!modelSelect) return;
  // Vider tout contenu éventuel
  modelSelect.innerHTML = '';
  Object.keys(buybackBasePrices).forEach((model) => {
    const option = document.createElement('option');
    option.value = model;
    option.textContent = model;
    modelSelect.appendChild(option);
  });
}

/**
 * Calcule et affiche le prix de reprise en fonction du modèle et de l'état.
 */
function calculateBuyback() {
  const modelSelect = document.getElementById('model-select');
  const conditionSelect = document.getElementById('condition-select');
  const resultContainer = document.getElementById('buyback-result');
  if (!modelSelect || !conditionSelect || !resultContainer) return;
  const selectedModel = modelSelect.value;
  const conditionFactor = parseFloat(conditionSelect.value);
  const basePrice = buybackBasePrices[selectedModel];
  // Si le modèle n'existe pas dans la grille, on signale qu'il faut contacter
  if (basePrice === undefined) {
    resultContainer.textContent = "Veuillez nous contacter pour obtenir une estimation pour ce modèle.";
    return;
  }
  // Calcul du prix ajusté
  const price = Math.round(basePrice * conditionFactor);
  // Formatage en euros
  const formattedPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
  resultContainer.textContent = `Estimation de reprise : ${formattedPrice}`;
}

// Initialisation après chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
  populateModelSelect();
  const calculateBtn = document.getElementById('calculate-btn');
  if (calculateBtn) {
    calculateBtn.addEventListener('click', calculateBuyback);
  }
});