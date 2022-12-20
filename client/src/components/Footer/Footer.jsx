import React from "react";
import "./footer.scss";

export const Footer = () => {
  return (
    <>
      <p className="text-1">React App by Franco Amoroso</p>
      <p className="text-2">December 2022</p>
      <a
        className="text-3"
        href="https://www.franamoroso.com/"
        target="_blank"
        rel="noreferrer"
      >
        My online portfolio
      </a>
    </>
  );
};
