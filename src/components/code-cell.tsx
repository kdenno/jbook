import { useState } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import codeBundler from '../bundler';
import Resizable from './resizable';
import React from 'react';

const CodeCell = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const onClick = async () => {
    const output = await codeBundler(input);
    setCode(output);
  };

  return (
    <Resizable direction="vertical">
      <div>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue="const a = 1"
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <div>
          <button onClick={onClick}>Submit</button>
        </div>
        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
