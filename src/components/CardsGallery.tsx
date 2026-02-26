'use client';

import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { useLanguage } from '@/context/LanguageContext';

import CardImagePopup from './CardImagePopup';

type CardsGalleryProps = {
  imageFiles: string[];
  basePath?: string;
};

const CARDS_PER_PAGE = 16;

export default function CardsGallery({ imageFiles, basePath = '' }: CardsGalleryProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { translations } = useLanguage();

  const totalPages = Math.max(1, Math.ceil(imageFiles.length / CARDS_PER_PAGE));

  const currentPageImages = useMemo(() => {
    const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
    return imageFiles.slice(startIndex, startIndex + CARDS_PER_PAGE);
  }, [currentPage, imageFiles]);

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;
  const galleryTranslations = translations.cardsGallery ?? {};

  const pageControls = (
    <div className="flex items-center justify-center gap-3">
      <button
        type="button"
        onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
        disabled={!canGoPrevious}
        className="btn-blue h-10 w-10 rounded-full p-0 flex items-center justify-center"
        aria-label={galleryTranslations.previous ?? 'Previous'}
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
        disabled={!canGoNext}
        className="btn-blue h-10 w-10 rounded-full p-0 flex items-center justify-center"
        aria-label={galleryTranslations.next ?? 'Next'}
      >
        <ChevronRight size={18} />
      </button>
      <div className="flex items-center gap-4">
        <p className="text-sm text-gray-600">
          {galleryTranslations.page ?? 'Page'} {currentPage} / {totalPages} • {imageFiles.length}{' '}
          {galleryTranslations.cards ?? 'cards'}
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-4 h-full w-full mx-auto">
      <div className="relative flex items-center w-full min-h-[40px]">
        <h1 className="text-2xl font-bold text-gray-900">{galleryTranslations.title}</h1>
        <div className="absolute left-1/2 -translate-x-1/2">{pageControls}</div>
      </div>

      {imageFiles.length === 0 ? (
        <p className="text-gray-600">{galleryTranslations.empty}</p>
      ) : (
        <>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2">
            {currentPageImages.map((fileName) => (
              <div
                key={fileName}
                className="border border-gray-200 rounded-md bg-gray-50 p-1.5 aspect-[2/3]"
              >
                <img
                  src={`${basePath}/images/cards/${fileName}`}
                  alt={fileName}
                  className="w-full h-full object-contain rounded cursor-zoom-in"
                  onClick={() => setSelectedImage(fileName)}
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {pageControls}
        </>
      )}

      <CardImagePopup
        selectedImage={selectedImage}
        imageFiles={imageFiles}
        basePath={basePath}
        closeLabel={galleryTranslations.close ?? 'Close'}
        previousLabel={galleryTranslations.previous ?? 'Previous'}
        nextLabel={galleryTranslations.next ?? 'Next'}
        onClose={() => setSelectedImage(null)}
        onSelectImage={setSelectedImage}
      />
    </div>
  );
}
