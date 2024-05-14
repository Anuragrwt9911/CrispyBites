import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import LocationContext from "../utils/LocationContext";
import CityContext from "../utils/CityContext";
import { useDispatch } from "react-redux";
import { setIsThemeToggle } from "../utils/themeSlice";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  const [showNavItems, setShowNavItems] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const onlineStatus = useOnlineStatus();
  const [nearMe, setNearMe] = useState(false);
  const { setLocation } = useContext(LocationContext);
  const { city } = useContext(CityContext);
  const dispatch = useDispatch();

  const cartItems = useSelector((store) => store.cart.items);

  const handleLocationNearMe = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position?.coords;
      setLocation({
        latitude: latitude,
        longitude: longitude,
      });
      setNearMe(true);
    });
  };

  const handleLocationDefault = () => {
    setLocation({
      latitude: 12.9716,
      longitude: 77.5946,
    });
    setNearMe(false);
  };

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const toggleNavItems = () => {
    setShowNavItems(!showNavItems);
  };

  const handleTheme = () => {
    dispatch(setIsThemeToggle());
  };

  const theme = useSelector((store) => store.theme.isThemeToggle);

  return (
    <>
      <div className={` header ${theme ? "light-theme" : "dark-theme"} `}>
        <div className="logo-container">
          <Link to={"/"}>
            <img
              alt="logo"
              className="logo"
              src={require("../../logos/logo.png")}
            />
          </Link>
          {nearMe ? (
            <div
              onClick={() => {
                handleLocationDefault();
                toast.success("Switched to Default Location Bangalore");
              }}
            >
              <Link to={"/"}>
                <button>Default Location</button>
              </Link>
              <p className={`${theme && "dark-theme"}`}>{city}</p>
            </div>
          ) : (
            <div
              onClick={() => {
                handleLocationNearMe();
                toast.success(`Switched to Nearby Location`);
              }}
            >
              <Link to={"/"}>
                <button className="locate-btn">📍Locate Me</button>
              </Link>
              <p>{city}</p>
            </div>
          )}
        </div>
        <div>
          <span
            className={` theme-btn ${!theme && "dark-theme"}`}
            onClick={() => handleTheme()}
          >
            Dark Theme
          </span>
        </div>
        <div className="nav-items">
          <div className="menu-icon" onClick={toggleNavItems}>
            <span>
              <i className="fa-solid fa-bars"></i>
            </span>
          </div>
          <ul
            className={`nav-list "}
           ${showNavItems ? "show" : ""}`}
          >
            <li className={`${!theme && "dark-theme"}`}>
              {" "}
              <Link className={`h-item ${!theme && "dark-theme"}`} to={"/"}>
                {" "}
                <span>
                  <i className="fa-solid fa-house"></i>
                </span>{" "}
                Home
              </Link>{" "}
            </li>
            <li>
              <Link
                className={`h-item ${!theme && "dark-theme"}`}
                to={"/about"}
              >
                <span>
                  <i class="fa-solid fa-circle-info"></i>
                </span>{" "}
                About
              </Link>
            </li>
            {/* <li><Link className="h-item" to={"/contact"}><span><i class="fa-solid fa-address-book"></i></span> Contact</Link></li> */}
            {/* <li><Link to={"/grocery"}>Grocery</Link></li> */}
            <li>
              <Link
                className={`h-item h-cart ${!theme && "dark-theme"}`}
                to={"/cart"}
              >
                <span>
                  <i className="fa-solid fa-cart-shopping"></i>
                </span>{" "}
                Cart<p>{totalQuantity}</p>
              </Link>
            </li>

            <div
              onClick={() => {
                btnName === "Login"
                  ? (setBtnName("Logout"), toast.success("User Logged In"))
                  : (setBtnName("Login"), toast.success("User Logged Out"));
              }}
              className="login"
            >
              <span>
                <i className="fa-solid fa-user"></i>
              </span>
              {btnName}
            </div>
            <li className="h-online">
              Online Status: {onlineStatus ? "🟢" : "🔴"}
            </li>
          </ul>
        </div>
      </div>
      <div className="empty"></div>
    </>
  );
};

export default Header;
