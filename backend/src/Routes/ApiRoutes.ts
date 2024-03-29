import { Router } from "express";
import { uploadFiles } from "../middleware/upload";
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

router.get("/", getAllTiles);
router.get("/:id", findTile);
router.post("/", uploadFiles, createTile);
router.put("/:id", uploadFiles, updateTile);
router.delete("/:id", deleteTile);

export default router;
