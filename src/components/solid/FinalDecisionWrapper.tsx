import { LanguageProvider } from "../../contexts/LanguageContext";
import { FinalDecisionForm } from "./FinalDecisionForm";
import type { Language } from "../../lib/translations/zehra";

interface FinalDecisionWrapperProps {
    language: Language;
}

export function FinalDecisionWrapper(props: FinalDecisionWrapperProps) {
    return (
        <LanguageProvider initialLanguage={props.language}>
            <FinalDecisionForm />
        </LanguageProvider>
    );
}