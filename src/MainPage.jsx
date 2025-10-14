import React, { useEffect, useState } from "react";
import './MainPage.css';
import IframeThumb from "./IframeThumb";
import IframeBig from "./IframeBig";
import { db } from "./firebase";
import { ref, onValue, off } from "firebase/database";
import RecordsAccordion from "./RecordsAccordion";

export default function MainPage() {
    const [userData, setUserData] = useState({
        PageTitle: "",
        PageDescription: "",
        EventTitle: "",
        EventDescription: "",
        Title: "",
        Description: "",
        Lives: [],
        Records: []
    });
    const [bigScreen, setBigScreen] = useState(null);
// eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
       const dataRef = ref(db, "multistream");
        const unsubscribe = onValue(dataRef, (snapshot) => {
            const data = snapshot.val() || {};
            setUserData({
                PageTitle: data.PageTitle || "",
                PageDescription: data.PageDescription || "",
                EventTitle: data.EventTitle || "",
                EventDescription: data.EventDescription || "",
                Title: data.Title || "",
                Description: data.Description || "",
                Lives: Array.isArray(data.Lives) ? data.Lives : [],
                Records: Array.isArray(data.Records) ? data.Records : []
            });

            if (data.Lives && data.Lives.length > 0) {
                if (!bigScreen || !data.Lives.some(live => live.LiveID === bigScreen.LiveID)) {
                    setBigScreen(data.Lives[0]);
                }
            } else {
                setBigScreen(null);
            }
        });

        return () => off(dataRef, "value", unsubscribe);
    }, []);

    return (
        <div className="main-bg">
            <div className="vertical-top">
                <h1 className="pagetitle">{userData.PageTitle}</h1>
                <h2 className="eventtitle">{userData.EventTitle}</h2>
            </div>
            <div className="horizontal-row">
                <aside className="panel left-panel">
                    <div className="panel-title">{userData.PageTitle}</div>
                    <div className="panel-desc">{userData.PageDescription}</div>
                </aside>
                <main className="main-center">
                    {bigScreen ? (
                        <>
                            <IframeBig
                                src={`https://www.youtube.com/embed/${bigScreen.LiveID}?autoplay=1`}
                                title={bigScreen.Title}
                                description={bigScreen.Description}
                            />
                            <div className="iframe-row">
                                {userData.Lives
                                    .filter(live => live.LiveID !== bigScreen.LiveID)
                                    .map((live, index) => (
                                        <IframeThumb
                                            key={index}
                                            src={`https://www.youtube.com/embed/${live.LiveID}?autoplay=1&mute=1&playsinline=1`}
                                            title={live.Title}
                                            description={live.Description}
                                            onClick={() => setBigScreen(live)}
                                            width="480"
                                            height="270"
                                        />
                                    ))}
                            </div>
                        </>
                    ) : (
                        <div style={{ marginTop: 120 }}>
                            <h1 style={{ fontSize: "40px", color: "#fff" }}>Nessuna Live Attiva...</h1>
                        </div>
                    )}
                </main>
                <aside className="panel right-panel">
                    <div className="panel-title">{userData.EventTitle}</div>
                    <div className="panel-desc">{userData.EventDescription}</div>
                </aside>
            </div>
            <div className="records-area">
                <RecordsAccordion records={userData.Records} />
            </div>
        </div>
    );
}

