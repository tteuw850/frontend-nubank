import React from 'react';
import './Footer.css';
import logoImg from '../assets/nubank-logo.png';

export const Footer: React.FC = () => {
  return (
    <footer className="nu-footer">
      <div className="nu-footer-container">
        <div className="nu-footer-left">
          <img src={logoImg} alt="Nubank Logo" className="nu-footer-logo" />
        </div>
        <p className="nu-footer-info">
          © 2025 Nu Pagamentos S.A. - Instituição de Pagamento. 18.236.120/0001-58.
          Rua Capote Valente, 39 - São Paulo, SP - 05409-000
        </p>
      </div>
    </footer>
  );
};
