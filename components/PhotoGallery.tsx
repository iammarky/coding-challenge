'use client';

import Image from 'next/image';
import Spinner from './global/Spinner';
import usePhotos from '@/hooks';

export default function PhotoGallery() {
  const { photos, loading, error } = usePhotos();

  // Render loading spinner
  if (loading) return <Spinner />;

  // Render error message
  if (error) {
    return (
      <div className="text-center text-red-500">
        Failed to load photos: {error}
      </div>
    );
  }

  return (
    <div className="w-3/4 space-y-4 flex flex-col">
      <h1 className="font-bold">Photo Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos &&
          photos.map(photo => (
            <div
              key={photo.id}
              className="relative overflow-hidden bg-gray-200 rounded-lg">
              <Image
                src={photo.url}
                alt={photo.caption}
                width={photo.width}
                height={photo.height}
                className="object-cover w-full h-full"
                loading="lazy"
                // Optional: Add blurDataURL for better UX
              />
              {/* Caption displayed at the bottom of the image */}
              <div className="absolute bottom-0 left-0 p-2 bg-black bg-opacity-50 text-white text-sm">
                {photo.caption}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
