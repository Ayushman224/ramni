import { Service } from '../../types'
import { Link } from 'react-router-dom'

type ServiceCardProps = {
  service: Service
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={service.image}
        alt={service.name}
        className="w-full h-56 object-cover"
      />
      <div className="p-5">
        <span className="text-xs font-medium uppercase tracking-wider text-pink-600">{service.category}</span>
        <h3 className="mt-2 text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-gray-900">From ₹{service.startingPrice}</p>
          <Link
            to="/book-order"
            className="inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium bg-pink-600 text-white hover:bg-pink-700 transition-colors"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  )
}
