const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const auth = require("../middlewares/authmiddleware");


router.post("/create", auth, postController.create_post);
router.get("/listPost", auth, postController.list_post);
router.delete("/deletePost", auth, postController.delete_post);
router.put("/updatePost", auth, postController.update_post);
router.get("/onePost", auth, postController.onePost);
router.get("/userPost", auth, postController.userPost);

module.exports = router;