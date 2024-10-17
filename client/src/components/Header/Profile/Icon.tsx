import React from 'react'

interface IconProps {
    src: string,
    alt: string,
}

const Icon:React.FC<IconProps> = ({src, alt}) => {
  return (
    <img src={src} alt={alt} className='h-8 sm:h-10 aspect-square object-contain rounded-full' />
  )
}

export default Icon
