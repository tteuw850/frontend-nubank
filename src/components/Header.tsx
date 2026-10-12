import React, { useState } from 'react';
import './Header.css';
import logoImg from '../assets/nubank-logo.png';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="nu-header">
      <div className="nu-header-container">
        {/* Lado Esquerdo: Logo + Links */}
        <div className="nu-header-left">
          <a href="/" className="nu-logo-link" aria-label="Nubank Página Inicial">
            <img src={logoImg} alt="Nubank Logo" className="nu-logo-img" />
          </a>

          <nav className="nu-nav-links" aria-label="Navegação Principal">
            <a href="#para-voce" className="nu-nav-item">Para você</a>
            <a href="#para-seu-negocio" className="nu-nav-item">Para seu negócio</a>
            <a href="#seguranca" className="nu-nav-item">Segurança</a>
            <a href="#saiba-mais" className="nu-nav-item">Saiba Mais</a>
          </nav>
        </div>

        {/* Lado Direito: Ações / Botões */}
        <div className="nu-header-right">
          <button type="button" className="nu-btn nu-btn-outline">
            Login para empresas
          </button>
          <button type="button" className="nu-btn nu-btn-primary">
            Quero ser Nubank
          </button>
        </div>

        {/* Botão Hambúrguer Mobile */}
        <button
          type="button"
          className="nu-mobile-toggle"
          aria-label="Abrir menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="nu-hamburger-bar"></span>
          <span className="nu-hamburger-bar"></span>
          <span className="nu-hamburger-bar"></span>
        </button>
      </div>

      {/* Menu Dropdown Mobile */}
      {mobileMenuOpen && (
        <div className="nu-mobile-menu">
          <nav className="nu-mobile-nav">
            <a href="#para-voce" className="nu-mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
              Para você
            </a>
            <a href="#para-seu-negocio" className="nu-mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
              Para seu negócio
            </a>
            <a href="#seguranca" className="nu-mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
              Segurança
            </a>
            <a href="#saiba-mais" className="nu-mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
              Saiba Mais
            </a>
          </nav>
          <div className="nu-mobile-actions">
            <button type="button" className="nu-btn nu-btn-outline nu-btn-full">
              Login para empresas
            </button>
            <button type="button" className="nu-btn nu-btn-primary nu-btn-full">
              Quero ser Nubank
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
