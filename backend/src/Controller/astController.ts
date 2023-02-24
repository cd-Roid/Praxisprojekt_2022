import generate from "@babel/generator";
import { Request, Response } from "express";
export const generateCode = async (req: Request, res: Response) => {
	/**
	 * generate code from the ast
	 * if no error, send response with the generated code
	 * else send error
	 */
	try {
		console.log(req.body);
		const generated = await generate(req.body);
		res.status(200).json({ code: generated.code });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
