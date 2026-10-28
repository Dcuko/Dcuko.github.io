import type { Metadata } from 'next';
import { Formulario } from './Formulario';
import { site } from '@/site.config';

export const metadata: Metadata = {
  title: 'Contato',
  description: 'Fale comigo sobre o seu projeto.',
};

export default function Contato() {
  return (
    <div className="wrap">
      <div className="pagina-topo">
        <p className="rotulo">Vamos conversar</p>
        <h1 className="titulo">Contato</h1>
      </div>
      <div className="duas-colunas">
        <div className="contato-cartao">
          <p className="rotulo">Direto no e-mail</p>
          <p>
            <a className="mail" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
          <p>
            Conta o que você precisa, para quem é e para quando. Respondo por e-mail.
          </p>
        </div>
        <Formulario email={site.email} endpoint={site.formulario} />
      </div>
    </div>
  );
}
