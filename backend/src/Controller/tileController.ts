import fs from "fs";
import { Request, Response } from "express";
import { Tile } from "../Model/tileModel";

export const getAllTiles = async (req: Request, res: Response) => {
	/**
	 * Get all tiles from database
	 * if no error ,send response with all tiles
	 * else send error
	 */
	try {
		const tiles = await Tile.find();
		res.status(200).json(tiles);
	} catch (error) {
		res.json({ message: error.message });
	}
};

export const createTile = async (req: Request, res: Response) => {
	/**
	 * check if there is a file and body in the request
	 * make a file path with the file name and server path
	 * if there is a file and body, create a new tile
	 * if no error, send response with the new tile
	 * else send error
	 */
	try {
		if (req.file && req.body) {
			const formData = req.body;
			let backendUrl = process.env.BACKEND_URL;
			if (process.env.NODE_ENV === "production") {
				backendUrl = process.env.PROD_BACKEND_URL;
			}
			const filePath = `${backendUrl}/${req.file.path}`;
			const tile = new Tile({
				category: formData.category,
				name: formData.name,
				src: filePath,
				points: formData.points,
				color: formData.color,
				textPosition: {
					x: formData.textPositionX,
					y: formData.textPositionY,
				},
			});
			const newTile = await tile.save();
			res.status(200).json(newTile);
		} else {
			res.status(400).json({ message: "Please fill in the required fields" });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const findTile = async (req: Request, res: Response) => {
	/**
	 * find a tile with the id
	 * if no error, send response with the tile
	 * else send error
	 */
	try {
		const tile = await Tile.findById(req.params.id);
		if (tile) {
			res.status(200).json(tile);
		} else {
			res.status(404).json({ message: "Tile not found" });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const updateTile = async (req: Request, res: Response) => {
	/**
	 * find a tile with the id
	 * if no error, check if there is a file or body in the request
	 * if theres a file or body, change the tile
	 * if no error, send response with the updated tile
	 * else send error
	 */
	try {
		const tile = await Tile.findById(req.params.id);
		if (tile) {
			let backendUrl = process.env.BACKEND_URL;
			if (process.env.NODE_ENV === "production") {
				backendUrl = process.env.PROD_BACKEND_URL;
			}
			tile.textPosition = req.body.textPosition
				? req.body.textPosition
				: tile.textPosition;
			tile.color = req.body.color ? req.body.color : tile.color;
			tile.points = req.body.points ? req.body.points : tile.points;
			tile.src = tile.name = req.body.name ? req.body.name : tile.name;
			tile.anchors = req.body.anchors ? req.body.anchors : tile.anchors;
			req.file != undefined ? `${backendUrl}/${req.file.path}` : tile.src;
			tile.category = req.body.category ? req.body.category : tile.category;
			const updatedTile = await tile.save();
			res.status(200).json(updatedTile);
		} else {
			res.status(404).json({ message: "Tile not found" });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const deleteTile = async (req: Request, res: Response) => {
	/**
	 * find a tile with the id and delete in from the database
	 * if no error, delete the file from the server
	 * if no error, send response with success message
	 * else send error
	 */
	try {
		const tile = await Tile.findByIdAndDelete(req.params.id);
		if (tile) {
			const src = tile.src.split("/");
			const fileName = src[src.length - 1];
			fs.unlink(`./uploads/${fileName}`, (err) => {
				if (err) {
					console.log(err);
					res
						.status(500)
						.json({ message: "There was an error on our side, sorry" });
				} else {
					res.status(200).json({ message: "Tile deleted" });
				}
			});
		} else {
			res.status(404).json({ message: "Tile not found" });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
