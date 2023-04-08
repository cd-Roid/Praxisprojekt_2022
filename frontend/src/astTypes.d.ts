/**
 * This file contains the AST for the JS code generator
 * The AST is based on the ESTree standard
 * Basic building blocks are:
 * Program
 * StringLiterals
 * Identifiers
 * Expression Statements
 * Statements
 *
 * These should be used to create an AST for the generator like Babel can
 * use to create a JS file
 */

/**
 * Operators used for LogicalExpressions
 */
export interface ASTType {
  type: 'File';
  errors: [];
  program: {
    type: 'Program';
    body: IfStatement[];
  };
}

export enum Operator {
  equals = '===',
  unequals = '!==',
  lessThan = '<',
  greaterThan = '>',
  lessOrEquals = '<=',
  greaterOrEquals = '>=',
  and = '&&',
  or = '||',
  true = 'true',
  false = 'false',
}
/**
 * Program
 * The Startnode of the AST
 * */

export interface Program {
  type: 'Program';
  body: IfStatement[];
  sourceType: 'module';
}

/**
 * StringLiterals
 * all types of strings, numbers, booleans
 */
export interface StringLiteral {
  type: 'StringLiteral';
  value: string;
}

/**
 * Identifiers
 * all types of variables, functions, classes
 */
export interface Identifier {
  type: 'Identifier';
  name: string;
}
export interface NumericLiteral {
  type: 'NumericLiteral';
  name: number;
}
/**
 * Expression Statements
 *  basic expressions
 */

// MemeberExpression can be used for objects and its properties
export interface MemberExpression {
  type: 'MemberExpression';
  object: Identifier;
  property: Identifier;
}
export interface BinaryExpression {
  type: 'BinaryExpression';
  left: MemberExpression | Identifier | StringLiteral | null;
  right: MemberExpression | Identifier | StringLiteral | NumericLiteral | null;
  operator: Operator | null;
}

// LogicalExpression can be used for if statements
export interface LogicalExpression {
  type: 'LogicalExpression';
  left: BinaryExpression | MemberExpression | StringLiteral | null;
  right: BinaryExpression | MemberExpression | StringLiteral | null;
  operator: Operator;
}
/**
 * CallExpression can be used for functions.
 * They also can take in other functions or Expressions as arguments
 **/
export interface CallExpression {
  type: 'CallExpression';
  callee: MemberExpression;
  object: Identifier;
  property: Identifier;
  arguments:
    | MemberExpression[]
    | StringLiteral[]
    | LogicalExpression[]
    | IfStatement[]
    | Identifier[];
}

/**
 * Statements
 */

/**
 * IfStatement can be used for if statements
 * Since most of the proccesses can be convered by if statements,
 * we wont be needing other types of statements at first
 * */
export interface ExpressionStatement {
  type: 'ExpressionStatement';
  expression:
    | MemberExpression
    | BinaryExpression
    | LogicalExpression
    | CallExpression
    | IfStatement;
}

export interface IfStatement {
  type: 'IfStatement';
  test: BinaryExpression | LogicalExpression;
  consequent: {
    type: 'BlockStatement';
    body: ExpressionStatement[];
  };
}

/**
 * Blockstatement are the body of a program
 * or the body of a function
 */
export interface BlockStatement {
  type: 'BlockStatement';
  body: ExpressionStatement[];
}
