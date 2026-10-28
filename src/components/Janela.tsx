import type { CSSProperties } from 'react';

type Props = {
  capa?: string;
  alt?: string;
  titulo: string;
  endereco?: string;
  grande?: boolean;
  estilo?: CSSProperties;
  className?: string;
};

/** Janela de navegador com a capa do projeto dentro. Marca visual do Quadra. */
export function Janela({ capa, alt = '', titulo, endereco, grande, estilo, className = '' }: Props) {
  return (
    <div className={`janela ${grande ? 'grande' : ''} ${className}`} style={estilo}>
      <div className="barra" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>{endereco ?? titulo.toLowerCase()}</span>
      </div>
      {capa ? (
        <div className="tela">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={capa} alt={alt} loading="lazy" decoding="async" />
        </div>
      ) : (
        <div className="tela sem-capa" role="img" aria-label={alt || titulo}>
          <b>{titulo}</b>
        </div>
      )}
    </div>
  );
}
