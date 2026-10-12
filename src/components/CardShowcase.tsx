import React, { useState } from 'react';
import './CardShowcase.css';
import cardNubankImg from '../assets/card-clean-nubank.png';
import cardCromaImg from '../assets/card-clean-croma-vertical.png';
import cardUltravioletaImg from '../assets/card-clean-ultravioleta.png';
import cardEmpresasImg from '../assets/card-clean-empresas.png';

interface CardItem {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  image: string;
  backgroundTheme: string;
  textColor: string;
  titleColor: string;
  btnBg: string;
  btnColor: string;
  spinBg: string;
}

const CARDS_DATA: CardItem[] = [
  {
    id: 'nubank',
    title: 'Cartão Nubank',
    description: 'Sem anuidade, sem tarifas abusivas e o mais completo em crédito.',
    buttonText: 'Conheça o Cartão Nubank',
    image: cardNubankImg,
    backgroundTheme: '#f6e9fd',
    textColor: '#333333',
    titleColor: '#17052e',
    btnBg: '#820ad1',
    btnColor: '#ffffff',
    spinBg: '#820ad1',
  },
  {
    id: 'croma',
    title: 'Cartão Nubank\nCroma',
    description:
      'Cartão Platinum com 0,8% de cashback em todas as compras no crédito e 5% em assinaturas digitais.',
    buttonText: 'Conheça o Cartão Croma',
    image: cardCromaImg,
    backgroundTheme: '#f4ede4',
    textColor: '#820ad1',
    titleColor: '#820ad1',
    btnBg: '#820ad1',
    btnColor: '#ffffff',
    spinBg: '#820ad1',
  },
  {
    id: 'ultravioleta',
    title: 'Cartão\nUltravioleta',
    description:
      'Cartão Black que gera a partir de 2,2 pontos por dólar gasto ou 1,25% de cashback em cada compra no crédito.',
    buttonText: 'Conheça o Cartão Ultravioleta',
    image: cardUltravioletaImg,
    backgroundTheme: '#ece7f0',
    textColor: '#222222',
    titleColor: '#120224',
    btnBg: '#170526',
    btnColor: '#ffffff',
    spinBg: '#170526',
  },
  {
    id: 'empresas',
    title: 'Cartão Nu\nEmpresas',
    description: 'Sem anuidade, internacional e personalizado para o seu negócio.',
    buttonText: 'Conheça o Nu Empresas',
    image: cardEmpresasImg,
    backgroundTheme: '#efeaf5',
    textColor: '#333333',
    titleColor: '#111111',
    btnBg: '#6a498a',
    btnColor: '#ffffff',
    spinBg: '#6a498a',
  },
];

export const CardShowcase: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalRotation, setTotalRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  // visibleIndex controls which image is shown (switches mid-spin)
  const [visibleIndex, setVisibleIndex] = useState(0);

  const currentCard = CARDS_DATA[currentIndex];
  const visibleCard = CARDS_DATA[visibleIndex];

  const handleSpin = () => {
    if (isSpinning) return;

    const nextIndex = (currentIndex + 1) % CARDS_DATA.length;
    setIsSpinning(true);

    // Phase 1: rotate to 90° (card goes edge-on) — 500ms
    setTotalRotation((prev) => prev + 90);

    // At the 90° halfway point, swap the card image & text
    setTimeout(() => {
      setVisibleIndex(nextIndex);
      setCurrentIndex(nextIndex);
      // Phase 2: continue from 90° to 360° — another 600ms
      setTotalRotation((prev) => prev + 270);
    }, 500);

    // Unlock button after full rotation completes
    setTimeout(() => {
      setIsSpinning(false);
    }, 1100);
  };

  const handleDotClick = (idx: number) => {
    if (isSpinning || idx === currentIndex) return;
    setCurrentIndex(idx);
    setVisibleIndex(idx);
  };

  return (
    <section
      className="nu-showcase-wrapper"
      style={{ backgroundColor: currentCard.backgroundTheme }}
    >
      <div className="nu-showcase-container">

        {/* ── Lado Esquerdo: Texto do cartão atual (troca junto com o giro) ── */}
        <div className="nu-showcase-left" key={currentCard.id}>
          <h2
            className="nu-showcase-title"
            style={{ color: currentCard.titleColor }}
          >
            {currentCard.title.split('\n').map((line, i, arr) => (
              <React.Fragment key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h2>

          <p
            className="nu-showcase-desc"
            style={{ color: currentCard.textColor }}
          >
            {currentCard.description}
          </p>

          <button
            type="button"
            className="nu-showcase-cta"
            style={{
              backgroundColor: currentCard.btnBg,
              color: currentCard.btnColor,
            }}
          >
            {currentCard.buttonText}
          </button>
        </div>

        {/* ── Centro: Cartão + Botão de Rotação + Dots ── */}
        <div className="nu-showcase-card-display">
          {/* Área de perspectiva 3D */}
          <div className="nu-card-perspective">
            <img
              src={visibleCard.image}
              alt={visibleCard.title}
              className="nu-card-real-img"
              style={{ transform: `rotateY(${totalRotation}deg)` }}
            />
          </div>

          {/* Botão de rotação */}
          <button
            type="button"
            className="nu-spin-btn"
            onClick={handleSpin}
            disabled={isSpinning}
            aria-label="Girar para o próximo cartão"
            style={{ backgroundColor: currentCard.spinBg }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={isSpinning ? 'nu-spin-icon-active' : ''}
            >
              <path d="M21.5 2v6h-6" />
              <path d="M21.34 15.57a10 10 0 1 1-.57-8.38" />
            </svg>
          </button>

          {/* Dots alinhados com o cartão */}
          <div className="nu-showcase-dots">
            {CARDS_DATA.map((card, idx) => (
              <button
                key={card.id}
                type="button"
                className={`nu-dot${idx === currentIndex ? ' nu-dot-active' : ''}`}
                onClick={() => handleDotClick(idx)}
                aria-label={`Ver ${card.title}`}
                style={
                  idx === currentIndex
                    ? { backgroundColor: currentCard.spinBg }
                    : {}
                }
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
