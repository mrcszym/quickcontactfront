import { FaCog, FaBell } from 'react-icons/fa';

function Header() {
    return (
        <header className="top-bar">
            <img src="../public/logo.png" alt="Logo" className="logo" />
            <div className="icons">
                <FaBell className="icon" />
                <FaCog className="icon" />
            </div>
        </header>
    );
}

export default Header;
