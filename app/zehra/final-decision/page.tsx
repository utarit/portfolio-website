"use client";

import { useEffect, useState } from "react";

import { ResultBar } from "@/components/zehra-game/ResultBar";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/design-system/Button";
import { Card } from "@/design-system/Card";

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

// Use Vercel API route instead of Google Apps Script for better CORS handling
const API_URL = "/api/zehra-survey";
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

const FinalDecisionPage = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    initialConclusion: "",
    responsible: [],
    carAccident: "",
    hospitalReason: "",
    finalAction: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resultsData, setResultsData] = useState<ResultsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user has already submitted
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
  }, []);

  const fetchResults = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}?action=getResults`);
      if (!response.ok) throw new Error("Failed to fetch results");
      const data = await response.json();
      setResultsData(data);
    } catch (err) {
      console.error("Error fetching results:", err);
      console.log("Using mock data for development");
      // Use mock data as fallback for development
      setResultsData(MOCK_RESULTS);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.initialConclusion || formData.responsible.length === 0 ||
      !formData.carAccident || !formData.hospitalReason || !formData.finalAction
    ) {
      alert(t("finalDecision.validation.required"));
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Submit to Vercel API
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "submitForm",
          data: formData,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Failed to submit form");

      // Save to localStorage
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          formData,
          submittedAt: new Date().toISOString(),
        }),
      );

      setIsSubmitted(true);
      await fetchResults();
    } catch (err) {
      console.error("Error submitting form:", err);

      // Even if submission fails, save locally and show results
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          formData,
          submittedAt: new Date().toISOString(),
        }),
      );

      setIsSubmitted(true);
      await fetchResults();

      // Show a warning but don't block the user
      console.warn("Form data saved locally, but not submitted to server");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRadioChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: string, value: string) => {
    setFormData((prev) => {
      const currentValues = prev[field as keyof typeof prev] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      return { ...prev, [field]: newValues };
    });
  };

  const resetForm = () => {
    localStorage.removeItem(STORAGE_KEY);
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

  const renderResults = () => {
    if (!resultsData) return null;

    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            {t("finalDecision.results.title")}
          </h2>
          <p className="mb-6">
            {t("finalDecision.results.totalResponses")}{" "}
            {resultsData.totalResponses}
          </p>
        </div>

        {/* Your Answers */}
        <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            {t("finalDecision.results.yourAnswers")}
          </h3>
          <div className="space-y-2 text-sm">
            <p>
              <strong>{t("finalDecision.questions.initialConclusion")}:</strong>
              {" "}
              {t(`finalDecision.options.${formData.initialConclusion}`)}
            </p>
            <p>
              <strong>{t("finalDecision.questions.responsible")}:</strong>{" "}
              <span className="capitalize">
                {formData.responsible.map((r) =>
                  r === "none" ? t("finalDecision.options.none") : r
                ).join(", ")}
              </span>
            </p>
            <p>
              <strong>{t("finalDecision.questions.carAccident")}:</strong>{" "}
              <span className="capitalize">
                {formData.carAccident === "other"
                  ? t("finalDecision.options.other")
                  : formData.carAccident}
              </span>
            </p>
            <p>
              <strong>{t("finalDecision.questions.hospitalReason")}:</strong>
              {" "}
              {t(`finalDecision.options.${formData.hospitalReason}`)}
            </p>
            <p>
              <strong>{t("finalDecision.questions.finalAction")}:</strong>{" "}
              {t(`finalDecision.options.${formData.finalAction}`)}
            </p>
          </div>
        </div>

        {/* Results Charts */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Initial Conclusion Results */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
            <h4 className="font-semibold mb-4">
              {t("finalDecision.questions.initialConclusion")}
            </h4>
            <div className="space-y-3">
              {Object.entries(resultsData.results.initialConclusion).map((
                [key, value],
              ) => (
                <ResultBar
                  key={key}
                  label={t(`finalDecision.options.${key}`)}
                  percentage={getPercentage(
                    value,
                    resultsData.totalResponses,
                  )}
                  color="bg-blue-600"
                />
              ))}
            </div>
          </div>

          {/* Responsible Person Results */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
            <h4 className="font-semibold mb-4">
              {t("finalDecision.questions.responsible")}
            </h4>
            <div className="space-y-3">
              {Object.entries(resultsData.results.responsible)
                .sort(([, a], [, b]) => b - a)
                .map(([key, value]) => (
                  <ResultBar
                    key={key}
                    label={key === "none"
                      ? t("finalDecision.options.none")
                      : NAMES.find((n) => n.value === key)?.label || key}
                    percentage={getPercentage(
                      value,
                      resultsData.totalResponses,
                    )}
                    color="bg-yellow-500"
                  />
                ))}
            </div>
          </div>

          {/* Hospital Reason Results */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
            <h4 className="font-semibold mb-4">
              {t("finalDecision.questions.hospitalReason")}
            </h4>
            <div className="space-y-3">
              {Object.entries(resultsData.results.hospitalReason).map((
                [key, value],
              ) => (
                <ResultBar
                  key={key}
                  label={t(`finalDecision.options.${key}`)}
                  percentage={getPercentage(
                    value,
                    resultsData.totalResponses,
                  )}
                  color="bg-purple-600"
                />
              ))}
            </div>
          </div>

          {/* Car Accident Results */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
            <h4 className="font-semibold mb-4">
              {t("finalDecision.questions.carAccident")}
            </h4>
            <div className="space-y-3">
              {Object.entries(resultsData.results.carAccident).map((
                [key, value],
              ) => (
                <ResultBar
                  key={key}
                  label={key === "other"
                    ? t("finalDecision.options.other")
                    : NAMES.find((n) => n.value === key)?.label || key}
                  percentage={getPercentage(
                    value,
                    resultsData.totalResponses,
                  )}
                  color="bg-red-600"
                />
              ))}
            </div>
          </div>

          {/* Final Action Results */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border md:col-span-2">
            <h4 className="font-semibold mb-4">
              {t("finalDecision.questions.finalAction")}
            </h4>
            <div className="space-y-3">
              {Object.entries(resultsData.results.finalAction).map((
                [key, value],
              ) => (
                <ResultBar
                  key={key}
                  label={t(`finalDecision.options.${key}`)}
                  percentage={getPercentage(
                    value,
                    resultsData.totalResponses,
                  )}
                  color="bg-green-600"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-4xl mx-auto">
        <Card>
          <div className="p-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            {isLoading && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600">
                </div>
                <p className="mt-2">{t("finalDecision.loading")}</p>
              </div>
            )}

            {isSubmitted && !isLoading
              ? (
                renderResults()
              )
              : !isLoading
              ? (
                <>
                  <h1 className="text-3xl font-bold mb-6">
                    {t("finalDecision.title")}
                  </h1>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Initial Conclusion */}
                    <div>
                      <h2 className="text-lg font-semibold mb-4">
                        {t("finalDecision.questions.initialConclusion")}
                      </h2>
                      <div className="space-y-2">
                        {[
                          {
                            value: "killed",
                            label: t("finalDecision.options.killed"),
                          },
                          {
                            value: "kidnapped",
                            label: t("finalDecision.options.kidnapped"),
                          },
                          {
                            value: "suicide",
                            label: t("finalDecision.options.suicide"),
                          },
                          {
                            value: "escapedAlone",
                            label: t("finalDecision.options.escapedAlone"),
                          },
                        ].map((option) => (
                          <label
                            key={option.value}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="radio"
                              name="initialConclusion"
                              value={option.value}
                              checked={formData.initialConclusion ===
                                option.value}
                              onChange={(e) =>
                                handleRadioChange(
                                  "initialConclusion",
                                  e.target.value,
                                )}
                              className="text-blue-600"
                            />
                            <span>{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Responsible Person (Checkbox) */}
                    <div>
                      <h2 className="text-lg font-semibold mb-4">
                        {t("finalDecision.questions.responsible")}
                      </h2>
                      <div className="space-y-2">
                        {[
                          {
                            value: "none",
                            label: t("finalDecision.options.none"),
                          },
                          ...NAMES,
                        ].map((option) => (
                          <label
                            key={option.value}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="checkbox"
                              name="responsible"
                              value={option.value}
                              checked={formData.responsible.includes(
                                option.value,
                              )}
                              onChange={(e) =>
                                handleCheckboxChange(
                                  "responsible",
                                  e.target.value,
                                )}
                              className="text-blue-600"
                            />
                            <span>{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Car Accident */}
                    <div>
                      <h2 className="text-lg font-semibold mb-4">
                        {t("finalDecision.questions.carAccident")}
                      </h2>
                      <div className="space-y-2">
                        {[
                          ...NAMES,
                          {
                            value: "other",
                            label: t("finalDecision.options.other"),
                          },
                        ].map((option) => (
                          <label
                            key={option.value}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="radio"
                              name="carAccident"
                              value={option.value}
                              checked={formData.carAccident === option.value}
                              onChange={(e) =>
                                handleRadioChange(
                                  "carAccident",
                                  e.target.value,
                                )}
                              className="text-blue-600"
                            />
                            <span>{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Hospital Reason */}
                    <div>
                      <h2 className="text-lg font-semibold mb-4">
                        {t("finalDecision.questions.hospitalReason")}
                      </h2>
                      <div className="space-y-2">
                        {[
                          {
                            value: "bloodSugar",
                            label: t("finalDecision.options.bloodSugar"),
                          },
                          {
                            value: "kidneyFailure",
                            label: t("finalDecision.options.kidneyFailure"),
                          },
                          {
                            value: "panic",
                            label: t("finalDecision.options.panic"),
                          },
                          {
                            value: "miscarriage",
                            label: t("finalDecision.options.miscarriage"),
                          },
                          {
                            value: "cancer",
                            label: t("finalDecision.options.cancer"),
                          },
                          {
                            value: "allergy",
                            label: t("finalDecision.options.allergy"),
                          },
                          {
                            value: "sprain",
                            label: t("finalDecision.options.sprain"),
                          },
                          {
                            value: "asthma",
                            label: t("finalDecision.options.asthma"),
                          },
                          {
                            value: "unknown",
                            label: t("finalDecision.options.unknown"),
                          },
                          {
                            value: "didntGo",
                            label: t("finalDecision.options.didntGo"),
                          },
                        ].map((option) => (
                          <label
                            key={option.value}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="radio"
                              name="hospitalReason"
                              value={option.value}
                              checked={formData.hospitalReason === option.value}
                              onChange={(e) =>
                                handleRadioChange(
                                  "hospitalReason",
                                  e.target.value,
                                )}
                              className="text-blue-600"
                            />
                            <span>{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Final Action */}
                    <div>
                      <h2 className="text-lg font-semibold mb-4">
                        {t("finalDecision.questions.finalAction")}
                      </h2>
                      <div className="space-y-2">
                        {[
                          {
                            value: "keepSecret",
                            label: t("finalDecision.options.keepSecret"),
                          },
                          {
                            value: "goToPolice",
                            label: t("finalDecision.options.goToPolice"),
                          },
                        ].map((option) => (
                          <label
                            key={option.value}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="radio"
                              name="finalAction"
                              value={option.value}
                              checked={formData.finalAction === option.value}
                              onChange={(e) =>
                                handleRadioChange(
                                  "finalAction",
                                  e.target.value,
                                )}
                              className="text-blue-600"
                            />
                            <span>{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6">
                      <Button
                        type="submit"
                        color="primary"
                        fullWidth
                        disabled={!formData.initialConclusion ||
                          formData.responsible.length === 0 ||
                          !formData.carAccident ||
                          !formData.hospitalReason ||
                          !formData.finalAction}
                      >
                        {t("finalDecision.submit")}
                      </Button>
                    </div>
                  </form>
                </>
              )
              : null}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FinalDecisionPage;
