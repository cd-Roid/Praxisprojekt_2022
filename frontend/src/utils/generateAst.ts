import { CallExpression, Identifier, IfStatement, ExpressionStatement } from './../AstTypes.d';
import { ASTType } from '../AstTypes';

interface NodeType {
  id: string;
  anchorPosition: string;
  tileName: string | undefined;
  tileCategory: string | undefined;
  astNode: any;
}

export const generateAst = (
  fromNode: NodeType | undefined,
  toNode: NodeType | undefined,
  ast: ASTType | null,
  setAst: (ast: ASTType | null) => void,
  generatedCode?: { js: string; py: string },
  setGeneratedCode?: (value: { js: string; py: string }) => void,
) => {
  if (
    fromNode?.tileCategory === undefined ||
    fromNode.tileName === undefined ||
    toNode?.tileName === undefined ||
    toNode?.tileCategory === undefined
  )
    return;
  if (fromNode.tileCategory === 'Start' && toNode.tileCategory === 'Objekte' && ast === null) {
    const startNode = fromNode.astNode.javaScript as IfStatement;
    startNode.test.left = toNode.astNode.javaScript as Identifier;
    setAst({
      type: 'File',
      errors: [],
      program: {
        type: 'Program',
        body: [startNode],
      },
    });
  }
  if (
    toNode.tileCategory === 'Zustand' &&
    fromNode.tileCategory === 'Objekte' &&
    ast !== null &&
    ast.program?.body[0].type === 'IfStatement' &&
    ast.program?.body[0].test?.type === 'BinaryExpression'
  ) {
    ast.program.body[0].test.right = toNode.astNode.javaScript as Identifier;
    setAst(ast);
  }

  if (
    fromNode.tileCategory === 'Zustand' &&
    toNode.tileCategory === 'Konditionen' &&
    toNode.tileName === 'Dann' &&
    ast !== null &&
    ast.program?.body[0].type === 'IfStatement'
  ) {
    ast.program.body[0].consequent.body = [];
    setAst(ast);
  }
  if (
    fromNode.tileCategory === 'Konditionen' &&
    fromNode.tileName === 'Dann' &&
    toNode.tileCategory === 'Objekte' &&
    ast !== null &&
    ast.program?.body[0].consequent.type === 'BlockStatement'
  ) {
    ast.program.body[0].consequent.body = [fromNode.astNode.javaScript as ExpressionStatement];
    const callExpression = ast.program.body[0].consequent.body[0].expression as CallExpression;
    callExpression.arguments = [
      {
        type: 'StringLiteral',
        value: toNode.astNode.MQTTtopic,
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
    ast?.program?.body[0].consequent.body[0].expression.arguments.push(
      toNode.astNode.javaScript as any,
    );

    setAst(ast);
  }

  if (fromNode.tileCategory === 'Zustand' && toNode.tileCategory === 'Ende' && ast !== null) {
    // send ast to backend
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    console.log('fetch ast to backend: ', JSON.stringify(ast));
      const data = Promise.all([
        fetch(`${backendUrl}/ast/js`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(ast),
        }).then((value) => value.json()),
        fetch(`${backendUrl}/ast/py`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(ast),
        }).then((value) => value.json()),
      ]);

      (async () => {
        try {
          const resolvedData = await data;
          setGeneratedCode &&
            setGeneratedCode({ js: resolvedData[0].code, py: resolvedData[1].code });
        } catch (error) {
          alert(error);
        }
      })();
  }
};
