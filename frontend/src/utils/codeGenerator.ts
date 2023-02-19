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

export interface Token {
  id: string;
  type: string;
  value: string;
}

export interface AST {
  program: {
    type: Category.Start;
    body: {
      left: Token;
      right: Token;
      operator: Operator;
    }[];
    execute: {
      target: Token;
      change: Token;
    };
  };
}
