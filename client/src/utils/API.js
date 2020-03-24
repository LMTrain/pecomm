import axios from "axios";

// const BASEURL = process.env.REACT_APP_BASEURL
// const APIKEY = process.env.REACT_APP_APIKEY

export default {
  //Search for an item to buy
  // search: function(query) {
    // return axios.get(BASEURL + query + APIKEY);
    // return axios.get('/api/walmart/'+ query);
    // return axios.get(BASEURL + APIKEY + query + "&format=json");
  // },
  
    // Gets all users
  getUsers: function() {
    return axios.get("/api/users");
  },
  // Gets the user with the given id
  getUser: function(currentAccount) {
    return axios.get(`/api/users/current/${currentAccount.userName}`);
  },
  // Update the user with the given id
  updateUser: function(id) {
    return axios.put("/api/users", id);
  },
  
  // CART DB UPDATE
  saveCart: function(cart) {    
    return axios.post("/api/cart/", cart);
  },
  
  // CART DB UPDATE
  saveOrder: function(order) {    
    return axios.post("/api/orders/", order);  
  },

  // SAVED ITEMS DB UPDATE
  SavedItems: function(savedItem) {   
    return axios.post("/api/saveditems/", savedItem);   
  },
  
  deleteUser: function(id) {    
    return axios.delete("/api/users/" + id);
  },
  // Saves a user to the database.
  saveUser: function(newAccount) {  
    return axios.post("/api/users", newAccount);
  },
  loginUser: function(userAccount) {
    return axios.post("/api/users/login", userAccount);
  }
};
