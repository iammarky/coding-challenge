import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { render, screen, waitFor } from '@testing-library/react';
import PhotoGallery from '@/components/PhotoGallery';

const mock = new MockAdapter(axios);

beforeEach(() => {
  mock.onGet('/api/photos').reply(200, [
    {
      id: '1',
      url: 'https://example.com/photo1.jpg',
      caption: 'Photo 1',
      width: 600,
      height: 400,
    },
    {
      id: '2',
      url: 'https://example.com/photo2.jpg',
      caption: 'Photo 2',
      width: 600,
      height: 400,
    },
  ]);
});

afterEach(() => {
  mock.reset();
});

test('renders photos correctly', async () => {
  render(<PhotoGallery />);

  // Use findByAltText which returns a promise that resolves when the element is found
  const photo1 = await screen.findByAltText('Photo 1');
  const photo2 = await screen.findByAltText('Photo 2');

  // Ensure both photos are in the document
  expect(photo1).toBeInTheDocument();
  expect(photo2).toBeInTheDocument();
});

test('handles concurrent requests correctly', async () => {
  // Render the component
  render(<PhotoGallery />);

  // Simulate multiple concurrent requests
  const requests = [axios.get('/api/photos'), axios.get('/api/photos')];

  await Promise.all(requests); // Wait for all requests to complete

  // Use findByAltText which returns a promise that resolves when the element is found
  const photo1 = await screen.findByAltText('Photo 1');
  const photo2 = await screen.findByAltText('Photo 2');

  // Ensure both photos are in the document
  expect(photo1).toBeInTheDocument();
  expect(photo2).toBeInTheDocument();
});
