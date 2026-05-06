import React, { FC, useEffect, useMemo, useRef, useState } from 'react';

export type OptimizedImageProps = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  'loading' | 'decoding'
> & {
  lazy?: boolean;
  rootMargin?: string;
  placeholderSrc?: string;
  fallbackSrc?: string;
  fallbackSrcSet?: string;
  decoding?: 'async' | 'sync' | 'auto';
  fetchPriority?: 'high' | 'low' | 'auto';
  fadeIn?: boolean;
};

const DEFAULT_PLACEHOLDER_SRC = 'data:image/gif;base64,R0lGODlhAQABAAAAACw=';

export const OptimizedImage: FC<OptimizedImageProps> = ({
  src,
  srcSet,
  sizes,
  alt,
  lazy = true,
  rootMargin = '200px',
  placeholderSrc = DEFAULT_PLACEHOLDER_SRC,
  fallbackSrc,
  fallbackSrcSet,
  decoding = 'async',
  fetchPriority = 'auto',
  fadeIn = true,
  onLoad,
  onError,
  style,
  ...props
}) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [isInView, setIsInView] = useState(!lazy);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [currentSrcSet, setCurrentSrcSet] = useState(srcSet);

  useEffect(() => {
    setCurrentSrc(src);
    setCurrentSrcSet(srcSet);
    setIsLoaded(false);
  }, [src, srcSet]);

  useEffect(() => {
    if (!lazy) {
      setIsInView(true);
      return;
    }

    if (typeof window === 'undefined') {
      setIsInView(true);
      return;
    }

    if (!('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin },
    );

    if (imgRef.current) {
      const rect = imgRef.current.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        setIsInView(true);
        observer.disconnect();
        return;
      }
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, rootMargin]);

  const mergedStyle = useMemo<React.CSSProperties>(() => {
    if (!fadeIn) {
      return style || {};
    }

    const transition = style?.transition
      ? `${style.transition}, opacity 240ms ease-out`
      : 'opacity 240ms ease-out';

    return {
      ...style,
      opacity: isLoaded ? 1 : 0,
      transition,
    };
  }, [fadeIn, isLoaded, style]);

  const handleLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!lazy || isInView) {
      setIsLoaded(true);
    }
    onLoad?.(event);
  };

  const handleError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    if (isInView && fallbackSrc && currentSrc !== fallbackSrc) {
      setIsLoaded(false);
      setCurrentSrc(fallbackSrc);
      setCurrentSrcSet(fallbackSrcSet);
      return;
    }
    onError?.(event);
  };

  const resolvedSrc = isInView ? currentSrc : placeholderSrc;
  const resolvedSrcSet = isInView ? currentSrcSet : undefined;
  const resolvedSizes = isInView ? sizes : undefined;

  return (
    <img
      ref={imgRef}
      src={resolvedSrc}
      srcSet={resolvedSrcSet}
      sizes={resolvedSizes}
      alt={alt}
      loading={lazy ? 'lazy' : 'eager'}
      decoding={decoding}
      fetchPriority={fetchPriority}
      onLoad={handleLoad}
      onError={handleError}
      style={mergedStyle}
      {...props}
    />
  );
};
