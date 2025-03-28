"use client";

import Image from 'next/image';
import LemonadeLogo from '../../public/LemonadeLogo.png';
export default function Home() {
  return (
    <div>
      <section className="content has-background-white ">
          <div className="container has-background-white is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
            <a href="/" target="_blank" className="is-align-items-center">
            <Image src={LemonadeLogo} className="forside" alt="LemonadeLogo"  width={450} height={200} />
            </a>
            <h1 className="title is-1 has-text-weight-medium is-align-items-center" style={{ color: '#188151', textShadow: '#fad342 0 0 0.3em' }} > Lemonade Stand</h1>
            <div className="Køb">
                <button className="button is-large is-warning is-outlined is-inverted is-align-items-center" onClick={() => { window.location.href = '/lemonade-stand'; }}>
                  Velkommen
                </button>
            </div>
            <p className="is-size-4 is-align-items-center my-3 mx-5" style={{ color: '#188151' }}>
                Velkommen til Lemonade Stand! Her kan du købe den bedste lemonade i byen.
            </p>
          </div>
      </section>
    </div>
  );
}