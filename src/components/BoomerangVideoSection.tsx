import React, { useState } from 'react';
import './BoomerangVideoSection.css';
import cartaoRoxinhoImg from '../../imgs/cartaoroxinho.png';

export const BoomerangVideoSection: React.FC = () => {
  const [cpf, setCpf] = useState('');

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 9) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    } else if (value.length > 6) {
      value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else if (value.length > 3) {
      value = value.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    }
    setCpf(value);
  };
  return (
    <section className="nu-boomerang-section">
      <div className="nu-boomerang-wrapper">
        <img
          src={cartaoRoxinhoImg}
          alt="Cartão Nubank roxo"
          className="nu-boomerang-video"
        />
        <div className="nu-boomerang-text">
          <h2 className="nu-boomerang-title">
            Tenha <span className="nu-boomerang-n">N</span> possibilidades
            <br />
            na sua vida. Peça seu
            <br />
            Nubank.
          </h2>
          <form
            className="nu-boomerang-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              className="nu-boomerang-input"
              placeholder="Digite seu CPF"
              value={cpf}
              onChange={handleCpfChange}
              maxLength={14}
            />
            <button type="submit" className="nu-boomerang-btn">
              Continuar
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
