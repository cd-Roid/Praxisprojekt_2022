import { Schema, model } from "mongoose";
const textPositionSchema = new Schema({
	x: {
		type: Number,
		required: true,
	},
	y: {
		type: Number,
		required: true,
	},
});

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
	src: {
		type: String,
		required: true,
	},
	points: {
		type: [Number],
		required: true,
	},
	color: {
		type: String,
		required: true,
	},
	textPosition: textPositionSchema,
});

export const Tile = model("Tile", TileSchema);
