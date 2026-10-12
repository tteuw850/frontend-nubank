import React from 'react';
import './EcosystemSection.css';
import ecosystemCardsImg from '../../imgs/Gemini_Generated_Image_pxl5lepxl5lepxl5.jpg';
import cartoesSideImg from '../../imgs/cartoes.jpg';

export const EcosystemSection: React.FC = () => {
  return (
    <section className="nu-ecosystem-wrapper">
      <div className="nu-ecosystem-container">
        <div className="nu-ecosystem-top-row">
          <div className="nu-ecosystem-text-col">
            <span className="nu-ecosystem-label">POSICIONAMENTO</span>

            <h2 className="nu-ecosystem-title">
              Um ecossistema
              <br />
              financeiro completo para
              <br />
              você
            </h2>

            <p className="nu-ecosystem-desc">
              Com a Nubank, sua operação tem acesso a uma estrutura
              <br />
              financeira moderna que conecta pagamentos, conta digital e
              <br />
              integrações tecnológicas em um único ambiente.
            </p>

            <p className="nu-ecosystem-tagline">
              <span className="nu-ecosystem-light">Menos complexidade.</span>
              <span className="nu-ecosystem-bold">Mais controle.</span>
              <span className="nu-ecosystem-highlight">Mais escala.</span>
            </p>
          </div>

          <div className="nu-ecosystem-side-row">
            <img
              src={cartoesSideImg}
              alt="Cartões Visa em círculo"
              className="nu-ecosystem-side-image"
            />
          </div>
        </div>

        <div className="nu-ecosystem-image-wrap">
          <img
            src={ecosystemCardsImg}
            alt="Cartões Nubank em leque roxo"
            className="nu-ecosystem-image"
          />
        </div>
      </div>
    </section>
  );
};
