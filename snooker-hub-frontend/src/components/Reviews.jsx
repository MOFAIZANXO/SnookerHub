import React, { useEffect } from "react"
import AOS from 'aos'
import 'aos/dist/aos.css'
import feather from 'feather-icons'

export default function Reviews () {
  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true })
    feather.replace()
  }, [])

  const reviews = [
    {
      initial: 'A',
      name: 'Ahsan Hashmi',
      details: '5 reviews · 11 photos',
      rating: 5,
      comment: 'Best place for snooker lovers in Walton. Professional setup, perfect tables, and a welcoming vibe.'
    },
    {
      initial: 'L',
      name: 'Liam Khan',
      details: '2 reviews',
      rating: 5,
      comment: 'The tables are in excellent condition, and the staff is really helpful. A perfect spot to improve your game.'
    },
    {
      initial: 'U',
      name: 'Usama Awan',
      details: '1 review',
      rating: 5,
      comment: 'Great environment for serious snooker practice. Respectful staff and professional atmosphere.'
    }
  ]

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating)
  }

  return (
    <section id="reviews" className="py-20 px-6 lg:px-12 bg-gradient-to-r from-[#1a1a1a] to-[#0d0d0d] text-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12 text-white">
          What Our <span className="text-[#03C05D]">Players Say</span>
        </h2>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" data-aos="fade-up">
          {reviews.map((review, index) => (
            <div key={index} className="bg-[#121212] rounded-xl shadow-md p-6 text-left hover:shadow-lg transition">
              <div className="flex items-center mb-4">
                <div className="bg-[#03C05D]/20 text-[#03C05D] font-bold rounded-full w-10 h-10 flex items-center justify-center">
                  {review.initial}
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-white">{review.name}</p>
                  <p className="text-sm text-gray-400">{review.details}</p>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-3">
                {renderStars(review.rating)}
              </div>
              <p className="text-gray-300">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}