import React from 'react';
import Board from '../components/Board/Board';
import Editor from 'react-simple-code-editor';
import Sidebar from '../components/Sidebar/Sidebar';
import { useWindowFocus } from '../hooks/useWindowFocus';
import { highlight, languages } from 'prismjs';
import InfoComponent from '../components/Forms/InfoComponent';
import SelectLampForm from '../components/Forms/SelectLampForm';
import { useContextMenuState } from '../state/ContextMenuState';
import TileRightClickMenu from '../components/ContextMenus/TileRightClickMenu';
import LineRightClickMenu from '../components/ContextMenus/LineRightClickMenu';
import { useConnectedTilesState } from '../state/SyntaxTreeState';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism.css';
import { ASTType } from '../AstTypes';

const CanvasPage = () => {
  // Add Cursor here. const socket = useWebSocketState((state) => state.socket);
  const { contextMenuOpen, lineContextMenuOpen } = useContextMenuState((state) => state);
  const { generatedCode, setGeneratedCode, ast, setAst } = useConnectedTilesState((state) => state);
  useWindowFocus();

  return (
    <>
      {contextMenuOpen === true && <TileRightClickMenu />}
      {lineContextMenuOpen === true && <LineRightClickMenu />}

      <Board />
      <Sidebar />
      <SelectLampForm />
      <div className='absolute top-0 right-0 w-1/4 h-full bg-gray-100 text-gray-500 p-4 drop-shadow-lg over overflow-y-auto'>
        <InfoComponent />
        <div className='flex flex-col w-full  h-1/3 bg-gray-100 text-gray-500 p-4 mt-4'>
          AST
          <Editor
            className='w-full  border border-gray-500 h-full bg-gray-100 text-gray-500 p-4'
            value={JSON.stringify(ast)}
            onValueChange={(code) => console.log(code)}
            highlight={(code) => highlight(code, languages.json, 'json')}
            padding={20}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
            }}
          />
        </div>

        {generatedCode.js.length > 0 && (
          <div className='w-full  bg-gray-100 text-gray-500 p-4 mt-4'>
            JavaScript
            <Editor
              value={generatedCode.js}
              onValueChange={(code) => setGeneratedCode({ ...generatedCode, js: code })}
              highlight={(code) => highlight(code, languages.js, 'js')}
              padding={20}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
              }}
            />
          </div>
        )}
        {generatedCode.py.length > 0 && (
          <div className='w-full  h-max bg-gray-100 text-gray-500 p-4 mt-4'>
            Python
            <Editor
              value={generatedCode.py}
              onValueChange={(code) => setGeneratedCode({ ...generatedCode, py: code })}
              highlight={(code) => highlight(code, languages.js, 'js')}
              padding={20}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default CanvasPage;
