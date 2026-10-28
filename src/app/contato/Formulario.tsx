'use client';

import { useState, type FormEvent } from 'react';

type Props = { email: string; endpoint: string };

export function Formulario({ email, endpoint }: Props) {
  const [estado, setEstado] = useState<'ocioso' | 'enviando' | 'ok' | 'erro'>('ocioso');

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const dados = new FormData(form);
    if (!endpoint) {
      // Sem serviço de formulário configurado: abre o e-mail do visitante já preenchido.
      const assunto = encodeURIComponent(`Contato pelo portfólio — ${dados.get('nome')}`);
      const corpo = encodeURIComponent(`${dados.get('mensagem')}\n\n${dados.get('nome')} (${dados.get('email')})`);
      window.location.href = `mailto:${email}?subject=${assunto}&body=${corpo}`;
      return;
    }
    setEstado('enviando');
    try {
      const r = await fetch(endpoint, { method: 'POST', body: dados, headers: { Accept: 'application/json' } });
      if (!r.ok) throw new Error();
      form.reset();
      setEstado('ok');
    } catch {
      setEstado('erro');
    }
  }

  return (
    <form className="form" onSubmit={enviar}>
      <label>
        Nome
        <input name="nome" required autoComplete="name" />
      </label>
      <label>
        E-mail
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <label>
        Mensagem
        <textarea name="mensagem" required />
      </label>
      <div>
        <button className="btn" type="submit" disabled={estado === 'enviando'}>
          {estado === 'enviando' ? 'Enviando…' : 'Enviar'}
        </button>
      </div>
      <div aria-live="polite">
        {estado === 'ok' && <p className="form-aviso">Mensagem enviada. Respondo em breve.</p>}
        {estado === 'erro' && (
          <p className="form-aviso">Não consegui enviar. Escreva direto para {email}.</p>
        )}
      </div>
    </form>
  );
}
