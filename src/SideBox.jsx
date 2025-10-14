import React from "react";

export default function SideBox({ title, children, className = "" }) {
    return (
        <aside className={`side-box ${className}`}>
            {title && <h3>{title}</h3>}
            {children}
        </aside>
    );
}
