"use client";

import { useLemon } from "../context/LemonContext";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "bulma/css/bulma.min.css";
import logo from "../../public/LemonadestandLogo.png";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const { lemon } = useLemon(); // Hent lemon-tilstanden fra Context

  const toggleNavbar = () => {
    setIsActive(!isActive);
  };

  return (
    <nav className="navbar is-white" role="navigation" aria-label="main navigation" style={{ fontFamily: 'Lora' , color: '#188151' }}>
      <div className="navbar-brand">
        <Link href="/" className="navbar-item" style={{ fontFamily: 'Mr Dafoe', color: '#188151' }}>
          Lemonade
          <Image src={logo} alt="Lemonade Stand Logo" width={50} height={50} />
          Stand
        </Link>

        <button
          role="button"
          className={`navbar-burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded={isActive}
          onClick={toggleNavbar}
          style={{ border: "2px solid #fad342" }}
        >
          <span aria-hidden="true" style={{ color: "#188151" }}></span>
          <span aria-hidden="true" style={{ color: "#188151" }}></span>
          <span aria-hidden="true" style={{ color: "#188151" }}></span>
        </button>
      </div>

      <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
        <div className="navbar-end is-size-5 px-5 has-text-weight-medium">
          <Link href="/" className="navbar-item" style={{ color: "#188151" }}>
            Forside
          </Link>

          <Link href="/lemonade-stand" className="navbar-item" style={{ color: "#188151" }}>
            Lemonade
          </Link>

          <Link href="/kurv" className="navbar-item" style={{ color: "#188151" }}>
            Køb
          </Link>
        </div>
        <button
          className="button has-shadow my-3 mx-3 has-background-white is-outlined"
          style={{ boxShadow: "#b6baba 0 0 0.5em", color: "#188151", border: "2px solid #188151" }}
        >
          $ {lemon} 🍋
        </button>
        <Link href="/checkud">
          <button
            className="button has-shadow my-3 mr-5"
            style={{ boxShadow: "#b6baba 0 0 0.5em", color: "#188151" }}
          >
            Tjek Ud
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;