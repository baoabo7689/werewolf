'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import topMenusConfig from '@/configs/topMenusConfig';

import ContactButton from './ContactButton';
import LanguageButton from './LanguageButton';
import HelpIcon from './HelpButton';
import SignUpWithGoogle from './SignUpWithGoogle';

export default function Header() {
  const { translations } = useLanguage();

  return (
    <header className="flex items-center justify-between px-6 py-2 bg-white border-b border-gray-200">
      <div className="flex items-center gap-6 flex-1">
        <Link href="/">
          <h1 className="text-2xl font-bold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors duration-200">
            {translations.header.title}
          </h1>
        </Link>

        <nav className="flex items-center gap-6">
          {topMenusConfig.map((menu) => {
            const label = translations.topMenus?.[menu.menuKey] ?? menu.menuKey;

            if (menu.isExternal) {
              return (
                <a
                  key={menu.key}
                  href={menu.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
                >
                  {label}
                </a>
              );
            }

            return (
              <Link
                key={menu.key}
                href={menu.url}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>

      <nav className="flex items-center gap-6">
        <LanguageButton />
        <HelpIcon />
        <ContactButton />
        <SignUpWithGoogle />
      </nav>
    </header>
  );
}
