import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/jetbrains-mono/index.css';
import '../styles/globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { site } from '@/site.config';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.nome} · ${site.cargo}`, template: `%s · ${site.nome}` },
  description: site.descricao,
  openGraph: {
    title: `${site.nome} · ${site.cargo}`,
    description: site.descricao,
    type: 'website',
    locale: 'pt_BR',
    url: site.url,
  },
};

export const viewport: Viewport = { themeColor: '#090514', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <a className="pular" href="#conteudo">
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
