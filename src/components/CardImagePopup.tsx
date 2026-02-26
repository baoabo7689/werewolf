'use client';

import { ChevronLeft, ChevronRight, X } from 'lucide-react';

type CardImagePopupProps = {
  selectedImage: string | null;
  imageFiles: string[];
  basePath?: string;
  closeLabel: string;
  previousLabel: string;
  nextLabel: string;
  onClose: () => void;
  onSelectImage: (fileName: string) => void;
};

export default function CardImagePopup({
  selectedImage,
  imageFiles,
  basePath = '',
  closeLabel,
  previousLabel,
  nextLabel,
  onClose,
  onSelectImage,
}: CardImagePopupProps) {
  if (!selectedImage) {
    return null;
  }

  const selectedImageIndex = imageFiles.indexOf(selectedImage);
  const canShowPreviousImage = selectedImageIndex > 0;
  const canShowNextImage = selectedImageIndex >= 0 && selectedImageIndex < imageFiles.length - 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative w-full max-w-xl max-h-[90vh]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="btn-blue absolute right-2 top-2 h-10 w-10 rounded-full p-0 flex items-center justify-center"
          aria-label={closeLabel}
        >
          <X size={18} />
        </button>
        <div className="bg-white rounded-md p-2">
          <img
            src={`${basePath}/images/cards/${selectedImage}`}
            alt={selectedImage}
            className="w-full h-full max-h-[85vh] object-contain rounded"
          />
        </div>

        <button
          type="button"
          onClick={() => {
            if (canShowPreviousImage) {
              onSelectImage(imageFiles[selectedImageIndex - 1]);
            }
          }}
          disabled={!canShowPreviousImage}
          className="btn-blue absolute left-1 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full p-0 flex items-center justify-center"
          aria-label={previousLabel}
        >
          <ChevronLeft size={18} />
        </button>

        <button
          type="button"
          onClick={() => {
            if (canShowNextImage) {
              onSelectImage(imageFiles[selectedImageIndex + 1]);
            }
          }}
          disabled={!canShowNextImage}
          className="btn-blue absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full p-0 flex items-center justify-center"
          aria-label={nextLabel}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
