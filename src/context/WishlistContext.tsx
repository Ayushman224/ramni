
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Service, GalleryItem } from '../types';

type WishlistItem = Service | GalleryItem;

type WishlistContextType = {
  wishlistItems: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (itemId: string | number) => void;
  isInWishlist: (itemId: string | number) => boolean;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(() => {
    try {
      const savedWishlist = localStorage.getItem('stitchly-wishlist');
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (error) {
      console.error('Failed to load wishlist from localStorage', error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('stitchly-wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (item: WishlistItem) => {
    setWishlistItems(prev => {
      const exists = prev.find(i => ('id' in i ? i.id === item.id : false));
      return exists ? prev : [...prev, item];
    });
  };

  const removeFromWishlist = (itemId: string | number) => {
    setWishlistItems(prev => prev.filter(i => 'id' in i ? i.id !== itemId : false));
  };

  const isInWishlist = (itemId: string | number) => {
    return wishlistItems.some(i => 'id' in i ? i.id === itemId : false);
  };

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
      isInWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};
