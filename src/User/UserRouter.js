import {Router} from "express";
import controllers from "./UserController.js";
const router = Router();

router.route("/")
.get(controllers.getAll)
.post(controllers.createOne);

router.route("/:id")
.get(controllers.getOne)
.patch(controllers.updateOne)
.delete(controllers.removeOne);

export default router;
