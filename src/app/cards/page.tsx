import { readdir } from 'fs/promises';
import path from 'path';

import CardsGallery from '@/components/CardsGallery';

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

async function getCardImageFiles() {
  const cardsDir = path.join(process.cwd(), 'public', 'images', 'cards');

  try {
    const entries = await readdir(cardsDir, { withFileTypes: true });

    return entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((fileName) => IMAGE_EXTENSIONS.has(path.extname(fileName).toLowerCase()))
      .sort((first, second) => first.localeCompare(second, undefined, { numeric: true }));
  } catch {
    return [];
  }
}

function getPublicBasePath() {
  const configuredBasePath = process.env.BASE_PATH || process.env.NEXT_PUBLIC_BASE_PATH || '';

  if (!configuredBasePath) {
    return '';
  }

  return `/${configuredBasePath.replace(/^\/+|\/+$/g, '')}`;
}

export default async function CardsPage() {
  const cardFiles = await getCardImageFiles();
  const basePath = getPublicBasePath();

  return (
    <main className="flex-1 bg-gradient-to-br from-blue-100 via-white to-pink-100">
      <section className="w-full h-full border border-gray-200 bg-white shadow-xl pl-6 pt-2">
        <CardsGallery imageFiles={cardFiles} basePath={basePath} />
      </section>
    </main>
  );
}
