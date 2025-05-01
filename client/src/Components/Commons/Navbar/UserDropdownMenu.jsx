import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { CiUser, CiShoppingBasket, CiLogout } from "react-icons/ci";
import { RiArrowDropDownFill } from "react-icons/ri";
import "./user-dropdown-menu.css";

const UserDropDownMenu = ({ userIconDisplay }) => {
    let [isMenuOpen, setIsMenuOpen] = useState(false);
    const userMenuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }

    return (
        <div
            className="profile-section"
            onClick={() => setIsMenuOpen(prev => !prev)}
            ref={userMenuRef}
        >
            <div className="user-icon-container" style={{ display: userIconDisplay }}>
                <CiUser className="user-icon" />
                <RiArrowDropDownFill className={`user-icon-arrow ${isMenuOpen ? "active" : ""}`} />
            </div>
            {isMenuOpen && (
                <ul className="user-dropdown-menu">
                    <li>
                        <Link to="orders" className="user-menu-link">
                            <CiShoppingBasket className="user-menu-icons" />
                            سفارش‌ها
                        </Link>
                    </li>
                    <li onClick={handleLogout}>
                        <button className="user-menu-link">
                            <CiLogout className="user-menu-icons" />
                            خروج از حساب کاربری
                        </button>
                    </li>
                </ul>
            )}
        </div>
    )
}

export default UserDropDownMenu;