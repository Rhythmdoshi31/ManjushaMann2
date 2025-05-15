import React from 'react'

const Logo = () => {
  return (
    <div className="flex justify-center relative">
        <img
          loading="lazy"
          src="/images/logo.webp"
          alt="Something"
          className="object-cover h-12 w-12 mb-1"
        />
        <h5 className="text-xl font-grotesk pt-4 text-gray-100 font-semibold">
          Manjusha Mann
        </h5>
        <img
          loading="lazy"
          className="absolute top-0 right-[-15%] object-cover h-8 w-8"
          src="/images/cards.webp"
          alt="O"
        />
      </div>
  )
}

export default Logo;