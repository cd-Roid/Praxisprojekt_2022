/**
 * This file contains the AST for the JS code generator
 * The AST is based on the ESTree standard
 * Basic building blocks are:
 * Program
 * Literals
 * Identifiers
 * Expression Statements
 * Statements
 *
 * These should be used to create an AST for the generator like Babel can
 * use to create a JS file
 */

/**
 * Operators used for BinaryExpressions
 */
export enum Operator {
  '===',
  '!==',
  '<',
  '>',
  '<=',
  '>=',
  '&&',
  '||',
  'true',
  'false',
}
/**
 * Program
 * The Startnode of the AST
 * */

export interface Program {
  type: Program;
  body: IfStatement[];
  sourceType: 'module';
}

/**
 * Literals
 * all types of strings, numbers, booleans
 */
export interface Literal {
  type: Literal;
  value: string;
}

/**
 * Identifiers
 * all types of variables, functions, classes
 */
export interface Identifier {
  type: Identifier;
  name: string;
}

/**
 * Expression Statements
 *  basic expressions
 */

// MemeberExpression can be used for objects and its properties
export interface MemberExpression {
  type: MemberExpression;
  object: string;
  property: {
    type: string | (() => void);
    value: string;
  };
}

// BinaryExpression can be used for if statements
export interface BinaryExpression {
  type: BinaryExpression;
  left: MemberExpression;
  right: MemberExpression | Literal;
  operator: Operator;
  consequent: {
    type: BlockStatement;
    body: ExpressionStatement[];
  };
}
/**
 * CallExpression can be used for functions.
 * They also can take in other functions or Expressions as arguments
 **/
export interface CallExpression {
  type: CallExpression;
  callee: MemberExpression;
  object: Identifier;
  property: Identifier;
  arguments:
    | MemberExpression[]
    | Literal
    | BinaryExpression
    | IfStatement
    | CallExpression
    | Identifier
    | (() => void);
}

/**
 * Statements
 */

/**
 * IfStatement can be used for if statements
 * Since most of the proccesses can be convered by if statements,
 * we wont be needing other types of statements at first
 * */
export interface IfStatement {
  type: IfStatement;
  test: BinaryExpression;
}

export interface ExpressionStatement {
  type: ExpressionStatement;
  expression: MemberExpression | BinaryExpression | CallExpression | IfStatement;
}
/**
 * Blockstatement are the body of a program
 * or the body of a function
 */
export interface BlockStatement {
  type: BlockStatement;
  body: ExpressionStatement[];
}
