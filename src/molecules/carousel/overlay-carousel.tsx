import React, { useEffect, useRef, useState } from 'react';
import { Box, GlobalStyles } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-cards';
import { on } from 'events';
type MaxOne =
  | 0
  | 0.1
  | 0.2
  | 0.3
  | 0.4
  | 0.5
  | 0.6
  | 0.7
  | 0.8
  | 0.9
  | 0.95
  | 0.98
  | 1;
interface CarouselProps {
  items: React.ReactNode[];
  autoplay?: boolean;
  navigationPrev?: React.ReactNode;
  navigationNext?: React.ReactNode;
  showNavigation?: boolean;
  showPagination?: boolean;
  slidesOffset?: number;
  sideSlidesScale?: MaxOne;
  slidesPerView?: number;
  spaceBetween?: number;
  centeredSlides?: boolean;
  onReachLastSlide?: () => void;
  onReachFirstSlide?: () => void;
  selectedSlideIndex?: number;
  getSelectedSlideIndex?: (index: number) => void;
}

export const OverlayCarousel: React.FC<CarouselProps> = ({
  items,
  autoplay = true,
  navigationPrev,
  navigationNext,
  showNavigation = false,
  showPagination = false,
  slidesOffset = 30,
  sideSlidesScale = 0.6,
  slidesPerView = 2.3,
  spaceBetween = 10,
  centeredSlides = true,
  onReachLastSlide,
  onReachFirstSlide,
  selectedSlideIndex = 0,
  getSelectedSlideIndex,
}) => {
  const swiperRef = useRef<any>(null);
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);
  const [navigation, setNavigation] = useState<any>(false);

  useEffect(() => {
    if (showNavigation && prevRef.current && nextRef.current) {
      setNavigation({
        prevEl: prevRef.current,
        nextEl: nextRef.current,
      });
    } else {
      setNavigation(false);
    }
  }, [showNavigation, navigationPrev, navigationNext]);
  useEffect(() => {
    if (swiperRef.current && typeof selectedSlideIndex === 'number') {
      swiperRef.current.slideTo(selectedSlideIndex);
    }
  }, [selectedSlideIndex]);
  return (
    <Box
      position="relative"
      sx={{
        width: '100%',
        maxWidth: '100%',
        overflow: 'hidden',
      }}
    >
      <GlobalStyles
        styles={{
          '.swiper-slide .card-content': {
            transition: 'transform 0.3s ease',
            transform: `scale(${sideSlidesScale})`,
          },
          '.swiper-slide-active .card-content': {
            transform: 'scale(1)',
            zIndex: 2,
            width: '100% !important',
          },
        }}
      />
      {showNavigation && (
        <>
          <Box
            ref={prevRef}
            sx={{
              position: 'absolute',
              top: '50%',
              left: 0,
              zIndex: 10,
              transform: 'translateY(-50%)',
            }}
          >
            {navigationPrev || '<'}
          </Box>
          <Box
            ref={nextRef}
            sx={{
              position: 'absolute',
              top: '50%',
              right: 0,
              zIndex: 10,
              transform: 'translateY(-50%)',
            }}
          >
            {navigationNext || '>'}
          </Box>
        </>
      )}

      <Swiper
        effect="slide"
        grabCursor
        spaceBetween={spaceBetween}
        centeredSlides={centeredSlides}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Autoplay, Navigation, EffectCards]}
        autoplay={
          autoplay ? { delay: 3000, disableOnInteraction: false } : false
        }
        navigation={navigation}
        cardsEffect={{
          perSlideOffset: slidesOffset,
          perSlideRotate: 0,
          slideShadows: false,
        }}
        pagination={showPagination ? { clickable: true } : false}
        onBeforeInit={(swiper) => {
          if (showNavigation && prevRef.current && nextRef.current) {
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        onSlideChange={(swiper) => {
          if (getSelectedSlideIndex) {
            getSelectedSlideIndex(swiper.activeIndex);
          }
        }}
        slidesPerView={slidesPerView}
        initialSlide={selectedSlideIndex}
        onReachBeginning={onReachFirstSlide}
        onReachEnd={onReachLastSlide}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <Box className="card-content" sx={{}}>
              {item}
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};
