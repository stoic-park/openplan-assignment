import { useQuery } from '@tanstack/react-query';

export interface PhotoData {
  id: string;
  author: string;
  width: string;
  height: string;
  url: string;
  download_url: string;
}

const fetchPhotoData = async (id: string = '0'): Promise<PhotoData> => {
  const response = await fetch(`https://picsum.photos/id/${id}/info`);

  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status}`);
  }

  return response.json();
};

export const usePhotoData = (id: string = '0') => {
  return useQuery<PhotoData, Error>({
    queryKey: ['photo', id],
    queryFn: () => fetchPhotoData(id),
  });
};
