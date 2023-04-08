import {
  CallExpression,
  BinaryExpression,
  LogicalExpression,
  Identifier,
  IfStatement,
  ExpressionStatement,
  ASTType,
  Operator,
} from '../astTypes.d';
import { connectionsType } from '../state/SyntaxTreeState';

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
  connections: connectionsType,
  generatedCode?: { js: string; py: string },
  setGeneratedCode?: (value: { js: string; py: string }) => void,
) => {
  console.log(fromNode?.tileCategory + '->' + toNode?.tileCategory);
  if (
    fromNode?.tileCategory === undefined ||
    fromNode.tileName === undefined ||
    toNode?.tileName === undefined ||
    toNode?.tileCategory === undefined
  )
    return;

  if (fromNode.tileCategory === 'Start' && toNode.tileCategory === 'Objekte' && ast === null) {
    const binary = fromNode.astNode.javaScript.test as BinaryExpression;
    const startNode = fromNode.astNode.javaScript as IfStatement;
    binary.left = toNode.astNode.javaScript as Identifier;
    startNode.test = binary;
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
    fromNode.tileCategory === 'Objekte' &&
    toNode.tileCategory === 'Zustand' &&
    ast !== null &&
    ast.program?.body[0].type === 'IfStatement'
  ) {
    if (ast.program?.body[0].test?.type === 'BinaryExpression') {
      ast.program.body[0].test.right = toNode.astNode.javaScript as Identifier;
      setAst(ast);
    }
    console.log('from Obj->Zustand:', ast.program.body[0].test?.type === 'LogicalExpression');
    if (ast.program.body[0].test?.type === 'LogicalExpression') {
      console.log(toNode.id);
      const findOtherConnection = connections.filter((a) => a.from === `${toNode.id}_R`);
      console.log(findOtherConnection);
      if (findOtherConnection.length === 1) {
        const direction = findOtherConnection[0].to.split('_')[1];
        console.log('direction:', direction);
        if (direction === 'TL') {
          ast.program.body[0].test.left = {
            type: 'BinaryExpression',
            left: null,
            right: null,
            operator: Operator.equals,
          };
          ast.program.body[0].test.left.left = fromNode.astNode.javaScript;
          ast.program.body[0].test.left.right = toNode.astNode.javaScript;
        } else if (direction === 'BL') {
          ast.program.body[0].test.right = {
            type: 'BinaryExpression',
            left: null,
            right: null,
            operator: Operator.equals,
          };
          ast.program.body[0].test.right.left = fromNode.astNode.javaScript;
          ast.program.body[0].test.right.right = toNode.astNode.javaScript;
        }
      }
    }
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
  if (
    fromNode.tileCategory === 'Zustand' &&
    toNode.tileCategory === 'Konditionen' &&
    toNode.tileName === 'Und' &&
    toNode.anchorPosition === 'TL' &&
    ast !== null
  ) {
    // save the current elements in the if Condition
    console.log(ast.program.body[0].test.type);
    if (ast.program.body[0].test.type !== 'LogicalExpression') {
      const leftBinaryExpression = ast.program.body[0].test;
      const logicNode = {
        type: 'IfStatement',
        test: {
          type: 'LogicalExpression',
          left: null,
          right: null,
          operator: '&&',
        } as LogicalExpression,
        consequent: {
          type: 'BlockStatement',
          body: null,
        },
      } as unknown as IfStatement;

      const newAst = {
        type: 'File',
        errors: [],
        program: {
          type: 'Program',
          body: [logicNode],
        },
      } as ASTType;
      logicNode.test.left = leftBinaryExpression as BinaryExpression;
      console.log('added logical Op with TL');
      setAst(newAst);
    }
  }
  if (
    fromNode.tileCategory === 'Zustand' &&
    toNode.tileCategory === 'Konditionen' &&
    toNode.tileName === 'Und' &&
    toNode.anchorPosition === 'BL' &&
    ast !== null
  ) {
    // save the current elements in the if Condition
    console.log(ast.program.body[0].test.type);
    if (ast.program.body[0].test.type !== 'LogicalExpression') {
      const leftBinaryExpression = ast.program.body[0].test;
      const logicNode = {
        type: 'IfStatement',
        test: {
          type: 'LogicalExpression',
          left: null,
          right: null,
          operator: '&&',
        } as LogicalExpression,
        consequent: {
          type: 'BlockStatement',
          body: null,
        },
      } as unknown as IfStatement;

      const newAst = {
        type: 'File',
        errors: [],
        program: {
          type: 'Program',
          body: [logicNode],
        },
      } as ASTType;
      logicNode.test.right = leftBinaryExpression as BinaryExpression;
      console.log('added logical Op with BL');
      setAst(newAst);
    }
  }
  // if (
  //   fromNode.tileCategory === 'Zustand' &&
  //   toNode.tileCategory === 'Konditionen' &&
  //   toNode.tileName === 'Und' &&
  //   toNode.anchorPosition === 'BL' &&
  //   ast !== null &&
  //   ast.program.body[0].test.type === 'LogicalExpression'
  // ) {
  //   ast.program.body[0].test.right = {
  //     type: 'BinaryExpression',
  //     left: null,
  //     right: null,
  //     operator: '===',
  //   } as BinaryExpression;
  //   ast.program.body[0].test.right.right = toNode.astNode.javaScript as Identifier;
  // }
  // if (
  //   fromNode.tileCategory === 'Zustand' &&
  //   toNode.tileCategory === 'Konditionen' &&
  //   toNode.tileName === 'Und' &&
  //   toNode.anchorPosition === 'TL' &&
  //   ast !== null &&
  //   ast.program.body[0].test.type === 'LogicalExpression'
  // ) {
  //   ast.program.body[0].test.left = {
  //     type: 'BinaryExpression',
  //     left: null,
  //     right: null,
  //     operator: '===',
  //   } as BinaryExpression;
  //   ast.program.body[0].test.left.right = toNode.astNode.javaScript as Identifier;
  // }

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
        setAst(null);
      } catch (error) {
        alert(error);
      }
    })();
  }
};
