import { useEffect } from 'react';

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2200);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  return <div className="toast">{message}</div>;
};

export default Toast;
