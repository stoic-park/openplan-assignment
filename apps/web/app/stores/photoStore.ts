import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PhotoState {
  currentPhotoId: string;
  setCurrentPhotoId: (id: string) => void;
  visitedPhotoIds: string[];
  addVisitedPhotoId: (id: string) => void;
}

export const usePhotoStore = create<PhotoState>()(
  persist(
    set => ({
      currentPhotoId: '0',
      setCurrentPhotoId: id => set({ currentPhotoId: id }),
      visitedPhotoIds: [],
      addVisitedPhotoId: id =>
        set(state => ({
          visitedPhotoIds: state.visitedPhotoIds.includes(id)
            ? state.visitedPhotoIds
            : [...state.visitedPhotoIds, id],
        })),
    }),
    {
      name: 'photo-storage',
    }
  )
);
