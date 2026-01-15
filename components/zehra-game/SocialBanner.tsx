'use client'

import { useLanguage } from "@/contexts/LanguageContext";

export const SocialBanner = () => {
    const { t } = useLanguage();

    return (
        <div className="w-full px-4 py-2 bg-primary-600 text-white text-center">
            <p>{t("socialBanner")}</p>
            <a className="underline" target="_blank" href="https://www.instagram.com/secrethunters1/">@secrethunters1</a>
        </div>
    );
}