import {
  FaWifi,
  FaCat,
  FaSquareParking,
  FaTv,
  FaArrowRightToBracket,
} from "react-icons/fa6";
import React from "react";

export default function Perks({ perks = [], onChange }) {
  const handlePerkChange = (e) => {
    const { value, checked } = e.target;
    onChange(value, checked);
  };
  return (
    <>
      <label key="wifi" className="label">
        <input
          type="checkbox"
          value="wifi"
          checked={perks.includes("wifi")}
          onChange={handlePerkChange}
        />
        <FaWifi className="w-6 h-6" />
        <span>Wifi</span>
      </label>

      <label key="parking" className="label">
        <input
          type="checkbox"
          value="parking"
          checked={perks.includes("parking")}
          onChange={handlePerkChange}
        />
        <FaSquareParking className="w-6 h-6" />
        <span>Free parking</span>
      </label>

      <label key="tv" className="label">
        <input
          type="checkbox"
          value="tv"
          checked={perks.includes("tv")}
          onChange={handlePerkChange}
        />
        <FaTv className="w-6 h-6" />
        <span>TV</span>
      </label>

      <label key="pets" className="label">
        <input
          type="checkbox"
          value="pets"
          checked={perks.includes("pets")}
          onChange={handlePerkChange}
        />
        <FaCat className="w-6 h-6" />
        <span>Pets</span>
      </label>

      <label key="entrance" className="label">
        <input
          type="checkbox"
          value="entrance"
          checked={perks.includes("entrance")}
          onChange={handlePerkChange}
        />
        <FaArrowRightToBracket className="w-6 h-6" />
        <span>Private entrance </span>
      </label>
    </>
  );
}
