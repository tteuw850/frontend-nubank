import React from 'react';
import './MomentsSection.css';
import cardNubankImg from '../assets/card-nubank.jpg';
import cardUltravioletaImg from '../assets/card-ultravioleta.jpg';
import cardEmpresasImg from '../assets/card-empresas.jpg';

export const MomentsSection: React.FC = () => {
  return (
    <section className="nu-moments-section">
      <div className="nu-moments-container">
        {/* Título centralizado com a mesma quebra de linha e fonte */}
        <h2 className="nu-moments-title">
          Para cada momento, um Nubank
          <br />
          diferente
        </h2>

        {/* Grade com os 3 cards */}
        <div className="nu-moments-grid">
          {/* Card 1: Com imagem de fundo e texto centralizado Nubank */}
          <div className="nu-moment-card nu-moment-card-image">
            <img
              src={cardNubankImg}
              alt="Nubank para o seu momento"
              className="nu-card-bg-img"
            />
            <div className="nu-card-content-center">
              <span className="nu-card-title-white">Nubank</span>
            </div>
            <button
              type="button"
              className="nu-circle-plus-btn"
              aria-label="Expandir Nubank"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>

          {/* Card 2: Nu Ultravioleta com imagem e quebra de linha */}
          <div className="nu-moment-card nu-moment-card-image">
            <img
              src={cardUltravioletaImg}
              alt="Nu Ultravioleta"
              className="nu-card-bg-img"
            />
            <div className="nu-card-content-center">
              <span className="nu-card-title-white nu-card-title-multiline">
                Nu
                <br />
                Ultravioleta
              </span>
            </div>
            <button
              type="button"
              className="nu-circle-plus-btn"
              aria-label="Expandir Nu Ultravioleta"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>

          {/* Card 3: Nu Empresas com imagem e quebra de linha */}
          <div className="nu-moment-card nu-moment-card-image">
            <img
              src={cardEmpresasImg}
              alt="Nu Empresas"
              className="nu-card-bg-img"
            />
            <div className="nu-card-content-center">
              <span className="nu-card-title-white nu-card-title-multiline">
                Nu
                <br />
                Empresas
              </span>
            </div>
            <button
              type="button"
              className="nu-circle-plus-btn"
              aria-label="Expandir Nu Empresas"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
