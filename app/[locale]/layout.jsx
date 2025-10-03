// app/[locale]/layout.jsx
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import LanguagePersistence from './b2b/Components/LanguagePersistence';

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  
  const locales = ['fr', 'en', 'es', 'pt'];
  if (!locales.includes(locale)) notFound();

  // Import dynamique des messages
  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LanguagePersistence />
      {children}
    </NextIntlClientProvider>
  );
}