const router = require("express").Router();

const cseController = require("../controllers/cseController");
// const { uploads } = require("../middlewares/cloudinary");

router.post("/createSubject", cseController.createSubjectController);
router.get("/getAllSubject", cseController.getAllSubjectController);
router.post("/createTopic", cseController.createTopicController);
router.get("/getTopics/:subject_id", cseController.getTopicController);
router.get("/getTopicLength", cseController.getLengthOfTopicController);
router.get("/getAllTopics", cseController.getAllTopics);
router.get("/findTopic/:id", cseController.findTopicController);
router.post("/createContent", cseController.createContentController);
router.get("/getContentLength", cseController.getContentLengthController);
router.get("/getContents/:topic_id" , cseController.getContentController);
router.get("/getAllContents" , cseController.getAllContents);

module.exports = router;
