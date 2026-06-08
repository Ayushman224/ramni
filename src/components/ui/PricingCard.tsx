import { PricingItem } from '../../types'

type PricingCardProps = {
  item: PricingItem
}

export const PricingCard = ({ item }: PricingCardProps) => {
  return (
    <div className={`rounded-2xl p-6 text-center transition-all hover:-translate-y-1 ${
      item.featured
        ? 'bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-200 shadow-md'
        : 'bg-white border border-gray-100 shadow-sm'
    }`}>
      <div className="w-12 h-12 mx-auto rounded-full bg-pink-100 flex items-center justify-center mb-4 text-pink-600">
        <i className={item.icon}></i>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
      <div className="text-3xl font-bold text-gray-900 mb-3">₹{item.price}</div>
      <p className="text-sm text-gray-600">{item.description}</p>
    </div>
  )
}
