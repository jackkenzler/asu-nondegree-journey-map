import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Platform } from '../data/journeyData';
import imgBefore from 'figma:asset/e140f9072ed72d5ecae5f47012660a5c7f8b586a.png';
import imgAfter from 'figma:asset/8b510fad6f19629ead6cb8cddfcde457bbbbf8fb.png';
import svgPaths from '../../imports/svg-gjcu1703xj';

interface PlatformModalProps {
  platform: Platform;
  stageColor: string;
  stepLabel: string;
  stageName: string;
  onClose: () => void;
  beforeImg?: string;
  afterImg?: string;
}

export function PlatformModal({ platform, stageColor, stepLabel, stageName, onClose, beforeImg: beforeImgProp, afterImg: afterImgProp }: PlatformModalProps) {
  const IMAGE_ASPECT_RATIO = 1280 / 832;
  const beforeSrc = beforeImgProp ?? imgBefore;
  const afterSrc = afterImgProp ?? imgAfter;
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const updateSlider = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    setSliderPosition(Math.max(0, Math.min(100, (x / rect.width) * 100)));
  };

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: MouseEvent) => updateSlider(e.clientX);
    const onTouch = (e: TouchEvent) => {
      e.preventDefault();
      updateSlider(e.touches[0].clientX);
    };
    const onUp = () => setIsDragging(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onTouch, { passive: false });
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('touchend', onUp);
    };
  }, [isDragging]);

  useEffect(() => {
    const scrollY = window.scrollY;
    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyPosition = document.body.style.position;
    const originalBodyTop = document.body.style.top;
    const originalBodyWidth = document.body.style.width;
    const originalBodyTouchAction = document.body.style.touchAction;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.touchAction = 'none';

    return () => {
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.position = originalBodyPosition;
      document.body.style.top = originalBodyTop;
      document.body.style.width = originalBodyWidth;
      document.body.style.touchAction = originalBodyTouchAction;
      window.scrollTo(0, scrollY);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-[12px] py-[16px] md:px-[40px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60" />
      <motion.div
        className="relative bg-white rounded-[12px] shadow-2xl max-w-[848px] w-full overflow-hidden max-h-[calc(100vh-32px)] flex flex-col"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.18 }}
        onClick={(e) => e.stopPropagation()}
        style={{ fontFamily: 'Arial, sans-serif' }}
      >
        {/* Header */}
        <div className="border-b border-[#e8e8e8] pb-[12px] pl-[16px] pr-[12px] pt-[12px] md:pb-[17px] md:pl-[24px] md:pr-[16px] md:pt-[16px] flex items-center justify-between shrink-0">
          <div className="flex flex-col gap-[2px]">
            <p className="text-[14px] tracking-[-0.49px]" style={{ color: stageColor, fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>{stageName}</p>
            <h2 className="text-[20px] md:text-[24px] text-black tracking-[-0.84px] leading-[28px] md:leading-[36px]" style={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>{stepLabel}</h2>
          </div>
          <button onClick={onClose} className="size-[48px] md:size-[60px] flex items-center justify-center rounded-full hover:bg-[#e8e8e8] transition-colors cursor-pointer shrink-0">
            <svg className="size-[24px]" fill="none" viewBox="0 0 24 24">
              <path d="M19 5L5 19" stroke="#0A0A0A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
              <path d="M5 5L19 19" stroke="#0A0A0A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
            </svg>
          </button>
        </div>

        {/* Slider */}
        <div className="p-[16px] md:p-[24px] overflow-y-auto overscroll-contain">
          <div
            ref={containerRef}
            className="relative w-full h-auto bg-[#fafafa] rounded-[12px] overflow-hidden cursor-ew-resize select-none max-h-[min(52vh,520px)] md:max-h-[min(60vh,520px)]"
            style={{
              aspectRatio: `${IMAGE_ASPECT_RATIO}`,
              boxShadow: '0px 5px 8px 0px rgba(0,0,0,0.02), 0px 12px 40px 0px rgba(0,0,0,0.03), 0px 26px 80px 0px rgba(0,0,0,0.08)',
              touchAction: 'none',
              overscrollBehavior: 'contain',
            }}
            onMouseDown={(e) => { updateSlider(e.clientX); setIsDragging(true); }}
            onTouchStart={(e) => {
              e.preventDefault();
              updateSlider(e.touches[0].clientX);
              setIsDragging(true);
            }}
          >
            <div className="absolute inset-0 border border-[#e8e8e8] rounded-[12px] pointer-events-none z-10" />

            {/* After / Proposed (full, underneath) */}
            <div className="absolute inset-0">
              <img src={afterSrc} alt="Future state" className="w-full h-full object-contain pointer-events-none select-none" draggable={false} />
            </div>

            {/* Before / Current (clipped from left) */}
            <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
              <img src={beforeSrc} alt="Current state" className="w-full h-full object-contain pointer-events-none select-none" draggable={false} />
            </div>

            {/* Divider */}
            <div
              className="absolute top-0 bottom-0 w-[3px] bg-white pointer-events-none z-20"
              style={{
                left: `${sliderPosition}%`,
                boxShadow: '0px 20px 25px 0px rgba(0,0,0,0.1), 0px 8px 10px 0px rgba(0,0,0,0.1), 0px 10px 15px 0px rgba(0,0,0,0.1), 0px 4px 6px 0px rgba(0,0,0,0.1)',
              }}
            >
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[48px] bg-white rounded-full flex items-center justify-center pointer-events-auto cursor-ew-resize hover:bg-[#f0f0f0] hover:scale-110 transition-all duration-150"
                style={{ boxShadow: '0px 20px 25px 0px rgba(0,0,0,0.1), 0px 8px 10px 0px rgba(0,0,0,0.1)' }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
              >
                <svg className="size-[24px]" fill="none" viewBox="0 0 25 24">
                  <path d={svgPaths.p36966700} fill="#191919" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-[16px]">
            <p className="text-[14px] text-[#191919]" style={{ fontWeight: 'bold' }}>Current state</p>
            <div className="flex items-center gap-[10px]">
              <svg className="size-[16px]" fill="none" viewBox="0 0 17 17">
                <path d={svgPaths.pd955300} fill="#4A8400" />
              </svg>
              <p className="text-[14px] text-[#4a8500]" style={{ fontWeight: 'bold' }}>Future state</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
