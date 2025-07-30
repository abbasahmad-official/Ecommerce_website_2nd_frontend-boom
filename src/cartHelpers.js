export const addItem = (item, next) => {
  let cart = [];

  if (typeof window !== "undefined") {
    // If cart exists in localStorage, get it
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    // Add item with count = 1 to the cart
    cart.push({ ...item, count: 1 });

    // Ensure no duplicates
    cart = Array.from(new Set(cart.map(p => p._id))).map(id => {
      return cart.find(p => p._id === id);
    });

    // Save updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    next(); // callback to refresh UI
  }
};


export const itemTotal = () => {
    if(typeof window !== "undefined"){
        if(localStorage.getItem("cart")){
        return JSON.parse(localStorage.getItem("cart")).length;
    }
}

return 0;
}

export const getCart = () => {
    if(typeof window !== "undefined"){
        if(localStorage.getItem("cart")){
        return JSON.parse(localStorage.getItem("cart"));
    }
}

return [];
}

export const updateItem = (productId, count) => {
  let cart = [];

  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.map((product, i) => {
      if (product._id == productId) {
        cart[i].count = count;
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const removeItem = (productId) => {
  let cart = [];

  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    // Filter out the item with the matching productId
    cart = cart.filter((product) => product._id !== productId);

    // Update localStorage with the updated cart
    localStorage.setItem("cart", JSON.stringify(cart));

    // Dispatch a custom event to notify any listeners that the cart has been updated
    window.dispatchEvent(new Event("cartUpdated"));
  }

  return cart;
};


export const emptyCart = () => {
    console.log("function is trigerd")
   if (typeof window !== "undefined" && localStorage) {
    try {
      // Remove cart from localStorage
      localStorage.removeItem("cart");
      console.log("Cart has been cleared from localStorage.");
    } catch (error) {
      console.error("Error clearing cart from localStorage:", error);
    }
  }
};


