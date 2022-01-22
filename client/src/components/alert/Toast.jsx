import React, { useEffect } from "react";

const Toast = ({ msg, handleShow, textColor }) => {
  const delay = 3;

  useEffect(() => {
    let timer = setTimeout(handleShow, delay * 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [handleShow]);

  return (
    <div
      className="toast show position-fixed text-dark"
      style={{ top: "5px", right: "5px", minWidth: "200px", zIndex: 50 }}
    >
      <div className="toast-header text-dark">
        <strong className={`mr-auto ${textColor}`}>{msg.title}</strong>
        <button
          className="ml-2 mb-1 close text-dark"
          data-dismiss="toast"
          style={{ outline: "none" }}
          onClick={handleShow}
        >
          &times;
        </button>
      </div>
      <div className="toast-body">{msg.body}</div>
    </div>
  );
};

export default Toast;
