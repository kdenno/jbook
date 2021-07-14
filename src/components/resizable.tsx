import './resizable.css';
import { ResizableBox } from 'react-resizable';
import React from 'react';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
}
const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  return (
    <ResizableBox
      height={300}
      width={Infinity}
      minConstraints={[Infinity, 30]}
      maxConstraints={[Infinity, window.innerHeight * 0.8]}
      resizeHandles={['s']}
    >
      {children}
    </ResizableBox>
  );
};

export default Resizable;
