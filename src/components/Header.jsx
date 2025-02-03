import { FaBell, FaCog } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/rest/auth/logout", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                setIsLoggedIn(false);
                console.log("Wylogowano");
                localStorage.removeItem("token");
                window.location.href = "http://localhost:5173/";
            }
        } catch (error) {
            console.error("Błąd podczas wylogowywania", error);
        }
    };

    return (
        <header className="top-bar flex justify-between items-center p-4 bg-gray-800 text-white">
            <img src="../public/logo.png" alt="Logo" className="logo w-16" />
            <div className="icons flex gap-4">
                <FaBell className="icon text-xl cursor-pointer" />
                <FaCog className="icon text-xl cursor-pointer" />
                {isLoggedIn && location.pathname !== "http://localhost:8080/api/rest/auth/login" && (
                    <button 
                        onClick={handleLogout} 
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all">
                        Wyloguj się
                    </button>
                )}
            </div>
        </header>
    );
}

export default Header;
