import type { ImgHTMLAttributes, ReactNode } from 'react';
import {
  aspectRatios,
  fallback as fallbackClass,
  fits,
  frame,
  image,
  radii,
} from './Image.css';

export type ImageAspectRatio = 'auto' | 'square' | 'wide' | 'portrait' | 'video' | 'logo';
export type ImageFit = 'cover' | 'contain' | 'fill';
export type ImageRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export type ImageProps = {
  src?: string;
  alt: string;
  aspectRatio?: ImageAspectRatio;
  fit?: ImageFit;
  radius?: ImageRadius;
  decorative?: boolean;
  fallback?: ReactNode;
  className?: string;
  imageClassName?: string;
} & Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>;

export function Image({
  src,
  alt,
  aspectRatio = 'auto',
  fit = 'cover',
  radius = 'md',
  decorative = false,
  fallback = 'Image unavailable',
  className,
  imageClassName,
  loading = 'lazy',
  ...rest
}: ImageProps) {
  const frameClasses = [frame, aspectRatios[aspectRatio], radii[radius], className]
    .filter(Boolean)
    .join(' ');

  const imageClasses = [image, fits[fit], imageClassName].filter(Boolean).join(' ');

  if (!src) {
    return <div className={`${frameClasses} ${fallbackClass}`}>{fallback}</div>;
  }

  return (
    <span className={frameClasses}>
      <img
        className={imageClasses}
        src={src}
        alt={decorative ? '' : alt}
        aria-hidden={decorative ? true : undefined}
        loading={loading}
        {...rest}
      />
    </span>
  );
}
