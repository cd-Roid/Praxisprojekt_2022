import { Tile } from "../../Model/Api/TileModel";
import { Request, Response } from "express";
import fs from "fs";

export const getAllTiles = async (req: Request, res: Response) => {
	try {
		const tiles = await Tile.find();
		res.status(200).json(tiles);
	} catch (error) {
		res.json({ message: error.message });
	}
};

export const createTile = async (req: Request, res: Response) => {
	try {
		if (req.file && req.body) {
			const formData = req.body;
			const filePath = `localhost:${process.env.PORT}/${req.file.path}`;
			const tile = new Tile({
				category: formData.category,
				name: formData.name,
				url: filePath,
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
	try {
		const tile = await Tile.findByIdAndDelete(req.params.id);
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
	try {
		const tile = await Tile.findById(req.params.id);
		if (tile) {
			tile.category = req.body.category ? req.body.category : tile.category;
			tile.name = req.body.name ? req.body.name : tile.name;
			tile.url =
				req.file != undefined
					? `localhost:${process.env.PORT}/${req.file.path}`
					: tile.url;
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
	try {
		const tile = await Tile.findByIdAndDelete(req.params.id);
		// Delete the image from the server
		if (tile) {
			const url = tile.url.split("/");
			const fileName = url[url.length - 1];
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
