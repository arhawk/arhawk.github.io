import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'portfolio-locale';

const LanguageContext = createContext(null);

const readStoredLocale = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'zh' ? 'zh' : 'en';
  } catch {
    return 'en';
  }
};

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState(readStoredLocale);

  const setLocale = (nextLocale) => {
    const value = nextLocale === 'zh' ? 'zh' : 'en';
    setLocaleState(value);

    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Ignore storage failures and keep the in-memory locale.
    }
  };

  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en';
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale }), [locale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLocale() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLocale must be used within LanguageProvider');
  }

  return context;
}
