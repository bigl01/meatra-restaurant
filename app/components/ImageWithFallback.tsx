'use client';

import Image, { ImageProps } from 'next/image';
import { useState, useEffect } from 'react';

interface ImageWithFallbackProps extends Omit<ImageProps, 'onError' | 'src'> {
  src: string;
  fallback?: string;
}

/**
 * Image component with automatic fallback to placeholder on error
 * Handles broken images gracefully
 */
export default function ImageWithFallback({
  src,
  fallback = '/placeholder.jpg',
  alt,
  ...props
}: ImageWithFallbackProps) {
  const [imageSrc, setImageSrc] = useState<string>(src);
  const [isError, setIsError] = useState(false);

  // Reset error state when src changes
  useEffect(() => {
    setImageSrc(src);
    setIsError(false);
  }, [src]);

  const handleError = () => {
    if (!isError) {
      console.warn(`Image load failed: ${src}`);
      setImageSrc(fallback);
      setIsError(true);
    }
  };

  // Validate src
  const validSrc = imageSrc && imageSrc !== 'false' ? imageSrc : fallback;

  return (
    <Image
      {...props}
      src={validSrc}
      alt={alt || 'Изображение'}
      onError={handleError}
      placeholder="blur"
      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
    />
  );
}
