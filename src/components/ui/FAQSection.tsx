import { useState } from 'react'
import { FAQ } from '../../types'
import { ChevronDown, ChevronUp } from 'lucide-react'

type FAQSectionProps = {
  faqs: FAQ[]
}

export const FAQSection = ({ faqs }: FAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
          >
            <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
            {openIndex === index ? <ChevronUp size={20} className="text-pink-600" /> : <ChevronDown size={20} className="text-gray-400" />}
          </button>
          {openIndex === index && (
            <div className="px-6 pb-4 text-gray-600 leading-relaxed">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
