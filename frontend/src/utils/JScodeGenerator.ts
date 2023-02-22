export enum Category {
  'Start',
  'Ende',
  'Objekte',
  'Konditionen',
  'Zustand',
}

export enum Operator {
  '===',
  '!==',
  '<',
  '>',
  '<=',
  '>=',
  'in',
  '!in',
  'ist leer',
  'ist nicht leer',
  'true',
  'false',
}

export interface MemberExpression {
  type: MemberExpression;
  object: string;
  property: {
    type: string | (() => void);
    value: string;
  };
}

export interface Literal {
  type: Literal;
  value: string;
}

export interface BinaryExpression {
  type: BinaryExpression;
  left: MemberExpression;
  right: MemberExpression | Literal;
  operator: Operator;
  consequent: {};
}
export interface IfStatement {
  type: IfStatement;
  test: BinaryExpression;
}
export interface Identifier {
  type: Identifier;
  name: string;
}

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
export interface ExpressionStatement {
  type: ExpressionStatement;
  expression: MemberExpression | BinaryExpression | CallExpression | IfStatement;
}

export interface BlockStatement {
  type: BlockStatement;
  body: ExpressionStatement[];
}
export interface AST {
  program: {
    type: Category.Start;
    body: {
      left: MemberExpression;
      right: MemberExpression;
      operator: Operator;
    };
    execute: {
      target: MemberExpression;
      change: MemberExpression;
    };
  }[];
}