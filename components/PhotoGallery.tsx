'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { Photo } from '@/models/photo';
import Spinner from './global/Spinner';

export default function PhotoGallery() {
  const [photos, setPhotos] = useState<Photo[] | null>(null); // State to store photo data
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [error, setError] = useState<string | null>(null); // State to handle errors

  useEffect(() => {
    // Function to fetch photos from the API
    const fetchPhotos = async () => {
      try {
        const response = await axios.get('/api/photos'); // Fetch photos from the API
        setPhotos(response.data); // Update state with fetched photos
      } catch (error: any) {
        setError(error.message); // Update state with error message if the request fails
      } finally {
        setLoading(false); // Set loading to false once the request completes
      }
    };

    fetchPhotos(); // Call the function to fetch photos
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="w-3/4 space-y-4 flex flex-col">
      <h1 className="font-bold">Photo Gallery</h1>
      {/* Show spinner if loading */}
      {loading && <Spinner />}
      {/* Show error message if there's an error */}
      {error && (
        <div className="text-center text-red-500">
          Failed to load photos: {error}
        </div>
      )}
      {!loading && !error && (
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
                />
                {/* Caption displayed at the bottom of the image */}
                <div className="absolute bottom-0 left-0 p-2 bg-black bg-opacity-50 text-white text-sm">
                  {photo.caption}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
