import React from "react";
import "./IframeThumb.css";

export default function IframeThumb({ src, title, description, onClick }) {
  return (
    <div className="iframe-thumb-card" onClick={onClick}>
      <div className="iframe-thumb-outer">
        <iframe
          src={src}
          title={title}
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="iframe-thumb-frame"
        />
      </div>
      <div className="iframe-thumb-header">
        <div className="iframe-thumb-title">{title}</div>
        <div className="iframe-thumb-desc">{description}</div>
      </div>
    </div>
  );
}
