import { motion, AnimatePresence } from 'motion/react';
import svgPaths from '../../imports/svg-xj9hkbpyg5';
import { imgGroup120167 } from '../../imports/svg-zl9c6';

interface GuidedTourPopoverProps {
  visible: boolean;
  onDismiss: () => void;
  anchorX: number;
  anchorY: number;
  placement?: 'above' | 'below';
  compact?: boolean;
}

/* Illustration: colored path + dot + hand + stars (from Figma Frame6) */
function Illustration() {
  return (
    <div className="h-[68px] overflow-clip relative shrink-0 w-[109.556px]">
      {/* Mask group – colored path with dashes */}
      <div
        className="absolute inset-[-173.33%_-184.48%_11.25%_13.1%]"
        style={{
          maskImage: `url('${imgGroup120167}')`,
          WebkitMaskImage: `url('${imgGroup120167}')`,
          maskMode: 'alpha',
          WebkitMaskSize: '109.556px 68px',
          maskSize: '109.556px 68px',
          WebkitMaskPosition: '-14.355px 117.867px',
          maskPosition: '-14.355px 117.867px',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
        }}
      >
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 297.311 178.216">
          <path d={svgPaths.p32679f80} fill="url(#paint0_linear_popover)" />
          <path d={svgPaths.p17bea800} fill="black" fillOpacity="0.25" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_popover" x1="-90.6667" x2="296.178" y1="113.237" y2="113.237">
              <stop stopColor="#78BE20" />
              <stop offset="0.2" stopColor="#78BE20" />
              <stop offset="0.2" stopColor="#00A3E0" />
              <stop offset="0.4" stopColor="#00A3E0" />
              <stop offset="0.4" stopColor="#FF7F32" />
              <stop offset="0.6" stopColor="#FF7F32" />
              <stop offset="0.6" stopColor="#E74973" />
              <stop offset="0.8" stopColor="#E74973" />
              <stop offset="0.8" stopColor="#FFC627" />
              <stop offset="1" stopColor="#FFC627" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Dot with ring */}
      <div className="absolute h-[16.622px] left-[16.55%] right-[68.28%] top-[8.31px]">
        <div className="absolute inset-[-45.45%_-54.55%_-63.64%_-54.54%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34.7556 34.7556">
            <g filter="url(#filter0_d_popover_dot)">
              <path d={svgPaths.pa8bf400} fill="#191919" />
              <path d={svgPaths.p2c8c8240} fill="white" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="34.7556" id="filter0_d_popover_dot" width="34.7556" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="1.51111" />
                <feGaussianBlur stdDeviation="4.53333" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>

      {/* Hand pointer */}
      <div className="absolute flex h-[52.847px] items-center justify-center left-[41.5px] top-[7.51px] w-[47.985px]">
        <div className="flex-none rotate-[-8.93deg]">
          <div className="h-[47.024px] relative w-[41.184px]">
            <div className="absolute inset-[-16.07%_-22.01%_-22.49%_-22.02%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 59.3174 65.1568">
                <g filter="url(#filter_hand_popover)">
                  <path d={svgPaths.p2ab34372} fill="white" />
                  <path d={svgPaths.p3faff280} fill="#A7A7A7" />
                  <path d={svgPaths.ped23f00} fill="#A7A7A7" />
                  <path d={svgPaths.pd068000} fill="#A7A7A7" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="65.1568" id="filter_hand_popover" width="59.3174" x="0" y="0">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                    <feOffset dy="1.56517" />
                    <feGaussianBlur stdDeviation="1.95647" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
                    <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow" />
                    <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                    <feOffset dy="1.51111" />
                    <feGaussianBlur stdDeviation="4.53333" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend in2="effect1_dropShadow" mode="normal" result="effect2_dropShadow" />
                    <feBlend in="SourceGraphic" in2="effect2_dropShadow" mode="normal" result="shape" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Small star */}
      <div className="absolute flex h-[11.097px] items-center justify-center left-[7.33px] top-[47.94px] w-[11.64px]">
        <div className="flex-none rotate-[-12.21deg]">
          <div className="h-[9.209px] relative w-[9.917px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.91706 9.2087">
              <path d={svgPaths.p19d26000} fill="#FFC627" />
            </svg>
          </div>
        </div>
      </div>

      {/* Large star */}
      <div className="absolute flex h-[18.47px] items-center justify-center left-[79.34px] top-0 w-[19.214px]">
        <div className="flex-none rotate-[16.94deg]">
          <div className="h-[14.539px] relative w-[15.657px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.6569 14.5386">
              <path d={svgPaths.p3338f100} fill="#FFC627" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export function GuidedTourPopover({
  visible,
  onDismiss,
  anchorX,
  anchorY,
  placement = 'above',
  compact = false,
}: GuidedTourPopoverProps) {
  const popoverWidth = compact ? undefined : 340;
  const tailSize = 10;
  const isBelow = placement === 'below';
  const mobileInset = 24;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={compact ? 'fixed z-40' : 'absolute z-40'}
          style={{
            left: compact ? mobileInset : anchorX,
            right: compact ? mobileInset : 'auto',
            bottom: compact ? mobileInset : 'auto',
            top: compact ? 'auto' : isBelow ? anchorY + tailSize + 24 : anchorY - tailSize - 24,
            x: compact ? '0%' : '-50%',
            y: compact ? '0%' : isBelow ? '0%' : '-100%',
          } as React.CSSProperties}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {/* Card */}
          <div
            className="relative rounded-[8px] flex flex-col gap-[16px] p-[24px]"
            style={{
              width: popoverWidth,
              background: compact ? 'rgba(25, 25, 25, 0.9)' : 'rgba(25, 25, 25, 0.8)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '-3px 0px 24px 0px rgba(0,0,0,0.03), -6px 0px 24px 0px rgba(0,0,0,0.06)',
              fontFamily: 'Arial, sans-serif',
            }}
          >
            {/* Title + illustration */}
            <div className={`flex items-center w-full ${compact ? 'gap-[50px]' : 'gap-[16px]'}`}>
              <p
                className={`flex-1 text-white leading-[1.2] ${compact ? 'text-[26px] tracking-[-0.72px]' : 'text-[28px] tracking-[-0.98px]'}`}
                style={{ fontWeight: 'bold' }}
              >
                This map is interactive
              </p>
              <Illustration />
            </div>

            {/* Body */}
            <p className={`text-[#f1f1f1] ${compact ? 'text-[14px] leading-[22px]' : 'text-[16px] leading-[24px]'}`}>
              Each dot marks a moment in the student&apos;s experience. Click to see current friction and the proposed improvement side by side.
            </p>

            {/* Button */}
            <div className="flex justify-end">
              <button
                onClick={onDismiss}
                className="bg-white rounded-[25px] px-[16px] py-[8px] text-[14px] text-[#191919] text-center cursor-pointer hover:bg-[#e8e8e8] transition-colors"
                style={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}
              >
                Got it
              </button>
            </div>
          </div>

          {/* Tail / triangle */}
          <div
            className="absolute"
            style={{
              display: compact ? 'none' : 'block',
              left: '50%',
              bottom: isBelow ? 'auto' : -tailSize,
              top: isBelow ? -tailSize : 'auto',
              marginLeft: -tailSize,
              width: 0,
              height: 0,
              borderLeft: `${tailSize}px solid transparent`,
              borderRight: `${tailSize}px solid transparent`,
              borderTop: isBelow ? 'none' : `${tailSize}px solid rgba(25, 25, 25, 0.8)`,
              borderBottom: isBelow ? `${tailSize}px solid rgba(25, 25, 25, 0.8)` : 'none',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
