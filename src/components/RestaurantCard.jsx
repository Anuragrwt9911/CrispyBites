import { CDN_URL } from "../utils/constants";
import { COVID_URL } from "../utils/constants";
import { useSelector } from "react-redux";

const RestaurantCard = (props) => {
  const { resData } = props;
  const theme = useSelector((store) => store.theme.isThemeToggle);

  const {
    cloudinaryImageId,
    name,
    avgRating,
    aggregatedDiscountInfoV3,
    cuisines,
    costForTwo,
    sla,
  } = resData?.info;

  return (
    <div className={`Food-item `}>
      <div className="Food-item-margin">
        <span className="Food-item-link">
          <div className="card-img ">
            <img src={CDN_URL + cloudinaryImageId} alt="restaurant img" />
          </div>
          <div className="off">
            <p>
              {aggregatedDiscountInfoV3?.header
                ? `${aggregatedDiscountInfoV3.header}${
                    aggregatedDiscountInfoV3.subHeader
                      ? ` ${aggregatedDiscountInfoV3.subHeader}`
                      : ""
                  }`
                : "Flat Rs. 50% OFF"}
            </p>
          </div>
        </span>
        <span className={`Food-item-link `}>
          <div className={`pname `}>
            <h4 className={`${!theme && "dark-theme"}`}>{name}</h4>

            <div className="rating">
              <p>{avgRating}</p>
              <i className="fa-solid fa-star" style={{ color: "#ffffff" }} />
            </div>
          </div>
          <div className={`Category ${!theme && "dark-theme"}`}>
            <p className="p1">{cuisines.join(", ")}</p>
            <p className={`p2 ${!theme && "dark-theme"}`}>{costForTwo}</p>
          </div>
          <div className="time">
            <p className={`${!theme && "dark-theme"}`}>{sla.deliveryTime}min</p>
          </div>
        </span>
      </div>
    </div>
  );
};

export default RestaurantCard;
