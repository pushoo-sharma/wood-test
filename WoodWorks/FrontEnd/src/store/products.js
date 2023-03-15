export const CATEGORIES = {
  DOORS: "doors",
  HAND_RAILS: "handrails",
  DECK: "deck",
  BOUNDARY_WALL: "boundary Wall",
  FLOORING: "flooring"
}

export const PRODUCT_TYPES = {
  STEEL: "Steel",
  STEEL_GLASS: "Steel with Glass",
  WOOD: "Wood",
  WOOD_GLASS: "Wood with Glass",
  FIBER_GLASS: "Fiberglass",
  PRIMED: "Primed",
  SUSTAINED: "Sustained",
  UNFINISHED: "Unfinished",
}

export const CATEGORIES_DATA = {
  [CATEGORIES.DOORS]: {
    category_name: "Doors",
    products: [
      {
        type: PRODUCT_TYPES.STEEL,
        name: "Steel Doors",
        description: "",
        rating: 4,
        textures: ["smooth", "mahogany"],
        colors: ["#FFFFFF,#000000"],
      },
      {
        type: PRODUCT_TYPES.STEEL_GLASS,
        name: "Steel with Glass Doors",
        description: "",
        rating: 4,
        textures: ["smooth", "mahogany"],
        colors: ["#FFFFFF,#000000"]
      },
      {
        type: PRODUCT_TYPES.WOOD,
        name: "Wood Doors",
        description: "",
        rating: 4,
        textures: ["smooth", "mahogany"],
        colors: ["#FFFFFF,#000000"]
      },
      {
        type: PRODUCT_TYPES.WOOD_GLASS,
        name: "Wood with Glass Doors",
        description: "",
        rating: 4,
        textures: ["smooth", "mahogany"],
        colors: ["#FFFFFF,#000000"]
      },
      {
        type: PRODUCT_TYPES.FIBER_GLASS,
        name: "Fiberglass Doors",
        description: "",
        rating: 4,
        textures: ["smooth", "mahogany"],
        colors: ["#FFFFFF,#000000"]
      },
    ]
  },
  [CATEGORIES.HAND_RAILS]: {
    category_name: "Hand Rails",
    products: [
      {
        type: PRODUCT_TYPES.PRIMED,
        name: "Primed Hand Rails",
        description: "",
        rating: 4,
        textures: ["smooth", "mahogany"],
        colors: ["#FFFFFF,#000000"],
      },
      {
        type: PRODUCT_TYPES.SUSTAINED,
        name: "Sustained Hand Rails",
        description: "",
        rating: 4,
        textures: ["smooth", "mahogany"],
        colors: ["#FFFFFF,#000000"]
      },
      {
        type: PRODUCT_TYPES.UNFINISHED,
        name: "Unfinished Hand Rails",
        description: "",
        rating: 4,
        textures: ["smooth", "mahogany"],
        colors: ["#FFFFFF,#000000"]
      },
    ]
  },
  [CATEGORIES.DECK]: {
    category_name: "Decks",
    products: [
      {
        type: PRODUCT_TYPES.WOOD,
        name: "Wooden Decks",
        description: "",
        rating: 4,
        textures: ["smooth", "mahogany"],
        colors: ["#FFFFFF,#000000"],
      },
    ]
  }
}

// export let all_products = [...CATEGORIES_DATA.CA.products, ...CATEGORIES.HAND_RAILS.products, ...CATEGORIES.DECK.products];