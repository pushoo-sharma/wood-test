const initialState = {
  supplierDetails: {
    name: "",
    phone: "",
    gst: "",
    email: ""
  },
  products: [
    {
      id: 1,
      name: "Wood",
      imgUrl: "",
      description: "This is a sample description for a product"
    },
    {
      id: 2,
      name: "Wood",
      imgUrl: "",
      description: "This is a sample description for a product"
    }
  ]
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default: return state;
  }
}

export default reducer;