// app/[locale]/layout.jsx
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

// Importer directement les messages
import fr from '@/messages/fr.json';
import en from '@/messages/en.json';
import es from '@/messages/es.json';
import pt from '@/messages/pt.json';

const allMessages = { fr, en, es, pt };

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  
  const locales = ['fr', 'en', 'es', 'pt'];
  if (!locales.includes(locale)) notFound();

  const messages = allMessages[locale];

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}