// Custom hook for fetching photos
import { useEffect, useState } from 'react';
import { Photo } from '@/models/photo';
import axios from 'axios';

const usePhotos = () => {
  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return { photos, loading, error };
};

export default usePhotos;
