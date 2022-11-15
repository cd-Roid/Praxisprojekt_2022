import multer from "multer";

/**
 * multer upload middleware
 * multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
 * used here to upload images
 * its used in the createTile and updateTile routes
 * destination is the path where the file will be saved
 * filename is the name of the file. it takes te original name of the file and adds a timestamp to it
 * fileFilter is a function that checks if the file is a png
 * if the file is not a png, it will throw an error
 * if the file is a png, it will continue
 * it also limits the file size to 2MB and 1024x1024 pixels
 * only accepts single Files
 */
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/");
	},
	filename: function (req, file, cb) {
		let ext = file.originalname.split(".").pop();
		cb(null, Date.now() + "." + ext);
	},
});

export const uploadFiles = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		if (file.mimetype === "image/png") {
			cb(null, true);
		} else {
			console.log(`File type ${file.mimetype} not supported`);
			cb(null, false);
		}
	},
	limits: {
		fileSize: 1024 * 1024 * 2,
	},
}).single("file");
