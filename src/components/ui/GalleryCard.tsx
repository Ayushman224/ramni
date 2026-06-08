import { GalleryItem } from '../../types'
import { useState } from 'react'

type GalleryCardProps = {
  item: GalleryItem
}

export const GalleryCard = ({ item }: GalleryCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div 
        className="group cursor-pointer rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
        onClick={() => setIsModalOpen(true)}
      >
        <img
          src={`https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80`}
          alt={item.title}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="p-4 bg-white">
          <span className="text-xs uppercase text-pink-600 font-medium">{item.category}</span>
          <h4 className="text-lg font-semibold text-gray-900 mt-1">{item.title}</h4>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4" onClick={() => setIsModalOpen(false)}>
          <div className="max-w-3xl w-full bg-white rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                &times;
              </button>
            </div>
            <div className="p-6 pt-0">
              <img
                src={`https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&auto=format&fit=crop&q=80`}
                alt={item.title}
                className="w-full h-96 object-cover rounded-lg mb-4"
              />
              <span className="text-xs uppercase text-pink-600 font-medium">{item.category}</span>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mt-2">{item.title}</h2>
              <p className="text-gray-600 mt-3">{item.description}</p>
              <p className="mt-4 text-sm text-gray-500 italic">"{item.review}"</p>
              <p className="text-xs text-gray-400 mt-2">{item.style}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
