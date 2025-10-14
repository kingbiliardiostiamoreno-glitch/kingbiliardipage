import React, { useState, useRef, useEffect } from "react";
import "./RecordsAccordion.css";

export default function RecordsAccordion({ records }) {
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const itemsPerPage = 2;
    const containerRef = useRef(null);

    // Effetto: torna in cima quando cambi pagina
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [page]);

    if (!records || !records.length) return null;

    // Ordinamento per data decrescente
    const sortedRecords = [...records].sort((a, b) => new Date(b.Date) - new Date(a.Date));

    // Calcolo pagina e visibilità
    const totalPages = Math.ceil(sortedRecords.length / itemsPerPage);
    const start = page * itemsPerPage;
    const end = start + itemsPerPage;
    const visibleRecords = sortedRecords.slice(start, end);

    const nextPage = () => {
        if (end < sortedRecords.length) setPage(prev => prev + 1);
    };

    const prevPage = () => {
        if (page > 0) setPage(prev => prev - 1);
    };

    // --- Componente interno per la barra di navigazione ---
    const PageControls = () => (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "32px",
                margin: "28px 0",
            }}
        >
            {page > 0 ? (
                <button
                    onClick={prevPage}
                    style={{
                        background: "#3a7a37",
                        color: "#fff",
                        border: "none",
                        borderRadius: "50%",
                        width: "54px",
                        height: "54px",
                        cursor: "pointer",
                        fontSize: "1.8rem",
                        boxShadow: "0 4px 12px #0003",
                    }}
                    title="Vedi precedenti"
                >
                    ←
                </button>
            ) : (
                <div style={{ width: "54px", height: "54px" }}></div> // placeholder per centratura
            )}

            <span
                style={{
                    fontSize: "1.3rem",
                    fontWeight: "700",
                    color: "#a3ffe2ff",
                    textShadow: "0 1px 6px #0002",
                }}
            >
                Pagina {page + 1} / {totalPages}
            </span>

            {end < sortedRecords.length ? (
                <button
                    onClick={nextPage}
                    style={{
                        background: "#3a7a37",
                        color: "#fff",
                        border: "none",
                        borderRadius: "50%",
                        width: "54px",
                        height: "54px",
                        cursor: "pointer",
                        fontSize: "1.8rem",
                        boxShadow: "0 4px 12px #0003",
                    }}
                    title="Vedi successivi"
                >
                    →
                </button>
            ) : (
                <div style={{ width: "54px", height: "54px" }}></div>
            )}
        </div>
    );

    return (
        <div className="records-area" ref={containerRef}>
            <button
                onClick={() => setOpen(v => !v)}
                className={`accordion-btn${open ? " open" : ""}`}
            >
                <span className={`arrow left-arrow${open ? " open" : ""}`}>
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                        <polyline
                            points="6 9 12 15 18 9"
                            stroke="#fff"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{
                                transform: open ? "rotate(180deg)" : "rotate(0deg)",
                                transition: "transform 0.2s",
                            }}
                        />
                    </svg>
                </span>
                <span className="accordion-title">Storico Dirette</span>
                <span className={`arrow right-arrow${open ? " open" : ""}`}>
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                        <polyline
                            points="6 9 12 15 18 9"
                            stroke="#fff"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{
                                transform: open ? "rotate(180deg)" : "rotate(0deg)",
                                transition: "transform 0.2s",
                            }}
                        />
                    </svg>
                </span>
            </button>

            {open && (
                <div className="accordion-content">
                    {/* Frecce sopra i video */}
                    <PageControls />

                    {visibleRecords.map((rec, i) => (
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

                    {/* Frecce sotto i video */}
                    <PageControls />
                </div>
            )}
        </div>
    );
}
