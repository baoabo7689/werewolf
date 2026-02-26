'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { NewsModel } from '@/models/newsModel';

export default function NewsPage() {
  const { translations } = useLanguage();
  const [news, setNews] = useState<Array<NewsModel>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<{ title: string; content: string } | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKENDURL || '';
        const res = await fetch(`${backendUrl}/news`);
        if (!res.ok) throw new Error('Failed to fetch news');
        const data = await res.json();
        setNews(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err.message || 'Error fetching news');
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <main className="flex-1 bg-gradient-to-br from-blue-100 via-white to-pink-100">
      <section className="w-full h-full border border-gray-200 bg-white shadow-xl pl-6 pb-8">
        <h1 className="text-2xl font-bold text-gray-900">{translations.news?.title || 'News'}</h1>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {loading && <div className="text-gray-500">Loading...</div>}
          {error && <div className="text-red-500">{error}</div>}
          {!loading && !error && news.length === 0 && (
            <div className="text-gray-500">No news available.</div>
          )}
          {!loading &&
            !error &&
            news.map((item, idx) => (
              <div
                key={idx}
                className="p-4 border border-gray-100 rounded-lg bg-gray-50 shadow-sm cursor-pointer hover:bg-blue-50 transition h-full flex flex-col"
                onClick={() => {
                  setSelectedNews({
                    title: item.title,
                    content: item.content || item.briefContent,
                  });
                  setModalOpen(true);
                }}
              >
                <h2 className="text-xl font-semibold text-blue-900 mb-2">{item.title}</h2>
                <hr className="my-2 border-gray-300" />
                <p className="text-gray-700">{item.briefContent}</p>
              </div>
            ))}
          {modalOpen && selectedNews && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full p-6 relative">
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                  onClick={() => setModalOpen(false)}
                  aria-label="Close"
                >
                  &times;
                </button>
                <h2 className="text-2xl font-bold mb-4 text-blue-900">{selectedNews.title}</h2>
                <hr className="my-2 border-gray-300" />
                <div className="text-gray-800 whitespace-pre-line">{selectedNews.content}</div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
