import { createSignal, createEffect, Show, For } from "solid-js";
import { useLanguage } from "../../contexts/LanguageContext";
import { ResultBar } from "./ResultBar";
import { Button } from "./Button";

interface FormData {
    initialConclusion: string;
    responsible: string[];
    carAccident: string;
    hospitalReason: string;
    finalAction: string;
}

interface ResultsData {
    totalResponses: number;
    results: {
        initialConclusion: Record<string, number>;
        responsible: Record<string, number>;
        carAccident: Record<string, number>;
        hospitalReason: Record<string, number>;
        finalAction: Record<string, number>;
    };
}

const STORAGE_KEY = "zehra-final-decision-data";

// Mock data for development
const MOCK_RESULTS: ResultsData = {
    totalResponses: 25,
    results: {
        initialConclusion: {
            killed: 8,
            kidnapped: 12,
            suicide: 3,
            escapedAlone: 2,
        },
        responsible: {
            mahmut: 10,
            semra: 8,
            nedim: 7,
            none: 5,
            kerim: 3,
        },
        carAccident: {
            mahmut: 15,
            semra: 4,
            nedim: 4,
            other: 2,
        },
        hospitalReason: {
            miscarriage: 18,
            panic: 4,
            bloodSugar: 2,
            unknown: 1,
        },
        finalAction: {
            goToPolice: 16,
            keepSecret: 9,
        },
    },
};

const NAMES = [
    { value: "mahmut", label: "Mahmut" },
    { value: "kerim", label: "Kerim" },
    { value: "nuray", label: "Nuray" },
    { value: "fatma", label: "Fatma" },
    { value: "riza", label: "Rıza" },
    { value: "sinan", label: "Sinan" },
    { value: "yeliz", label: "Yeliz" },
    { value: "semra", label: "Semra" },
    { value: "nedim", label: "Nedim" },
];

