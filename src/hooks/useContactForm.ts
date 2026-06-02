import { useState } from "react";
import type { ContactFormData, UseContactFormReturn } from "../types/hooks";

const COOLDOWN_MS = 60_000;
const STORAGE_KEY = "contact_last_sent";
const CONTACT_ENDPOINT = "https://contact.guillemin.dev/contact";

const INITIAL_FORM: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
  gotcha: "",
};

interface ContactApiResponse {
  ok: boolean;
  message?: string;
  errors?: { field: string; message: string }[];
}

/** Manages contact form state and submission to the self-hosted contact service. */
export function useContactForm(): UseContactFormReturn {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const updateField = (field: keyof ContactFormData, value: string) => {
    setFormData((previous) => ({ ...previous, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const lastSent = Number(localStorage.getItem(STORAGE_KEY) || 0);
    const elapsed = Date.now() - lastSent;
    if (elapsed < COOLDOWN_MS) {
      const remaining = Math.ceil((COOLDOWN_MS - elapsed) / 1000);
      setError(`Veuillez patienter ${remaining}s avant de renvoyer un message.`);
      return;
    }

    setSending(true);
    setError("");

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          gotcha: formData.gotcha,
        }),
      });

      const result = (await response.json().catch(() => null)) as ContactApiResponse | null;

      if (response.ok && result?.ok) {
        localStorage.setItem(STORAGE_KEY, String(Date.now()));
        setSent(true);
        return;
      }

      if (response.status === 429) {
        setError("Trop de messages envoyés. Réessayez dans un moment.");
        return;
      }

      const firstFieldError = result?.errors?.[0]?.message;
      setError(
        firstFieldError ??
          result?.message ??
          "Une erreur est survenue. Réessayez ou contactez-moi directement par email.",
      );
    } catch {
      setError("Une erreur est survenue. Réessayez ou contactez-moi directement par email.");
    } finally {
      setSending(false);
    }
  };

  const reset = () => {
    setSent(false);
    setFormData(INITIAL_FORM);
  };

  return { formData, sent, sending, error, updateField, handleSubmit, reset };
}
