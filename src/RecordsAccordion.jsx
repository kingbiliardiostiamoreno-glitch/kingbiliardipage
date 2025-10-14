import React, { useState } from "react";
import "./RecordsAccordion.css";

export default function RecordsAccordion({ records }) {
    const [open, setOpen] = useState(false);

    if (!records || !records.length) return null;

    // Ordina per data discendente
    const sortedRecords = [...records].sort((a, b) =>
        new Date(b.Date) - new Date(a.Date)
    );

    return (
        <div className="records-area">
            <button
                onClick={() => setOpen(v => !v)}
                className={`accordion-btn${open ? ' open' : ''}`}
            >
                {/* Freccia sinistra */}
                <span className={`arrow left-arrow${open ? " open" : ""}`}>
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                        <polyline points="6 9 12 15 18 9" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
                    </svg>
                </span>
                <span className="accordion-title">Storico Dirette</span>
                {/* Freccia destra */}
                <span className={`arrow right-arrow${open ? " open" : ""}`}>
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                        <polyline points="6 9 12 15 18 9" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
                    </svg>
                </span>
            </button>
            {open && (
                <div className="accordion-content">
                    {sortedRecords.map((rec, i) => (
                        <div className="record-card" key={i}>
                            <div className="record-info">
                                <div className="record-date">
                                    {new Date(rec.Date).toLocaleString("it-IT")}
                                </div>
                                <div className="record-title">{rec.Title}</div>
                                <div className="record-desc">{rec.Description}</div>
                            </div>
                            {rec.LiveID && (
                                <div className="record-iframewrap">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${rec.LiveID}?autoplay=0&mute=1&playsinline=1`}
                                        title={rec.Title}
                                        allowFullScreen
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
