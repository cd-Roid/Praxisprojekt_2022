import { Schema, model } from "mongoose";


//Schema for the Tile model
const TileSchema = new Schema({
	category: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	url: {
		type: String,
		required: true,
	},
});

export const Tile = model("Tile", TileSchema);
