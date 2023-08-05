import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Main = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // Redirect to the login page after logout
  };

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>fakebook</h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Main;
