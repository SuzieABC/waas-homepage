"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import TextInput from "@/components/elements/TextInput";
import TextArea from "@/components/elements/TextArea";

interface InquiryFormProps {
  locale: string;
}

const InquiryForm = ({ locale }: InquiryFormProps) => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    organization: "",
    phone: "",
    inquiry: "",
    agreement: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fields: {
    label: string;
    type: string;
    name: keyof typeof formData;
    required?: boolean;
  }[] = [
    { label: "Email", type: "email", name: "email", required: true },
    { label: "Name", type: "text", name: "name", required: true },
    {
      label: "Organization",
      type: "text",
      name: "organization",
      required: true,
    },
    { label: "Phone", type: "tel", name: "phone", required: true },
  ];

  useEffect(() => {
    if (isSubmitted) {
      window.scrollTo({ top: 0, behavior: "smooth" }); // 최상단 이동
    }
  }, [isSubmitted]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitted) return;
    setIsSubmitted(true);

    try {
      const response = await fetch("/api/slack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        alert("Failed to send data to Slack");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="p-4">
      {isSubmitted ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold">신청이 완료되었습니다</h1>
          <Link href={`/${locale}`}>
            <button className="bg-blue-500 text-white p-2 mt-4 rounded">
              홈으로
            </button>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-4">
          {fields.map((field) => (
            <TextInput
              key={field.name}
              label={field.label}
              type={field.type}
              name={field.name}
              value={
                field.type === "checkbox"
                  ? undefined
                  : (formData[field.name] as string)
              }
              checked={
                field.type === "checkbox"
                  ? (formData[field.name] as boolean)
                  : undefined
              }
              onChange={handleChange}
              required={field.required}
            />
          ))}
          <TextArea
            label="Inquiry"
            name="inquiry"
            value={formData.inquiry}
            onChange={handleChange}
          />
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="agreement"
                checked={formData.agreement}
                onChange={handleChange}
                className="mr-2 text-black"
                required
              />
              개인정보 수집 및 이용에 동의합니다.
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded"
            disabled={isSubmitted}
          >
            {isSubmitted ? "제출 중..." : "제출하기"}
          </button>
        </form>
      )}
    </div>
  );
};

export default InquiryForm;
