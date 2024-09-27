export type ASTType = {
	type: string;
	errors: any[];
	program: Program;
};

export type Program = {
	type: string;
	body: Body[];
};

export type Body = {
	type: string;
	test: Test;
	consequent: Consequent;
};

export type Test = {
	type: string;
	left: Left;
	right: Right;
	operator: string;
};

export type Left = {
	type: string;
	name: string;
};

export type Right = {
	type: string;
	value: string;
};

export type Consequent = {
	type: string;
	body: ConsequentBody[];
};

export type ConsequentBody = {
	type: string;
	expression: Expression;
};

export type Expression = {
	type: string;
	callee: Callee;
	arguments: Argument[];
};

export type Callee = {
	type: string;
	object: Object;
	property: Property;
};

export type Object = {
	type: string;
	name: string;
};

export type Property = {
	type: string;
	name: string;
};

export type Argument = {
	type: string;
	value: string;
};
