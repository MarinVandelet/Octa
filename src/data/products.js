export const categories = [
  { id: "all", name: "Tout" },
  { id: "hoodies", name: "Hoodies" },
  { id: "tshirts", name: "T-Shirts" },
  { id: "pants", name: "Pants" },
  { id: "jackets", name: "Jackets" },
  { id: "accessories", name: "Accessories" },
];

const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

export const products = [
  {
    id: "octa-hoodie-01",
    name: "Octa Hoodie Void",
    category: "hoodies",
    price: 89,
    description: "Hoodie premium, coupe boxy, finitions lourdes.",
    images: [
      asset("images/hoodie-void-1.jpg"),
      asset("images/hoodie-void-2.jpg"),
      asset("images/hoodie-void-3.jpg"),
    ],
    model3d: null,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Noir", "Gris"],
  },
  {
    id: "octa-tee-01",
    name: "Octa Tee Core",
    category: "tshirts",
    price: 49,
    description: "T-shirt coton lourd, col premium, coupe droite.",
    images: [
      asset("images/tee-core-1.jpg"),
      asset("images/tee-core-2.jpg"),
      asset("images/tee-core-3.jpg"),
    ],
    model3d: null,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Blanc", "Noir"],
  },
  {
    id: "octa-jacket-01",
    name: "Octa Jacket Flux",
    category: "jackets",
    price: 129,
    description: "Veste legere, look techwear, details minimal.",
    images: [
      asset("images/jacket-flux-1.jpg"),
      asset("images/jacket-flux-2.jpg"),
    ],
    model3d: null,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Noir"],
  },
  {
    id: "octa-pants-01",
    name: "Octa Pants Shadow",
    category: "pants",
    price: 79,
    description: "Pantalon coupe relax, tissu dense et confortable.",
    images: [
      asset("images/pants-shadow-1.jpg"),
      asset("images/pants-shadow-2.jpg"),
    ],
    model3d: null,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Noir", "Anthracite"],
  },
  {
    id: "octa-accessory-01",
    name: "Octa Cap Signal",
    category: "accessories",
    price: 35,
    description: "Casquette minimaliste, logo brode, visiere courbe.",
    images: [
      asset("images/cap-signal-1.jpg"),
      asset("images/cap-signal-2.jpg"),
    ],
    model3d: null,
    sizes: ["Unique"],
    colors: ["Noir"],
  },
  {
    id: "octa-hoodie-02",
    name: "Octa Hoodie Noctis",
    category: "hoodies",
    price: 95,
    description: "Hoodie epais, volume oversize et finitions premium.",
    images: [
      asset("images/hoodie-noctis-1.jpg"),
      asset("images/hoodie-noctis-2.jpg"),
    ],
    model3d: null,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Gris", "Noir"],
  },
];
