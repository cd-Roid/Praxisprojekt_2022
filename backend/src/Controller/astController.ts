import generate from "@babel/generator";
import { Request, Response } from "express";
import { spawn } from "child_process";

export const generateJsCode = async (req: Request, res: Response) => {
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

export const generatePyCode = async (req: Request, res: Response) => {
	/**
	 * generate code from the ast
	 * if no error, send response with the generated code
	 * else send error
	 */

	try {
		let dataToSend = "";
		// spawn new child process to call the python script
		const python = spawn("python3", ["generatePythonCode.py", req.body]);
		// collect data from script
		python.stdin.write(req.body);
		python.stdin.end();

		python.stdout.on("data", function (data) {
			console.log("Pipe data from python script ...");
			dataToSend = data.toString();
		});
		// in close event we are sure that stream from child process is closed
		python.on("close", (code) => {
			console.log(`child process close all stdio with code ${code}`);
			// send data to browser
			res.send(dataToSend);
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};



