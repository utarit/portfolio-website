import { createContext, useContext, createSignal, createEffect, JSX, Accessor } from 'solid-js';
import { translations, Language } from '../lib/translations/zehra';

interface LanguageContextType {
    language: Accessor<Language>;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>();

interface LanguageProviderProps {
    children: JSX.Element;
    initialLanguage?: Language;
}

export function LanguageProvider(props: LanguageProviderProps) {
    const [language, setLanguageSignal] = createSignal<Language>(props.initialLanguage || 'en');

    const setLanguage = (lang: Language) => {
        setLanguageSignal(lang);

        // Update URL based on language
        if (typeof window !== 'undefined') {
            const currentPath = window.location.pathname;

            if (lang === 'tr') {
                // If switching to Turkish, add /tr suffix
                if (!currentPath.endsWith('/tr')) {
                    window.location.href = `${currentPath}/tr`;
                }
            } else {
                // If switching to English, remove /tr suffix
                if (currentPath.endsWith('/tr')) {
                    window.location.href = currentPath.replace('/tr', '');
                }
            }
        }
    };

    const t = (key: string): string => {
        const keys = key.split('.');
        let value: any = translations[language()];

        for (const k of keys) {
            value = value?.[k];
        }

        return value || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {props.children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}