'use client';

import { UserPlus } from 'lucide-react';

import { useLanguage } from '@/context/LanguageContext';

export default function SignupButton() {
  const { translations } = useLanguage();

  return (
    <a
      href={process.env.NEXT_PUBLIC_SIGNUP_URL || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
      title={translations.header.signup}
      aria-label={translations.header.signup}
    >
      <UserPlus className="w-5 h-5 text-gray-600" />
    </a>
  );
}
