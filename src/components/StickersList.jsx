import { useEffect, useState } from "react";

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
        <div>
            <h1>Stickers</h1>
            <ul>
                {stickers.map(sticker => (
                    <li key={sticker.id}>
                        <strong>ID:</strong> {sticker.id} <br />
                        <strong>Info:</strong> {sticker.stickerInfo}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default StickersList;
