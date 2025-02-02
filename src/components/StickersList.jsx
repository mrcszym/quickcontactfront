import { useEffect, useState } from "react";
import '../css/index.css';
import '../css/Stickers.css';
import Header from "./Header";
import Footer from "./Footer";

function StickersList() {
    const [stickers, setStickers] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch("http://localhost:8080/api/customers/my-stickers", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            mode: "cors",
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Błąd autoryzacji lub pobierania danych");
                }
                return res.json();
            })
            .then((data) => setStickers(data))
            .catch((err) => console.error("Błąd pobierania stickerów:", err));
    }, []);

    return (
        <div className="app-container">
            <Header />
            <div className="container">
                <h1 className="title">Moje naklejki</h1>
                <div className="sticker-list">
                    {stickers.map(sticker => (
                        <div key={sticker.id} className="sticker-item">
                            <p><strong>ID:</strong> {sticker.id}</p>
                            <p><strong>Info:</strong> {sticker.stickerInfo}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default StickersList;
