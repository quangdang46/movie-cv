import React, { useEffect, useRef } from "react";

const Iframe = ({ lazy_src = "", title = "", className = "", other }) => {
  const iframeRef = useRef();

  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 9) / 16 + "px";
    iframeRef.current.setAttribute("height", height);
  }, [lazy_src]);
  return (
    <iframe
      ref={iframeRef}
      src={lazy_src}
      title={title}
      width="100%"
      style={{ border: 0 }}
      className={className}
      {...other}
    ></iframe>
  );
};

export default Iframe;
