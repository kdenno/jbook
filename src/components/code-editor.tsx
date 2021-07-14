import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import React, { useRef } from 'react';
import './code-editor.css';
import './syntax.css';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import codeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';

interface codeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}
const CodeEditor: React.FC<codeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>();
  // editorDidMount prop will pass functions that give us access to the editor
  const onEditorDidMount: EditorDidMount = (
    getCurrentEditorInput,
    theEditor
  ) => {
    editorRef.current = theEditor;
    theEditor.onDidChangeModelContent(() => {
      // update state
      onChange(getCurrentEditorInput());
    });
    theEditor.getModel()?.updateOptions({ tabSize: 2 });

    const highlighter = new Highlighter(
      // @ts-ignore
      window.monaco,
      codeShift,
      theEditor
    );
    highlighter.highLightOnDidChangeModelContent(
      () => {},
      () => {},
      undefined,
      () => {}
    );
  };
  const onFormatClick = () => {
    // get current value from the editor
    const unformatted = editorRef.current.getModel().getValue();
    // format that value
    const formatted = prettier.format(unformatted, {
      parser: 'babel',
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true,
    });
    // set the foramtted value back into the editor
    editorRef.current.setValue(formatted);
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        theme="dark"
        height="100%"
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
    </div>
  );
};

export default CodeEditor;
