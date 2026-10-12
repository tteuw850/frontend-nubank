import React, { useEffect, useRef, useState } from 'react';
import './ScrollVideo.css';

interface ScrollVideoProps {
  totalFrames?: number;
}

export const ScrollVideo: React.FC<ScrollVideoProps> = ({
  totalFrames = 200,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(1);
  const targetFrameRef = useRef<number>(1);
  const [loadedCount, setLoadedCount] = useState(0);
  const [cpf, setCpf] = useState('');

  // Formatar CPF
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

  // Pré-carregamento dos frames em cache de memória
  useEffect(() => {
    let isMounted = true;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(4, '0');
      img.src = `/frames/frame_${paddedIndex}.jpg`;
      img.onload = () => {
        if (isMounted) {
          setLoadedCount((prev) => prev + 1);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      isMounted = false;
    };
  }, [totalFrames]);

  // Função para desenhar a imagem mantendo a proporção (object-fit: cover) em resolução nítida
  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const img = imagesRef.current[frameIndex - 1];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    const targetWidth = Math.round(displayWidth * dpr);
    const targetHeight = Math.round(displayHeight * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = canvas.width / canvas.height;

    let renderWidth = canvas.width;
    let renderHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      renderWidth = canvas.width;
      renderHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - renderHeight) / 2;
    } else {
      renderHeight = canvas.height;
      renderWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - renderWidth) / 2;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
  };

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const totalScrollableDistance = container.offsetHeight - windowHeight;
      if (totalScrollableDistance <= 0) return;

      const currentScroll = -rect.top;
      const scrollRatio = Math.min(
        Math.max(currentScroll / totalScrollableDistance, 0),
        1
      );

      const frameToRender = Math.min(
        Math.max(Math.round(1 + scrollRatio * (totalFrames - 1)), 1),
        totalFrames
      );

      targetFrameRef.current = frameToRender;
    };

    const renderLoop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) >= 0.2) {
        currentFrameRef.current += diff * 0.35;
        drawFrame(Math.round(currentFrameRef.current));
      } else if (currentFrameRef.current !== targetFrameRef.current) {
        currentFrameRef.current = targetFrameRef.current;
        drawFrame(targetFrameRef.current);
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', () => {
      handleScroll();
      drawFrame(Math.round(currentFrameRef.current));
    });

    handleScroll();
    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [totalFrames]);

  useEffect(() => {
    if (loadedCount >= 1) {
      drawFrame(1);
    }
  }, [loadedCount]);

  const progressPercent = Math.min(
    Math.max(((currentFrameRef.current - 1) / (totalFrames - 1)) * 100, 0),
    100
  );

  return (
    <div className="nu-scroll-section" ref={containerRef}>
      <div className="nu-sticky-wrapper">
        <canvas ref={canvasRef} className="nu-scroll-canvas" />

        {/* Película escura sutil com vinheta para acabamento cinematográfico */}
        <div className="nu-dark-overlay" />

        {/* Canto Superior Direito: Card translúcido com input de CPF e botão '+' */}
        <div className="nu-cpf-card-wrapper">
          <div className="nu-cpf-card">
            <input
              type="text"
              className="nu-cpf-input"
              placeholder="Digite seu CPF"
              value={cpf}
              onChange={handleCpfChange}
              maxLength={14}
            />
            <button
              type="button"
              className="nu-cpf-submit-btn"
              aria-label="Continuar cadastro com CPF"
            >
              <svg
                width="16"
                height="16"
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

        {/* Canto Inferior Esquerdo: Frase 'Um cartão que faz mais por você' */}
        <div className="nu-bottom-left-headline">
          <h1 className="nu-hero-phrase">
            Um cartão que faz <br /> mais por você
          </h1>
        </div>

        {/* Spinner suave inicial */}
        {loadedCount < 10 && (
          <div className="nu-loading-indicator">
            <div className="nu-loading-spinner" />
          </div>
        )}

        {/* Barra de progresso discreta */}
        <div className="nu-video-overlay">
          <div className="nu-progress-track">
            <div
              className="nu-progress-bar"
              style={{ width: `${progressPercent.toFixed(1)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