export function FinalDecisionForm() {
    const { t } = useLanguage();

    const [formData, setFormData] = createSignal<FormData>({
        initialConclusion: "",
        responsible: [],
        carAccident: "",
        hospitalReason: "",
        finalAction: "",
    });

    const [isSubmitted, setIsSubmitted] = createSignal(false);
    const [resultsData, setResultsData] = createSignal<ResultsData | null>(null);
    const [isLoading, setIsLoading] = createSignal(false);

    // Check localStorage on mount
    createEffect(() => {
        if (typeof window !== "undefined") {
            const savedData = localStorage.getItem(STORAGE_KEY);
            if (savedData) {
                try {
                    const parsedData = JSON.parse(savedData);
                    setFormData(parsedData.formData);
                    setIsSubmitted(true);
                    fetchResults();
                } catch (err) {
                    console.error("Error parsing saved data:", err);
                }
            }
        }
    });

    const fetchResults = async () => {
        try {
            setIsLoading(true);
            const response = await fetch("/api/zehra-survey?action=getResults");
            if (!response.ok) throw new Error("Failed to fetch results");
            const data = await response.json();
            setResultsData(data);
        } catch (err) {
            console.error("Error fetching results:", err);
            console.log("Using mock data as fallback");
            setResultsData(MOCK_RESULTS);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: Event) => {
        e.preventDefault();

        const data = formData();

        // Validate required fields
        if (
            !data.initialConclusion ||
            data.responsible.length === 0 ||
            !data.carAccident ||
            !data.hospitalReason ||
            !data.finalAction
        ) {
            alert(t("finalDecision.validation.required"));
            return;
        }

        setIsLoading(true);

        try {
            // Submit to API
            const response = await fetch("/api/zehra-survey", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    action: "submitForm",
                    data: data,
                    timestamp: new Date().toISOString(),
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to submit form");
            }

            // Save to localStorage after successful submission
            if (typeof window !== "undefined") {
                localStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify({
                        formData: data,
                        submittedAt: new Date().toISOString(),
                    })
                );
            }

            setIsSubmitted(true);
            await fetchResults();
        } catch (err) {
            console.error("Error submitting form:", err);
            
            // Even if API fails, save locally and show results
            if (typeof window !== "undefined") {
                localStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify({
                        formData: data,
                        submittedAt: new Date().toISOString(),
                    })
                );
            }

            setIsSubmitted(true);
            await fetchResults();
            
            console.warn("Form saved locally, but API submission may have failed");
        } finally {
            setIsLoading(false);
        }
    };

    const handleRadioChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleCheckboxChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => {
            const currentValues = prev[field] as string[];
            const newValues = currentValues.includes(value)
                ? currentValues.filter((v) => v !== value)
                : [...currentValues, value];
            return { ...prev, [field]: newValues };
        });
    };

    const resetForm = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem(STORAGE_KEY);
        }
        setIsSubmitted(false);
        setResultsData(null);
        setFormData({
            initialConclusion: "",
            responsible: [],
            carAccident: "",
            hospitalReason: "",
            finalAction: "",
        });
    };

    const getPercentage = (value: number, total: number) => {
        return total > 0 ? ((value / total) * 100).toFixed(1) : "0";
    };

    return (
        <div class="container mx-auto px-4 py-24">
            <div class="max-w-4xl mx-auto">
                <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                    <Show when={isLoading()}>
                        <div class="text-center py-8">
                            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                            <p class="mt-2 dark:text-gray-300">{t("finalDecision.loading")}</p>
                        </div>
                    </Show>

                    <Show when={isSubmitted() && !isLoading()}>
                        <div class="space-y-8">
                            <div class="text-center">
                                <h2 class="text-2xl font-bold mb-4 dark:text-white">
                                    {t("finalDecision.results.title")}
                                </h2>
                                <p class="mb-6 dark:text-gray-300">
                                    {t("finalDecision.results.totalResponses")}{" "}
                                    {resultsData()?.totalResponses}
                                </p>
                            </div>

                            {/* Your Answers */}
                            <div class="bg-blue-50 dark:bg-gray-700 p-6 rounded-lg">
                                <h3 class="text-lg font-semibold mb-4 dark:text-white">
                                    {t("finalDecision.results.yourAnswers")}
                                </h3>
                                <div class="space-y-2 text-sm dark:text-gray-300">
                                    <p>
                                        <strong>{t("finalDecision.questions.initialConclusion")}:</strong>{" "}
                                        {t(`finalDecision.options.${formData().initialConclusion}`)}
                                    </p>
                                    <p>
                                        <strong>{t("finalDecision.questions.responsible")}:</strong>{" "}
                                        <span class="capitalize">
                                            {formData().responsible.map((r) =>
                                                r === "none" ? t("finalDecision.options.none") : r
                                            ).join(", ")}
                                        </span>
                                    </p>
                                    <p>
                                        <strong>{t("finalDecision.questions.carAccident")}:</strong>{" "}
                                        <span class="capitalize">
                                            {formData().carAccident === "other"
                                                ? t("finalDecision.options.other")
                                                : formData().carAccident}
                                        </span>
                                    </p>
                                    <p>
                                        <strong>{t("finalDecision.questions.hospitalReason")}:</strong>{" "}
                                        {t(`finalDecision.options.${formData().hospitalReason}`)}
                                    </p>
                                    <p>
                                        <strong>{t("finalDecision.questions.finalAction")}:</strong>{" "}
                                        {t(`finalDecision.options.${formData().finalAction}`)}
                                    </p>
                                </div>
                            </div>

                            {/* Results Charts */}
                            <Show when={resultsData()}>
                                {(data) => (
                                    <div class="grid gap-6 md:grid-cols-2">
                                        {/* Initial Conclusion Results */}
                                        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
                                            <h4 class="font-semibold mb-4 dark:text-white">
                                                {t("finalDecision.questions.initialConclusion")}
                                            </h4>
                                            <div class="space-y-3">
                                                <For each={Object.entries(data().results.initialConclusion)}>
                                                    {([key, value]) => (
                                                        <ResultBar
                                                            label={t(`finalDecision.options.${key}`)}
                                                            percentage={getPercentage(value, data().totalResponses)}
                                                            color="bg-blue-600"
                                                        />
                                                    )}
                                                </For>
                                            </div>
                                        </div>

                                        {/* Responsible Person Results */}
                                        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
                                            <h4 class="font-semibold mb-4 dark:text-white">
                                                {t("finalDecision.questions.responsible")}
                                            </h4>
                                            <div class="space-y-3">
                                                <For each={Object.entries(data().results.responsible).sort(([, a], [, b]) => b - a)}>
                                                    {([key, value]) => (
                                                        <ResultBar
                                                            label={key === "none"
                                                                ? t("finalDecision.options.none")
                                                                : NAMES.find((n) => n.value === key)?.label || key}
                                                            percentage={getPercentage(value, data().totalResponses)}
                                                            color="bg-yellow-500"
                                                        />
                                                    )}
                                                </For>
                                            </div>
                                        </div>

                                        {/* Hospital Reason Results */}
                                        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
                                            <h4 class="font-semibold mb-4 dark:text-white">
                                                {t("finalDecision.questions.hospitalReason")}
                                            </h4>
                                            <div class="space-y-3">
                                                <For each={Object.entries(data().results.hospitalReason)}>
                                                    {([key, value]) => (
                                                        <ResultBar
                                                            label={t(`finalDecision.options.${key}`)}
                                                            percentage={getPercentage(value, data().totalResponses)}
                                                            color="bg-purple-600"
                                                        />
                                                    )}
                                                </For>
                                            </div>
                                        </div>

                                        {/* Car Accident Results */}
                                        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
                                            <h4 class="font-semibold mb-4 dark:text-white">
                                                {t("finalDecision.questions.carAccident")}
                                            </h4>
                                            <div class="space-y-3">
                                                <For each={Object.entries(data().results.carAccident)}>
                                                    {([key, value]) => (
                                                        <ResultBar
                                                            label={key === "other"
                                                                ? t("finalDecision.options.other")
                                                                : NAMES.find((n) => n.value === key)?.label || key}
                                                            percentage={getPercentage(value, data().totalResponses)}
                                                            color="bg-red-600"
                                                        />
                                                    )}
                                                </For>
                                            </div>
                                        </div>

                                        {/* Final Action Results */}
                                        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700 md:col-span-2">
                                            <h4 class="font-semibold mb-4 dark:text-white">
                                                {t("finalDecision.questions.finalAction")}
                                            </h4>
                                            <div class="space-y-3">
                                                <For each={Object.entries(data().results.finalAction)}>
                                                    {([key, value]) => (
                                                        <ResultBar
                                                            label={t(`finalDecision.options.${key}`)}
                                                            percentage={getPercentage(value, data().totalResponses)}
                                                            color="bg-green-600"
                                                        />
                                                    )}
                                                </For>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Show>

                            <div class="pt-6 text-center">
                                <Button onClick={resetForm} variant="text">
                                    {t("finalDecision.results.retake")}
                                </Button>
                            </div>
                        </div>
                    </Show>

                    <Show when={!isSubmitted() && !isLoading()}>
                        <h1 class="text-3xl font-bold mb-6 dark:text-white">
                            {t("finalDecision.title")}
                        </h1>

                        <form onSubmit={handleSubmit} class="space-y-8">
                            {/* Initial Conclusion */}
                            <div>
                                <h2 class="text-lg font-semibold mb-4 dark:text-white">
                                    {t("finalDecision.questions.initialConclusion")}
                                </h2>
                                <div class="space-y-2">
                                    <For each={[
                                        { value: "killed", label: t("finalDecision.options.killed") },
                                        { value: "kidnapped", label: t("finalDecision.options.kidnapped") },
                                        { value: "suicide", label: t("finalDecision.options.suicide") },
                                        { value: "escapedAlone", label: t("finalDecision.options.escapedAlone") },
                                    ]}>
                                        {(option) => (
                                            <label class="flex items-center space-x-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="initialConclusion"
                                                    value={option.value}
                                                    checked={formData().initialConclusion === option.value}
                                                    onChange={(e) => handleRadioChange("initialConclusion", e.currentTarget.value)}
                                                    class="text-blue-600"
                                                />
                                                <span class="dark:text-gray-300">{option.label}</span>
                                            </label>
                                        )}
                                    </For>
                                </div>
                            </div>

                            {/* Responsible Person (Checkbox) */}
                            <div>
                                <h2 class="text-lg font-semibold mb-4 dark:text-white">
                                    {t("finalDecision.questions.responsible")}
                                </h2>
                                <div class="space-y-2">
                                    <For each={[
                                        { value: "none", label: t("finalDecision.options.none") },
                                        ...NAMES,
                                    ]}>
                                        {(option) => (
                                            <label class="flex items-center space-x-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    name="responsible"
                                                    value={option.value}
                                                    checked={formData().responsible.includes(option.value)}
                                                    onChange={(e) => handleCheckboxChange("responsible", e.currentTarget.value)}
                                                    class="text-blue-600"
                                                />
                                                <span class="dark:text-gray-300">{option.label}</span>
                                            </label>
                                        )}
                                    </For>
                                </div>
                            </div>

                            {/* Car Accident */}
                            <div>
                                <h2 class="text-lg font-semibold mb-4 dark:text-white">
                                    {t("finalDecision.questions.carAccident")}
                                </h2>
                                <div class="space-y-2">
                                    <For each={[
                                        ...NAMES,
                                        { value: "other", label: t("finalDecision.options.other") },
                                    ]}>
                                        {(option) => (
                                            <label class="flex items-center space-x-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="carAccident"
                                                    value={option.value}
                                                    checked={formData().carAccident === option.value}
                                                    onChange={(e) => handleRadioChange("carAccident", e.currentTarget.value)}
                                                    class="text-blue-600"
                                                />
                                                <span class="dark:text-gray-300">{option.label}</span>
                                            </label>
                                        )}
                                    </For>
                                </div>
                            </div>

                            {/* Hospital Reason */}
                            <div>
                                <h2 class="text-lg font-semibold mb-4 dark:text-white">
                                    {t("finalDecision.questions.hospitalReason")}
                                </h2>
                                <div class="space-y-2">
                                    <For each={[
                                        { value: "bloodSugar", label: t("finalDecision.options.bloodSugar") },
                                        { value: "kidneyFailure", label: t("finalDecision.options.kidneyFailure") },
                                        { value: "panic", label: t("finalDecision.options.panic") },
                                        { value: "miscarriage", label: t("finalDecision.options.miscarriage") },
                                        { value: "cancer", label: t("finalDecision.options.cancer") },
                                        { value: "allergy", label: t("finalDecision.options.allergy") },
                                        { value: "sprain", label: t("finalDecision.options.sprain") },
                                        { value: "asthma", label: t("finalDecision.options.asthma") },
                                        { value: "unknown", label: t("finalDecision.options.unknown") },
                                        { value: "didntGo", label: t("finalDecision.options.didntGo") },
                                    ]}>
                                        {(option) => (
                                            <label class="flex items-center space-x-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="hospitalReason"
                                                    value={option.value}
                                                    checked={formData().hospitalReason === option.value}
                                                    onChange={(e) => handleRadioChange("hospitalReason", e.currentTarget.value)}
                                                    class="text-blue-600"
                                                />
                                                <span class="dark:text-gray-300">{option.label}</span>
                                            </label>
                                        )}
                                    </For>
                                </div>
                            </div>

                            {/* Final Action */}
                            <div>
                                <h2 class="text-lg font-semibold mb-4 dark:text-white">
                                    {t("finalDecision.questions.finalAction")}
                                </h2>
                                <div class="space-y-2">
                                    <For each={[
                                        { value: "keepSecret", label: t("finalDecision.options.keepSecret") },
                                        { value: "goToPolice", label: t("finalDecision.options.goToPolice") },
                                    ]}>
                                        {(option) => (
                                            <label class="flex items-center space-x-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="finalAction"
                                                    value={option.value}
                                                    checked={formData().finalAction === option.value}
                                                    onChange={(e) => handleRadioChange("finalAction", e.currentTarget.value)}
                                                    class="text-blue-600"
                                                />
                                                <span class="dark:text-gray-300">{option.label}</span>
                                            </label>
                                        )}
                                    </For>
                                </div>
                            </div>

                            <div class="pt-6">
                                <Button
                                    type="submit"
                                    color="primary"
                                    class="w-full"
                                    disabled={
                                        !formData().initialConclusion ||
                                        formData().responsible.length === 0 ||
                                        !formData().carAccident ||
                                        !formData().hospitalReason ||
                                        !formData().finalAction
                                    }
                                >
                                    {t("finalDecision.submit")}
                                </Button>
                            </div>
                        </form>
                    </Show>
                </div>
            </div>
        </div>
    );
}