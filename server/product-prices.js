// Product price data shared between frontend and backend
// Prices in paise (₹ * 100)

export const PRODUCT_PRICES = {
  // Premium Nutrition Shakes
  "premium-strawberry": 209000,
  "premium-rasmalai": 214000,
  "premium-vanilla": 209000,
  "premium-mango": 209000,
  "premium-kesar": 209000,
  "premium-chocolate": 209000,

  // Targeted Nutrition
  "calcium-pro": 122200,
  "male-support": 204000,
  "women-support": 210000,
  "liver-health": 270000,
  "joint-health": 235000,
  "omega-3": 255000,
  "multivitamin": 198000,
  "garcinia": 198000,
  "skin-booster": 249900,

  // Energy & Fitness
  "energy-kashmiri": 79000,
  "energy-tulsimint": 89000,
  "energy-peach": 79000,
  "energy-ginger": 79000,
  "energy-elaichi": 79000,
  "energy-lemon": 79000,

  // Kids Nutrition
  "kids-nutrition": 109000,

  // Milk Powder
  "milk-powder": 73000,

  // Accessories (no price listed)
  "accessory-bag": null,
  "accessory-mug": null,
  "accessory-diary": null,
  "accessory-tablet-box": null,
  "accessory-shaker-cup": null,
};

export function getProductPrice(productId) {
  return PRODUCT_PRICES[productId] ?? null;
}

export function validateProductPrice(productId, frontendPricePaise) {
  const serverPrice = getProductPrice(productId);
  if (serverPrice === null) return { valid: true, serverPrice: null }; // Accessories
  return { valid: serverPrice === frontendPricePaise, serverPrice };
}