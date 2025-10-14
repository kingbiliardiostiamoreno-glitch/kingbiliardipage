import React from "react";
import "./IframeBig.css";

export default function IframeBig({ src, title, description }) {
  return (
    <div className="iframe-big-wrapper">
     
        <iframe
          src={src}
          title={title}
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="iframebig"
        />
      
      <div className="iframebig-header">
        <div className="iframebig-title">{title}</div>
        <div className="iframebig-desc">{description}</div>
      </div>
    </div>
  );
}
