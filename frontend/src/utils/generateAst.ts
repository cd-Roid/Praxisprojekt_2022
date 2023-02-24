import { IfStatement, CallExpression, StringLiteral } from '../AstTypes';
enum Operator {
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

interface NodeType {
  id: string;
  anchorPosition: string;
  tileName: string | undefined;
  tileCategory: string | undefined;
}

interface ASTType {
  type: 'File';
  errors: [];
  program: {
    type: 'Program';
    body: IfStatement[];
  } | null;
}

export const generateAst = (
  fromNode: NodeType | undefined,
  toNode: NodeType | undefined,
  ast: ASTType | null,
  setAst: (ast: ASTType | null) => void,
) => {
  if (
    fromNode?.tileCategory === undefined ||
    fromNode.tileName === undefined ||
    toNode?.tileName === undefined ||
    toNode?.tileCategory === undefined
  )
    return;
  if (fromNode.tileCategory === 'Start' && fromNode.tileName === 'Wenn') {
    ast = {
      type: 'File',
      errors: [],
      program: {
        type: 'Program',
        body: [
          {
            type: 'IfStatement',
            test: null,
            consequent: {
              type: 'BlockStatement',
              body: null,
            },
          },
        ],
      },
    };
    setAst(ast);
  }
  if (
    toNode.tileCategory === 'Objekte' &&
    ast !== null &&
    ast.program?.body[0].type === 'IfStatement'
  ) {
    ast.program.body[0].test = {
      type: 'BinaryExpression',
      left: {
        type: 'MemberExpression',
        object: {
          type: 'Identifier',
          name: 'kontaktSensor',
        },
        property: {
          type: 'Identifier',
          name: 'state',
        },
      },
      right: null,
      operator: null,
    };
    setAst(ast);
  }
  if (
    toNode.tileCategory === 'Zustand' &&
    fromNode.tileCategory === 'Objekte' &&
    ast !== null &&
    ast.program?.body[0].type === 'IfStatement' &&
    ast.program?.body[0].test?.type === 'BinaryExpression'
  ) {
    ast.program.body[0].test.right = {
      type: 'StringLiteral',
      value: 'open',
    };
    ast.program.body[0].test.operator = Operator.equals;
    setAst(ast);
  }

  if (
    fromNode.tileCategory === 'Zustand' &&
    toNode.tileCategory === 'Konditionen' &&
    toNode.tileName === 'Dann' &&
    ast !== null &&
    ast.program?.body[0].type === 'IfStatement'
  ) {
    ast.program.body[0].consequent = {
      type: 'BlockStatement',
      body: [],
    };
    setAst(ast);
  }
  if (
    fromNode.tileCategory === 'Konditionen' &&
    fromNode.tileName === 'Dann' &&
    toNode.tileCategory === 'Objekte' &&
    ast !== null &&
    ast.program?.body[0].consequent.type === 'BlockStatement'
  ) {
    ast.program.body[0].consequent.body = [
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'CallExpression',
          callee: {
            type: 'MemberExpression',
            object: {
              type: 'Identifier',
              name: 'client',
            },
            property: {
              type: 'Identifier',
              name: 'publish',
            },
          },
          arguments: [
            {
              type: 'StringLiteral',
              value: 'speaker/speaker1/set',
            } as StringLiteral,
          ] as StringLiteral[],
        } as CallExpression,
      },
    ];
    setAst(ast);
  }

  if (
    fromNode.tileCategory === 'Objekte' &&
    toNode.tileCategory === 'Zustand' &&
    ast !== null &&
    ast.program?.body[0].consequent.body !== null &&
    ast.program?.body[0].consequent.type === 'BlockStatement' &&
    ast.program?.body[0].consequent.body.length !== 0 &&
    ast?.program?.body[0].consequent.body[0].expression.type === 'CallExpression' &&
    ast?.program?.body[0].consequent.body[0].expression.arguments.length !== 0
  ) {
    ast?.program?.body[0].consequent.body[0].expression.arguments.push({
      type: 'StringLiteral',
      value: 'on',
    } as any);

    setAst(ast);
  }

  if (fromNode.tileCategory === 'Zustand' && toNode.tileCategory === 'End') {
    // send ast to backend
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    (async () => {
      try {
        const response = await fetch(`${backendUrl}/ast`, {
          method: 'POST',
          body: JSON.stringify(ast, null, 2),
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        alert(error);
      }
    })();
  }
  console.log(JSON.stringify(ast, null, 2));
};
