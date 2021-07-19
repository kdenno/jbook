import './preview.css';
import React, { useRef, useEffect } from 'react';
interface previewProps {
  code: string;
  error: string;
}

const html = `
  <html>
  <head>
  <style>{html {background-color: white}}</style>
  </head>
  <body>
  <div id="root"></div>
  <script>
  const handleError = (err) => {
    const root = document.querySelector('#root');
    root.innerHtml = '<div style="color: red;"><h4>RunTime Error</h4>' + err + '</div>';
    console.error(err);

  }
  window.addEventListener('error', (event) => {
    event.preventDefault();
    handleError(event.error);

  });
  window.addEventListener('message', (event) => {
    try{
      eval(event.data)
    }catch(err){
      handleError(err);
    }
  }, false);
  </script>
  </body>
  </html>
  
  `;
const Preview: React.FC<previewProps> = ({ code, error }) => {
  const iframe = useRef<any>();
  useEffect(() => {
    // refresh contents of the iframe
    iframe.current.srcdoc = html;
    // wait for iframe to set up listener and send message to iframe
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);
  return (
    <div className="preview-wrapper">
      <iframe
        title="preview"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
      />
      {error && <div className="preview-error">{error}</div>}
    </div>
  );
};

export default Preview;
