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
      <div className='absolute top-0 right-0 w-1/4 h-full bg-gray-100 text-gray-500 p-4 drop-shadow-lg'>
        <InfoComponent />
        <Editor
          className='w-full border border-gray-500 h-1/2 bg-gray-100 text-gray-500 p-4'
          value={JSON.stringify(ast)}
          onValueChange={(code) => setAst(code as unknown as ASTType)}
          highlight={(code) => highlight(code, languages.json, 'json')}
          padding={20}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
          }}
        />
        {generatedCode.length > 0 && (
          <Editor
            className='w-full border border-gray-500 h-1/3 bg-gray-100 text-gray-500 p-4'
            value={generatedCode}
            onValueChange={(code) => setGeneratedCode(code)}
            highlight={(code) => highlight(code, languages.js, 'js')}
            padding={20}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
            }}
          />
        )}
      </div>
    </>
  );
};

export default CanvasPage;
