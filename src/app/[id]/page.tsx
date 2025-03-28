"use client";

import { useLemon } from "../../context/LemonContext";
import "bulma/css/bulma.min.css";
import Navbar from "../../components/navbar";
import backrund from "../../../public/backround.png";
import { useState } from "react";

type ProductPageProps = {
    params: { id: string };
  };
  
  export default function ProductPageProps() {
  const { lemon, setLemon } = useLemon(); // Hent lemon og setLemon fra Context
  const [lager, setLager] = useState(50);

  const sellLemonade = () => {
    setLemon(lemon + 5); // Opdater lemon-tilstanden
    setLager(lager - 1);
  };

  const buyLemons = () => {
    setLemon(lemon - 2); // Opdater lemon-tilstanden
    setLager(lager + 1);
  };

  return (
    <>
      <Navbar />
      <div
        className="hero"
        style={{
          backgroundImage: `url(${backrund.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "95vh",
        }}
      >
        <div className="container has-text-end pt-5 mt-5">
          <div className="hero-body has-text-end my-5 pt-5">
            <h1
              className="title is-1 has-text-weight-medium my-5 ml-5"
              style={{ color: "#188151", textShadow: "#efd9b6 0 0 0.1em" }}
            >
              Lemonade Stand 🍋
            </h1>
            <h2
              className="subtitle is-3 has-text-weight-normal my-5 ml-5"
              style={{ color: "#188151" }}
            >
              Lemonade Profit: $ {lemon}
            </h2>
            <div className="buttons is-end ml-5 mt-5">
              <button
                onClick={sellLemonade}
                className="button has-shadow mt-5"
                style={{ boxShadow: "#50f4a9 0 0 0.4em", color: "#188151" }}
              >
                Sælg Lemonade 🍋
              </button>
              <button
                onClick={buyLemons}
                className="button has-shadow mt-5"
                style={{ boxShadow: "#50f4a9 0 0 0.4em", color: "#188151" }}
              >
                Køb Citroner 🍋
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}