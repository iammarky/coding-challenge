import { Search, PhotoGallery } from '../components';
import user from '@/data/user.json';

export default function Home() {
  return (
    <div className="flex py-20 ">
      <div className="w-1/2">
        <Search data={user} />
      </div>
      <div className="w-1/2">
        <PhotoGallery />
      </div>
    </div>
  );
}
