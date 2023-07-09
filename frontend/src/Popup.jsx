import React, { useEffect, useState } from "react";
import "./Popup.css";

const Popup = ({message}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) {
    return null;
  }

  return <div className="popup">{message}</div>;
};

export default Popup;