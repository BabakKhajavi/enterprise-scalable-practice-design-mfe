import React, { useEffect, useRef, useState } from 'react';
import { Box, BoxProps, SxProps } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

interface CarouselProps {
  items: React.ReactNode[];
  spaceBetween?: number;
  slidesPerView?: number | 'auto';
  loop?: boolean;
  autoplay?: boolean;
  navigationPrev?: React.ReactNode;
  navigationNext?: React.ReactNode;
  showNavigation?: boolean;
  showPagination?: boolean;
  navigationButtonHorizontalPosition?: number;
  containerProps?: BoxProps;
  renderCustomNavigation?: (
    goPrev: () => void,
    goNext: () => void,
    state: { isBeginning: boolean; isEnd: boolean },
  ) => React.ReactNode;
  navigationButtonsSx?: SxProps;
  paginationActiveColor?: string;
  swiperRefExternal?: React.MutableRefObject<any>;
  onActiveIndexChange?: (idx: number) => void;
  delaysList?: number[];
  fixedWidth?: number | string;
  selectedIndex?: number;
}

export const GenericCarousel: React.FC<CarouselProps> = ({
  items,
  slidesPerView = 1,
  loop = false,
  autoplay = true,
  spaceBetween = 24,
  navigationPrev,
  navigationNext,
  showNavigation = false,
  showPagination = false,
  navigationButtonHorizontalPosition = 0,
  containerProps = {},
  renderCustomNavigation,
  navigationButtonsSx = {},
  paginationActiveColor = '#fff',
  swiperRefExternal,
  onActiveIndexChange,
  delaysList,
  fixedWidth,
  selectedIndex,
}) => {
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<any>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  useEffect(() => {
    if (
      swiperRef.current &&
      swiperRef.current.params &&
      swiperRef.current.navigation
    ) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.destroy();
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, [prevRef, nextRef, showNavigation, renderCustomNavigation]);

  useEffect(() => {
    if (
      swiperRef.current &&
      swiperRef.current.navigation &&
      renderCustomNavigation &&
      (prevRef.current || nextRef.current)
    ) {
      // Re-initialize navigation to ensure custom buttons work on first render
      swiperRef.current.navigation.destroy();
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
    // Only run after mount and when refs change
  }, [renderCustomNavigation]);

  const goPrev = () => {
    swiperRef.current?.slidePrev();
    setTimeout(() => {
      if (swiperRef.current) {
        setIsBeginning(swiperRef.current.isBeginning);
        setIsEnd(swiperRef.current.isEnd);
      }
    }, 200);
  };

  const goNext = () => {
    swiperRef.current?.slideNext();
    setTimeout(() => {
      if (swiperRef.current) {
        setIsBeginning(swiperRef.current.isBeginning);
        setIsEnd(swiperRef.current.isEnd);
      }
    }, 200);
  };

  useEffect(() => {
    // Slide to the selected index when it changes
    if (
      typeof selectedIndex === 'number' &&
      swiperRef.current &&
      swiperRef.current.slideTo
    ) {
      swiperRef.current.slideTo(selectedIndex);
    }
  }, [selectedIndex]);

  return (
    <Box
      position="relative"
      width={fixedWidth || '100%'}
      sx={{
        boxSizing: 'border-box',
        px: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        '& .swiper-pagination': {
          display: showPagination ? 'block' : 'none',
          top: 520,
          bottom: 'auto',
          left: 0,
          width: '100%',
          position: 'absolute',
          zIndex: 20000,
          cursor: 'pointer',
        },
        '& .swiper-pagination-bullet': {
          width: 13,
          height: 13,
          background: '#d6d4d4',
          opacity: 0.6,
        },
        '& .swiper-pagination-bullet-active': {
          background: paginationActiveColor,
          width: 13,
          height: 13,
          opacity: 1,
        },
      }}
      {...containerProps}
    >
      {showNavigation && (
        <>
          {!isBeginning && (
            <Box
              ref={prevRef}
              sx={{
                position: 'absolute',
                top: '50%',
                left: navigationButtonHorizontalPosition,
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                borderRadius: '50%',
                p: 0.2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box',
              }}
              onClick={() => {
                goPrev();
              }}
            >
              {navigationPrev || (
                <ArrowLeftIcon
                  fontSize="medium"
                  sx={{
                    color: '#fff',
                    backgroundColor: 'transparent',
                    zIndex: 110,
                    ...navigationButtonsSx,
                  }}
                />
              )}
            </Box>
          )}
          {!isEnd && (
            <Box
              ref={nextRef}
              sx={{
                position: 'absolute',
                top: '50%',
                right: navigationButtonHorizontalPosition,
                zIndex: 100,
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={() => {
                goNext();
              }}
            >
              {navigationNext || (
                <ArrowRightIcon
                  sx={{
                    color: '#fff',
                    backgroundColor: 'transparent',
                    zIndex: 110,
                    ...navigationButtonsSx,
                  }}
                />
              )}
            </Box>
          )}
        </>
      )}

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        loop={loop}
        autoplay={
          autoplay ? { delay: 3000, disableOnInteraction: false } : false
        }
        navigation={
          showNavigation || renderCustomNavigation
            ? {
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }
            : false
        }
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
          if (swiperRefExternal) swiperRefExternal.current = swiper;
          if (showNavigation || renderCustomNavigation) {
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
          if (onActiveIndexChange) {
            const index = loop ? swiper.realIndex : swiper.activeIndex;
            onActiveIndexChange(index);
          }
        }}
        onAfterInit={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        style={{
          boxSizing: 'border-box',
          height: '100%',
          width: '100%',
          display: 'flex',
        }}
        pagination={{ clickable: showPagination }}
      >
        {items?.map((item, index) => (
          <SwiperSlide
            key={index}
            data-swiper-autoplay={delaysList?.[index] || 5000} // Use your delay value per slide
            style={{
              boxSizing: 'border-box',
              width: 'auto',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {item}
          </SwiperSlide>
        ))}
      </Swiper>
      {renderCustomNavigation &&
        renderCustomNavigation(goPrev, goNext, { isBeginning, isEnd })}
    </Box>
  );
};
