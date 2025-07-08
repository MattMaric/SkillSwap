import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container text-center">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} SkillSwap. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
