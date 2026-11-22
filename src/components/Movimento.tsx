'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Tudo o que deve entrar com animação quando aparece na tela.
const ALVOS = [
  '.secao-topo',
  '.lista > li',
  '.repos > li',
  '.principios > li',
  '.stack-barra',
  '.stack-legenda > li',
  '.meta-grade > div',
  '.metricas > div',
  '.proj-capa',
  '.proj-corpo-mdx > *',
  '.duas-colunas > *',
  '.pagina-topo > *',
  '.rodape-cta .rotulo',
  '.rodape-cta h2',
  '.rodape-cta .acoes',
  '.prox a',
].join(',');

/**
 * Revela os blocos ao rolar e faz o hero reagir ao mouse.
 * Sem JS, ou com "reduzir movimento" ligado, nada fica escondido.
 */
export function Movimento() {
  const caminho = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('vi');
          io.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
    );

    const marcados: HTMLElement[] = [];
    document.querySelectorAll<HTMLElement>(ALVOS).forEach((el) => {
      // o que já está na tela fica como está; só esconde o que ainda vai aparecer
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
      const pos = el.parentElement ? Array.from(el.parentElement.children).indexOf(el) : 0;
      el.style.setProperty('--atraso', `${Math.min(pos, 5) * 80}ms`);
      el.setAttribute('data-r', '');
      marcados.push(el);
      io.observe(el);
    });

    return () => {
      io.disconnect();
      for (const el of marcados) {
        el.removeAttribute('data-r');
        el.classList.remove('vi');
        el.style.removeProperty('--atraso');
      }
    };
  }, [caminho]);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) return;
    const hero = document.querySelector<HTMLElement>('.hero');
    if (!hero) return;

    let quadro = 0;
    const mover = (e: PointerEvent) => {
      cancelAnimationFrame(quadro);
      quadro = requestAnimationFrame(() => {
        hero.style.setProperty('--mx', String((e.clientX / window.innerWidth) * 2 - 1));
        hero.style.setProperty('--my', String((e.clientY / window.innerHeight) * 2 - 1));
      });
    };
    window.addEventListener('pointermove', mover, { passive: true });
    return () => {
      window.removeEventListener('pointermove', mover);
      cancelAnimationFrame(quadro);
    };
  }, [caminho]);

  return null;
}
