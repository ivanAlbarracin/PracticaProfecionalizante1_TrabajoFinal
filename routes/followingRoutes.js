const express = require("express");
const router = express.Router();
const followingController = require("../controllers/followingController");
const auth = require("../middlewares/authmiddleware");

router.post("/follow", auth, followingController.follow);
router.get("/following", auth, followingController.listFollowing);
router.get("/followers", auth, followingController.listFollowers);
router.delete("/unfollow", auth, followingController.unfollow);
router.get("/mutual", auth, followingController.listMutualFollowing);

module.exports = router;
