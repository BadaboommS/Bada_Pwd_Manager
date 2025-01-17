import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './showPopup.css';

interface PopupProps {
  x: number;
  y: number;
  itemName: string;
}

const Popup: React.FC<PopupProps> = ({ x, y, itemName }) => {
  const [visible, setVisible] = useState(true);
  const [moveUp, setMoveUp] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const moveUpTimeout = setTimeout(() => {
      setMoveUp(true);
    }, 0);

    const fadeOutTimeout = setTimeout(() => {
      setFadeOut(true);
    }, 2500);

    const unmountTimeout = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => {
      clearTimeout(moveUpTimeout);
      clearTimeout(fadeOutTimeout);
      clearTimeout(unmountTimeout);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`popup ${moveUp ? 'move-up' : ''} ${fadeOut? 'fade-out' : ''}`} style={{ top: y - 30, left: x + 10 }}>
      {itemName} - Copied !
    </div>
  );
};

export const showPopup = (x: number, y: number, itemName: string) => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const root = createRoot(div);
  root.render(<Popup x={x} y={y} itemName={itemName}/>);

  setTimeout(() => {
    root.unmount();
    document.body.removeChild(div);
  }, 3500);
};

export default Popup;