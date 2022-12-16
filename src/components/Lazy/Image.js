import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

const Image = ({ className, onLoad, crossOrigin: _, lazy_src, ...others }) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const img = imgRef.current;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        img.setAttribute("src", lazy_src);
      }
    });

    if (img) {
      observer.observe(img);
    }

    return () => {
      if (img) {
        observer.unobserve(img);
      }
    };
  }, [lazy_src]);
  return (
    <img
      ref={imgRef}
      alt="img"
      className={`transition-all ${className}`}
      style={{
        opacity: loaded ? "1" : "0",
      }}
      onLoad={(e) => {
        setLoaded(true);
        onLoad && onLoad(e);
      }}
      {...others}
    />
  );
};

export default Image;
