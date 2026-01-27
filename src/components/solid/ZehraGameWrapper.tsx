import { LanguageProvider } from '../../contexts/LanguageContext';
import { SocialBanner } from './SocialBanner';
import { LanguageToggle } from './LanguageToggle';
import { GameContent } from './GameContent';

interface ZehraGameWrapperProps {
    initialLanguage: 'en' | 'tr';
}

export function ZehraGameWrapper(props: ZehraGameWrapperProps) {
    return (
        <LanguageProvider initialLanguage={props.initialLanguage}>
            <main>
                <SocialBanner />

                <div class="flex flex-col justify-center items-center my-4 md:mb-0 gap-4 px-4">
                    <LanguageToggle />
                    <GameContent />
                </div>
            </main>
        </LanguageProvider>
    );
}
