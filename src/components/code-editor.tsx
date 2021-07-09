import MonacoEditor from '@monaco-editor/react';
import React from 'react';

const CodeEditor = () => {
    return <MonacoEditor 
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
        minimap: {enabled: false},
        automaticLayout: true
    }} 
    />
};

export default CodeEditor;