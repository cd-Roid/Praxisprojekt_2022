import { ASTType, Test } from "./../types/ast.types.d";

const getPythonLogicalOperator = (operatorString: string) => {
	//get python equivalent of logical Operator
	switch (operatorString) {
		case "||":
			return "or";
		case "&&":
			return "and";
		case "!==":
			return "not";
		default:
			return " ";
	}
};

const getPythonIdentityOperator = (operatorString: string) => {
	//get python equivalent of Identity Operator
	switch (operatorString) {
		case "===":
			return "is";
		case "!==":
			return "is not";
		default:
			return " ";
	}
};

const generatePyCode = (ast: ASTType) => {
	const body = ast.program.body;
	let pyCode = "";

	body.forEach((body) => {
		const left = body.test.left;
		const right = body.test.right;
		const operator = getPythonIdentityOperator(body.test.operator);
		const consequent = body.consequent;
		if (body.type === "IfStatement" && body.test.type === "BinaryExpression") {
			pyCode += `if ${left.name} ${operator} ${right.value}:`;
		}

		if (body.type === "IfStatement" && body.test.type === "LogicalExpression") {
			const logicalLeft = body.test.left as any;
			const logicalRight = body.test.right as any;
			const logicalOperator = getPythonLogicalOperator(body.test.operator);
			pyCode += `if ${logicalLeft.left.name} ${getPythonLogicalOperator(
				logicalLeft.operator,
			)} ${logicalLeft.right.value}  ${getPythonLogicalOperator(
				body.test.operator,
			)} ${logicalRight.left.name} ${getPythonLogicalOperator(
				logicalRight.operator,
			)} ${logicalRight.right.value} :`;
		}

		if (consequent.type === "BlockStatement") {
			consequent.body.forEach((expression) => {
				if (expression.type === "ExpressionStatement") {
					const callee = expression.expression.callee;
					const args = expression.expression.arguments;
					const argList = args.map((arg) => `"${arg.value}"`).join(", ");
					if (
						expression.type === "ExpressionStatement" &&
						expression.expression.type === "CallExpression"
					) {
						pyCode += `\n\t${callee.object.name}.${callee.property.name}(${argList})`;
					}
				}
			});
		}
	});

	return pyCode;
};

export default generatePyCode;
