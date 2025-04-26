import { Link } from "react-router-dom";
import "./login-button.css"

const LoginButton = ({ buttonDisplay }) => {
    return (
        <Link to="/login" className="login-button-link" style={{ display: buttonDisplay }}>
            <button className="login-button">
                ورود و ثبت‌نام
            </button>
        </Link>
    )
}

export default LoginButton;