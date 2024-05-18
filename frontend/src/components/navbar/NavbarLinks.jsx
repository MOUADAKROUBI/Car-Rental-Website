import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SearchInput from "../search";
import axios from "axios";

const NavbarLinks = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/${localStorage.getItem("userID")}`)
    .then((response) => {
      if (response.status == 200) {
        setUser(response.data.data);
      }
    })
    .catch((e) => {
      console.error(e);
    });
  }, []);
  
  return (
    <div className="collapse navbar-collapse mt-lg-0 mt-4" id="navbarLinks">
      <Link className="navbar-brand" to="/">
        Locavo
      </Link>
      <ul className="navbar-nav">
        <li className="nav-item mx-2">
          <Link className="nav-link" to="/home">
            {t("navbar.home")}
          </Link>
        </li>
        <li className="nav-item mx-2">
          <Link className="nav-link" to="/cars">
            {t("navbar.bookCars")}
          </Link>
        </li>
        {user?.email === "admin@gmail.com" && (
          <li className="nav-item mx-2">
            <Link className="nav-link" to="/dashboard">
              {t("navbar.dashboard")}
            </Link>
          </li>
        )}
      </ul>
      {window.location.pathname != "/home" && <SearchInput type={"cars"} />}
    </div>
  );
};

export default NavbarLinks;
