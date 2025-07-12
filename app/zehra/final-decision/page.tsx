"use client";

import { useState } from "react";

import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/design-system/Button";
import { Card } from "@/design-system/Card";

const FinalDecisionPage = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    initialConclusion: "",
    responsible: [] as string[],
    carAccident: "",
    hospitalReason: "",
    finalAction: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    alert(t("finalDecision.submitSuccess"));
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

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-4xl mx-auto">
        <Card>
          <div className="p-6">
            <div className="flex justify-center">
              <LanguageToggle />
            </div>

            <h1 className="text-3xl font-bold mb-4">
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
                        checked={formData.initialConclusion === option.value}
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
                    { value: "none", label: t("finalDecision.options.none") },
                    { value: "mahmut", label: "Mahmut" },
                    { value: "kerim", label: "Kerim" },
                    { value: "nuray", label: "Nuray" },
                    { value: "fatma", label: "Fatma" },
                    { value: "riza", label: "Rıza" },
                    { value: "sinan", label: "Sinan" },
                    { value: "yeliz", label: "Yeliz" },
                    { value: "semra", label: "Semra" },
                    { value: "nedim", label: "Nedim" },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        name="responsible"
                        value={option.value}
                        checked={formData.responsible.includes(option.value)}
                        onChange={(e) =>
                          handleCheckboxChange("responsible", e.target.value)}
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
                    { value: "mahmut", label: "Mahmut" },
                    { value: "kerim", label: "Kerim" },
                    { value: "nuray", label: "Nuray" },
                    { value: "fatma", label: "Fatma" },
                    { value: "riza", label: "Rıza" },
                    { value: "sinan", label: "Sinan" },
                    { value: "yeliz", label: "Yeliz" },
                    { value: "semra", label: "Semra" },
                    { value: "nedim", label: "Nedim" },
                    { value: "other", label: t("finalDecision.options.other") },
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
                          handleRadioChange("carAccident", e.target.value)}
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
                    { value: "panic", label: t("finalDecision.options.panic") },
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
                          handleRadioChange("hospitalReason", e.target.value)}
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
                          handleRadioChange("finalAction", e.target.value)}
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
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FinalDecisionPage;
