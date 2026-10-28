import Link from 'next/link';

export default function NaoEncontrada() {
  return (
    <div className="wrap">
      <div className="pagina-topo" style={{ paddingBottom: 'clamp(48px,8vw,120px)' }}>
        <p className="rotulo">Erro 404</p>
        <h1 className="titulo">Página não encontrada.</h1>
        <p style={{ margin: '28px 0', color: 'var(--lilas)' }}>O endereço não existe ou mudou de lugar.</p>
        <Link className="btn" href="/">
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}
