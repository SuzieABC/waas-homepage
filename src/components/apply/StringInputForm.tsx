"use client";

import React, { useState } from "react";
import Link from "next/link";

interface InquryFormProps {
  locale: string;
}
const InquiryForm = ({ locale }: InquryFormProps) => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    organization: "",
    phone: "",
    inquiry: "",
    agreement: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false); // 상태 추가: 제출 여부

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true); // 제출 상태로 전환
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
          <div className="mb-4">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label>Organization</label>
            <input
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </div>
          <div className="mb-4">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label>Inquiry</label>
            <textarea
              name="inquiry"
              value={formData.inquiry}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              rows={4}
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="agreement"
                checked={formData.agreement}
                onChange={handleChange}
                className="mr-2"
                required
              />
              개인정보 수집 및 이용에 동의합니다.
            </label>
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            제출하기
          </button>
        </form>
      )}
    </div>
  );
};

export default InquiryForm;
