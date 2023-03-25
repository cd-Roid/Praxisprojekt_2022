import generate from "@babel/generator";
import generatePyCode from "../../utils/generatePyCode";
import { Request, Response } from "express";

export const generateJsCode = async (req: Request, res: Response) => {
	/**
	 * generate code from the ast
	 * if no error, send response with the generated code
	 * else send error
	 */
	try {
		const generated = await generate(req.body);
		res.status(200).json({ code: generated.code });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const generatePythonCode = async (req: Request, res: Response) => {
	/**
	 * generate code from the ast
	 * if no error, send response with the generated code
	 * else send error
	 */
	const generated = generatePyCode(req.body);
	try {
		console.log(req.body);
		res.status(500).json({ code: generated });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};



