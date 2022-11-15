import util from "util";
import multer from "multer";

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
