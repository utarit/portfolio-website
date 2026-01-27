import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from './Button';

export function LanguageToggle() {
    const { language, setLanguage, t } = useLanguage();

    return (
        <div class="flex items-center gap-2 mb-4">
            <Button
                variant={language() === 'en' ? 'contained' : 'text'}
                color="primary"
                onClick={() => setLanguage('en')}
                size="sm"
            >
                {t('language.english')}
            </Button>
            <Button
                variant={language() === 'tr' ? 'contained' : 'text'}
                color="primary"
                onClick={() => setLanguage('tr')}
                size="sm"
            >
                {t('language.turkish')}
            </Button>
        </div>
    );
}