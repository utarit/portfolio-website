import { useLanguage } from '../../contexts/LanguageContext';

export function SocialBanner() {
    const { t } = useLanguage();

    return (
        <div class="w-full px-4 py-2 bg-primary-600 text-white text-center">
            <p>{t('socialBanner')}</p>
            <a class="underline" target="_blank" href="https://www.instagram.com/secrethunters1/">
                @secrethunters1
            </a>
        </div>
    );
}