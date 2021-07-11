import MonacoEditor from '@monaco-editor/react';
import React from 'react';

interface codeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}
const CodeEditor: React.FC<codeEditorProps> = ({ initialValue, onChange }) => {
  // editorDidMount prop will pass functions that give us access to the editor
  const onEditorDidMount = (
    getCurrentEditorInput: () => string,
    editorInputListener: any
  ) => {
    editorInputListener.onDidChangeModelContent(() => {
      // update state
      onChange(getCurrentEditorInput());
    });
  };

  return (
    <MonacoEditor
      editorDidMount={onEditorDidMount}
      value={initialValue}
      theme="dark"
      height="300px"
      language="javascript"
      options={{
        wordWrap: 'on',
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 16,
        scrollBeyondLastLine: false,
        showUnused: false,
        minimap: { enabled: false },
        automaticLayout: true,
      }}
    />
  );
};

export default CodeEditor;
