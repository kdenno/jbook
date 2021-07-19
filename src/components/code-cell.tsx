import { useState } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import codeBundler from '../bundler';
import Resizable from './resizable';
import React, { useEffect } from 'react';

const CodeCell = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await codeBundler(input);
      setCode(output);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [input]);
  return (
    <Resizable direction="vertical">
      <div>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue="const a = 1"
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
