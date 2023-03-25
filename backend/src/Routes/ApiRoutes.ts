import { Router } from "express";
import { uploadFiles } from "../middleware/upload";
import {
	generateJsCode,
	generatePythonCode,
} from "../Controller/astController";
import bodyParser from "body-parser";
import {
	findTile,
	getAllTiles,
	createTile,
	deleteTile,
	updateTile,
} from "../Controller/tileController";

/*
 * Api routes for the tiles
 * uses the upload middleware to upload files
 */

const router = Router();
const jsonParser = bodyParser.json();

router.get("/", getAllTiles);
router.get("/:id", findTile);
router.post("/", uploadFiles, createTile);
router.post("/ast/js", jsonParser, generateJsCode);
router.post("/ast/py", jsonParser, generatePythonCode);
router.put("/:id", uploadFiles, updateTile);
router.delete("/:id", deleteTile);

export default router;
