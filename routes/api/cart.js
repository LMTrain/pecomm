const router = require("express").Router();
const cartController = require("../../controllers/cartController");


  // Matches with "/api/users/:id"
  router
  .route("/")
  .get(cartController.findAll)
  .post(cartController.create)

  router
  .route("/:id")
  .get(cartController.findById) 
  .delete(cartController.remove);

  // router
  // .route("/:id", )  
  // .put(cartController.update) 
  
  

module.exports = router;
