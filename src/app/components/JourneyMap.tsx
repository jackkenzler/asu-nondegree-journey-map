import { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'motion/react';
import imgLogo from 'figma:asset/ed52d950de27f23ebc18b225e72eff9d85fd6cb6.png';
import warningIcon from '../../../warningIcon.svg';
import emailIcon from '../../../emailIcon-2.svg';
import { PlatformModal } from './PlatformModal';
import { GuidedTourPopover } from './GuidedTourPopover';
import { journeyStages } from '../data/journeyData';
import { comparisonImages } from '../data/comparisonImages';

// The road path — extended well beyond edges so it bleeds off-screen
const ROAD_PATH = "M-800 438H254.925C327.274 438 385.925 379.349 385.925 307V143.038C385.925 72.8767 442.801 16 512.962 16C583.123 16 640 72.8767 640 143.038V457.203C640 527.231 696.769 584 766.797 584C836.825 584 893.594 527.231 893.594 457.203V253C893.594 180.651 952.245 122 1024.59 122H2100";

// Current state: 10 pain point markers, distributed across visible path range
const currentStateMarkers = [
  { pct: 0.22, label: 'No direct path from\nClass Search to application', side: 'above' as const },
  { pct: 0.28, label: 'Landing pages with\npolicy contradictions', side: 'below' as const },
  { pct: 0.35, label: 'Two applications\ncreates confusion', side: 'left' as const },
  { pct: 0.41, label: 'Non-essential questions\nin the app', side: 'right' as const },
  { pct: 0.48, label: 'Cannot choose class\nor reserve a seat', side: 'left' as const },
  { pct: 0.54, label: '"Pay later" option creates\nconfusion and delays', side: 'below' as const },
  { pct: 0.61, label: 'Unpredictable\nadmission timeline', side: 'right' as const },
  { pct: 0.67, label: 'Class could fill up\nwhile waiting', side: 'right' as const },
  { pct: 0.74, label: 'Able to add courses\nnot eligible to enroll in', side: 'above' as const },
  { pct: 0.80, label: 'Unclear how much\nthe class will cost', side: 'below' as const },
];

// Future state: 9 step dots, distributed across visible path range
const futureStateMarkers = [
  { pct: 0.22, label: 'Consistent policies\non landing pages', side: 'above' as const, stageIdx: 0, stepIdx: 0 },
  { pct: 0.28, label: 'Links from Class Search\nto application', side: 'below' as const, stageIdx: 0, stepIdx: 1 },
  { pct: 0.34, label: 'Sign in\nto continue', side: 'left' as const, stageIdx: 1, stepIdx: 0 },
  { pct: 0.40, label: 'Starts a unified\napplication', side: 'left' as const, stageIdx: 1, stepIdx: 1 },
  { pct: 0.46, label: 'Applies for a class', side: 'right' as const, stageIdx: 1, stepIdx: 2 },
  { pct: 0.53, label: 'Gets application\nconfirmation email', side: 'left' as const, stageIdx: 2, stepIdx: 0 },
  { pct: 0.59, label: 'Tracks application\nstatus', side: 'above' as const, stageIdx: 2, stepIdx: 1 },
  { pct: 0.65, label: 'Sees admission\ndecision', side: 'right' as const, stageIdx: 3, stepIdx: 0 },
  { pct: 0.71, label: 'Enrolls in\nthe class', side: 'right' as const, stageIdx: 3, stepIdx: 1 },
  { pct: 0.77, label: 'Pays\u00a0tuition\nclearly', side: 'above' as const, stageIdx: 4, stepIdx: 0 },
];

const stageColors = ['#78BE20', '#00A3E0', '#FF7F32', '#E74973', '#FFC627'];

const currentSummaryData = [
  { num: '01', name: 'Research', color: '#78be20', desc: 'Prospective students find non-degree options via Google, admissions site, or course search. They browse and decide whether to start with a class or the application.' },
  { num: '02', name: 'Apply', color: '#00a3e0', desc: 'Students create accounts, navigate branching questions, complete biographical and academic history sections, and submit applications with payment.' },
  { num: '03', name: 'Decision', color: '#ff7f32', desc: 'Students await system review and propagation, receive admit emails, and become registration eligible — often with no clear timeline or next steps.' },
  { num: '04', name: 'Register', color: '#e74973', desc: 'Students search and add courses, navigate eligibility confusion and seat availability uncertainty, then click through to register or enroll.' },
  { num: '05', name: 'Tuition', color: '#ffc627', desc: 'Students navigate to the Finances tab in MyASU and pay tuition — often with confusion about amounts, timing, and payment options.' },
];

const futureSummaryData = [
  { num: '01', name: 'Research', color: '#78be20', desc: 'Students discover non-degree options through consistent, well-connected pathways with clear policies and direct links from class search to the application.' },
  { num: '02', name: 'Apply', color: '#00a3e0', desc: 'A single, unified application guides students through only essential questions with clear next steps and the ability to reserve a class seat upfront.' },
  { num: '03', name: 'Decision', color: '#ff7f32', desc: 'Students receive timely communications with predictable timelines and clear next steps, reducing anxiety and uncertainty during the waiting period.' },
  { num: '04', name: 'Register', color: '#e74973', desc: 'Students sign into MyASU with a clear priority task, find their course, and register seamlessly without eligibility confusion or dead ends.' },
  { num: '05', name: 'Tuition', color: '#ffc627', desc: 'Students see clear cost breakdowns upfront in MyASU with transparent payment options and no confusion about amounts or timing.' },
];

// Label offset for future state step dots
const LABEL_OFFSET = 32;
const MOBILE_BREAKPOINT = 980;
const MOBILE_MIN_MAP_HEIGHT = 980;
const MOBILE_MAX_MAP_HEIGHT = 1280;

// Reference width the path was designed for
const BASE_WIDTH = 1280;
const SVG_HEIGHT = 620;
const VIEWBOX_Y_OFFSET = 10;

type JourneyState = 'current' | 'future';

interface ComputedPoint {
  x: number;
  y: number;
}

interface SelectedStep {
  stageIdx: number;
  stepIdx: number;
  label: string;
  markerIndex: number;
}

export function JourneyMap() {
  const [journeyState, setJourneyState] = useState<JourneyState>('future');
  const [markersTransitioning, setMarkersTransitioning] = useState(false);
  const [selectedStep, setSelectedStep] = useState<SelectedStep | null>(null);
  const [showElements, setShowElements] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [currentPositions, setCurrentPositions] = useState<ComputedPoint[]>([]);
  const [futurePositions, setFuturePositions] = useState<ComputedPoint[]>([]);
  const [hoveredDot, setHoveredDot] = useState<number | null>(null);
  const [pressedDotCircle, setPressedDotCircle] = useState<number | null>(null);
  const [pressedDotLabel, setPressedDotLabel] = useState<number | null>(null);
  const [highlightedPainPoint, setHighlightedPainPoint] = useState<number | null>(null);
  const [hoveredToggle, setHoveredToggle] = useState<'current' | 'future' | null>(null);
  const [pressedToggle, setPressedToggle] = useState<'current' | 'future' | null>(null);
  const [containerWidth, setContainerWidth] = useState(BASE_WIDTH);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : BASE_WIDTH
  );
  const roadRef = useRef<SVGPathElement>(null);
  const dashRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scaleX = containerWidth / BASE_WIDTH;
  const isMobileLayout = viewportWidth < MOBILE_BREAKPOINT;
  const mobilePaddingX = Math.max(28, Math.min(56, containerWidth * 0.08));
  const mobilePaddingY = 24;
  const mobileMapHeight = Math.max(
    MOBILE_MIN_MAP_HEIGHT,
    Math.min(MOBILE_MAX_MAP_HEIGHT, viewportWidth * 1.25)
  );
  const mobileTrackWidth = Math.max(containerWidth - mobilePaddingX * 2, 220);
  const mobileTrackHeight = mobileMapHeight - mobilePaddingY * 2;
  const mobileRoadScaleX = mobileTrackWidth / SVG_HEIGHT;
  const mobileRoadScaleY = mobileTrackHeight / BASE_WIDTH;
  const labelOffset = isMobileLayout ? 44 : LABEL_OFFSET;
  const summaryGap = isMobileLayout ? 18 : 30;

  const getResponsiveSide = (defaultSide: 'above' | 'below' | 'left' | 'right', index: number) => {
    if (!isMobileLayout) return defaultSide;
    return index % 2 === 0 ? 'right' : 'left';
  };

  const getFutureMobileSide = (index: number, defaultSide: 'above' | 'below' | 'left' | 'right') => {
    if (!isMobileLayout) return defaultSide;

    switch (index) {
      case 1:
        return 'right';
      case 2:
        return 'above';
      case 4:
        return 'below';
      case 5:
        return 'above';
      case 7:
        return 'below';
      case 8:
        return 'left';
      default:
        return getResponsiveSide(defaultSide, index);
    }
  };

  const getMarkerPosition = (pos: ComputedPoint, index = -1, markerType: 'current' | 'future' = 'future') => {
    if (!isMobileLayout) {
      return {
        x: pos.x * scaleX,
        y: pos.y + VIEWBOX_Y_OFFSET,
      };
    }
    const baseY = mobilePaddingY + pos.x * mobileRoadScaleY;
    const topShift = index === 0 ? (pos.x * mobileRoadScaleY) * 0.25 : 0;
    const stepTwoShift = markerType === 'future' && index === 1 ? mobileTrackHeight * 0.11 : 0;
    const stepNineShift = markerType === 'future' && index === 8 ? mobileTrackHeight * 0.11 : 0;

    return {
      x: mobilePaddingX + (SVG_HEIGHT - (pos.y + VIEWBOX_Y_OFFSET)) * mobileRoadScaleX,
      y: baseY - topShift - stepTwoShift + stepNineShift,
    };
  };

  const getLabelStyle = (x: number, y: number, side: 'above' | 'below' | 'left' | 'right'): React.CSSProperties => (
    side === 'above' ? { left: x, top: y - labelOffset, transform: 'translate(-50%, -100%)' } :
    side === 'below' ? { left: x, top: y + labelOffset, transform: 'translate(-50%, 0)' } :
    side === 'left' ? { left: x - labelOffset, top: y, transform: 'translate(-100%, -50%)' } :
    { left: x + labelOffset, top: y, transform: 'translate(0, -50%)' }
  );

  const handleToggle = (newState: JourneyState) => {
    if (newState === journeyState) return;
    setSelectedStep(null);
    setHighlightedPainPoint(null);
    setMarkersTransitioning(true);
    setTimeout(() => {
      setJourneyState(newState);
      setMarkersTransitioning(false);
    }, 250);
  };

  // Track container width
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w) setContainerWidth(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const updateViewportWidth = () => setViewportWidth(window.innerWidth);
    updateViewportWidth();
    window.addEventListener('resize', updateViewportWidth);
    return () => window.removeEventListener('resize', updateViewportWidth);
  }, []);

  // Compute all positions from the path using getPointAtLength
  const computePositions = useCallback(() => {
    const path = roadRef.current;
    if (!path) return;

    const totalLength = path.getTotalLength();

    setCurrentPositions(
      currentStateMarkers.map(m => {
        const pt = path.getPointAtLength(totalLength * m.pct);
        return { x: pt.x, y: pt.y };
      })
    );

    setFuturePositions(
      futureStateMarkers.map(m => {
        const pt = path.getPointAtLength(totalLength * m.pct);
        return { x: pt.x, y: pt.y };
      })
    );
  }, []);

  // Recompute positions when container resizes
  useEffect(() => {
    computePositions();
  }, [containerWidth, computePositions]);

  // Path draw-in animation
  useEffect(() => {
    const road = roadRef.current;
    if (!road) return;

    computePositions();

    const totalLength = road.getTotalLength();
    road.style.strokeDasharray = `${totalLength}`;
    road.style.strokeDashoffset = `${totalLength}`;

    if (dashRef.current) {
      dashRef.current.style.clipPath = `inset(0 100% 0 0)`;
    }

    const duration = 2500;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      road.style.strokeDashoffset = `${totalLength * (1 - eased)}`;

      if (dashRef.current) {
        dashRef.current.style.clipPath = `inset(0 ${(1 - eased) * 100}% 0 0)`;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setShowElements(true);
        setShowPopover(true);
      }
    };

    const timer = setTimeout(() => requestAnimationFrame(animate), 300);
    return () => clearTimeout(timer);
  }, [computePositions]);

  const markersVisible = showElements && !markersTransitioning;
  const summaryData = journeyState === 'current' ? currentSummaryData : futureSummaryData;

  const selectedStage = selectedStep ? journeyStages[selectedStep.stageIdx] : null;
  const selectedPlatform = selectedStage?.platforms[0] || null;

  return (
    <div className="bg-[#F2F1EF] min-h-screen flex flex-col overflow-x-hidden" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div className="bg-white border-b border-[#e8e8e8] shrink-0 relative z-30">
        <div className="flex items-center justify-between gap-[16px] px-[24px] py-[24px] md:px-[40px] lg:px-[85px]">
          <div className="flex items-center gap-[16px] min-w-0">
            <div className="h-[48px] w-[95px] relative shrink-0">
              <img alt="ASU Logo" className="absolute h-[148%] left-[-14%] top-[-24%] w-[127%] max-w-none" src={imgLogo} />
            </div>
            {!isMobileLayout && (
              <p className="leading-none text-[#191919] text-[24px] tracking-[-0.84px] whitespace-nowrap" style={{ fontWeight: 'bold' }}>
                Nondegree Journey Map
              </p>
            )}
          </div>
          {/* State Toggle */}
          <div
            style={{
              background: '#FAFAFA',
              border: '1px solid #D0D0D0',
              borderRadius: 100,
              padding: 8,
              display: 'inline-flex',
              gap: 8,
              position: 'relative',
              flexShrink: 0,
            }}
          >
            {/* Sliding pill */}
            <div
              style={{
                position: 'absolute',
                top: 8,
                bottom: 8,
                left: journeyState === 'current' ? 8 : 'calc(50% + 4px)',
                width: 'calc(50% - 12px)',
                background: pressedToggle === journeyState ? '#6B1530' : hoveredToggle === journeyState ? '#7A1938' : '#8C1D40',
                borderRadius: 100,
                boxShadow: pressedToggle === journeyState ? 'none' : '0px 20px 12px rgba(0,0,0,0.01), 0px 9px 9px rgba(0,0,0,0.03), 0px 2px 5px rgba(0,0,0,0.06)',
                transform: pressedToggle === journeyState ? 'scale(0.97)' : 'scale(1)',
                transition: 'left 200ms ease, background 150ms ease, box-shadow 150ms ease, transform 100ms ease',
                pointerEvents: 'none',
              }}
            />
            {(['current', 'future'] as const).map((state) => {
              const isActive = journeyState === state;
              const isHovered = hoveredToggle === state;
              const isPressed = pressedToggle === state;
              return (
                <button
                  key={state}
                  onClick={() => handleToggle(state)}
                  onMouseEnter={() => setHoveredToggle(state)}
                  onMouseLeave={() => { setHoveredToggle(null); setPressedToggle(null); }}
                  onMouseDown={() => setPressedToggle(state)}
                  onMouseUp={() => setPressedToggle(null)}
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    padding: '8px 16px',
                    background: !isActive
                      ? isPressed ? 'rgba(0,0,0,0.10)' : isHovered ? 'rgba(0,0,0,0.06)' : 'transparent'
                      : 'transparent',
                    border: 'none',
                    borderRadius: 100,
                    color: isActive ? '#FAFAFA' : '#747474',
                    fontWeight: 'bold',
                    fontSize: 16,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    fontFamily: 'Arial, sans-serif',
                    transition: 'background 150ms ease, color 200ms ease',
                  }}
                >
                  {state === 'current' ? 'Current state' : 'Future state'}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Map + Summary */}
      <div className="flex flex-col items-center pb-[80px] pt-0 relative z-10">
        {/* Map Grid */}
        <div className="w-full max-w-[1200px] px-[24px]">
        <div
          ref={containerRef}
          className="relative w-full transition-[height] duration-300 ease-out"
          style={{ height: isMobileLayout ? mobileMapHeight : SVG_HEIGHT, marginTop: 0 }}
        >
          {/* SVG for road only */}
          <svg
            className="absolute inset-0 w-full"
            viewBox={isMobileLayout ? `0 0 ${containerWidth} ${mobileMapHeight}` : `0 -10 ${containerWidth} ${SVG_HEIGHT}`}
            preserveAspectRatio="none"
            fill="none"
            style={{ overflow: isMobileLayout ? 'hidden' : 'visible', height: isMobileLayout ? mobileMapHeight : SVG_HEIGHT }}
          >
            <defs>
              <linearGradient id="pathGradient" gradientUnits="userSpaceOnUse" x1="-800" x2="2100" y1="300" y2="300">
                <stop stopColor="#78BE20" offset="0" />
                <stop stopColor="#78BE20" offset="0.19" />
                <stop stopColor="#00A3E0" offset="0.19" />
                <stop stopColor="#00A3E0" offset="0.39" />
                <stop stopColor="#FF7F32" offset="0.39" />
                <stop stopColor="#FF7F32" offset="0.59" />
                <stop stopColor="#E74973" offset="0.59" />
                <stop stopColor="#E74973" offset="0.79" />
                <stop stopColor="#FFC627" offset="0.79" />
                <stop stopColor="#FFC627" offset="1" />
              </linearGradient>
            </defs>

            {/* Thick colored road */}
            {isMobileLayout ? (
              <g transform={`translate(${mobilePaddingX}, ${mobilePaddingY})`}>
                <g transform={`scale(${mobileRoadScaleX}, ${mobileRoadScaleY})`}>
                  <g transform={`matrix(0 1 -1 0 ${SVG_HEIGHT} 0)`}>
                    <path
                      ref={roadRef}
                      d={ROAD_PATH}
                      stroke="url(#pathGradient)"
                      strokeWidth="42"
                      strokeLinecap="butt"
                      strokeLinejoin="round"
                      fill="none"
                      vectorEffect="non-scaling-stroke"
                    />
                    <path
                      ref={dashRef}
                      d={ROAD_PATH}
                      stroke="black"
                      strokeDasharray="12 12"
                      strokeLinecap="butt"
                      strokeOpacity="0.25"
                      strokeWidth="3"
                      fill="none"
                      vectorEffect="non-scaling-stroke"
                    />
                  </g>
                </g>
              </g>
            ) : (
              <g transform={`scale(${scaleX}, 1)`}>
                <path
                  ref={roadRef}
                  d={ROAD_PATH}
                  stroke="url(#pathGradient)"
                  strokeWidth="42"
                  strokeLinecap="butt"
                  strokeLinejoin="round"
                  fill="none"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  ref={dashRef}
                  d={ROAD_PATH}
                  stroke="black"
                  strokeDasharray="12 12"
                  strokeLinecap="butt"
                  strokeOpacity="0.25"
                  strokeWidth="3"
                  fill="none"
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            )}
          </svg>

          {/* HTML overlay — pixel-positioned, never scaled */}

          {/* ── Current state: Pain point markers ── */}
          {currentPositions.map((pos, i) => {
            const marker = currentStateMarkers[i];
            const { x: pixelX, y: pixelY } = getMarkerPosition(pos, i, 'current');
            const side = getResponsiveSide(marker.side, i);
            const labelStyle = getLabelStyle(pixelX, pixelY, side);
            const textAlign: React.CSSProperties['textAlign'] =
              side === 'left' ? 'right' : side === 'right' ? 'left' : 'center';

            return (
              <div
                key={`pp-${i}`}
                style={{
                  opacity: journeyState === 'current' ? (markersVisible ? 1 : 0) : 0,
                  transition: 'opacity 0.25s ease',
                  pointerEvents: 'none',
                }}
              >
                {/* Rounded-square marker with warning icon */}
                <img
                  src={warningIcon}
                  alt=""
                  className="absolute"
                  style={{
                    left: pixelX - (isMobileLayout ? 22 : 25),
                    top: pixelY - (isMobileLayout ? 20 : 22),
                    width: isMobileLayout ? 44 : 50,
                    height: isMobileLayout ? 40 : 45,
                    pointerEvents: 'none',
                  }}
                />
                {/* Label */}
                <div
                  className="absolute"
                  style={labelStyle}
                >
                  <div
                    style={{
                      display: 'inline-block',
                      minWidth: isMobileLayout ? 0 : 150,
                      maxWidth: isMobileLayout ? Math.min(220, containerWidth * 0.42) : 180,
                      fontFamily: 'Arial, sans-serif',
                      fontSize: 16,
                      color: '#191919',
                      textAlign,
                      lineHeight: 1.35,
                      padding: isMobileLayout ? '8px 6px' : '12px 10px',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {marker.label}
                  </div>
                </div>
              </div>
            );
          })}

          {/* ── Future state: Step dots + labels ── */}
          {futurePositions.map((pos, i) => {
            const marker = futureStateMarkers[i];
            const lines = marker.label.split('\n');
            const isHovered = hoveredDot === i;
            const isCirclePressed = pressedDotCircle === i;
            const isLabelPressed = pressedDotLabel === i;
            const { x: pixelX, y: pixelY } = getMarkerPosition(pos, i, 'future');
            const isFirstDot = i === 0;

            const side = getFutureMobileSide(i, marker.side);
            const labelStyle = getLabelStyle(pixelX, pixelY, side);

            return (
              <div
                key={`future-${i}`}
                style={{
                  opacity: journeyState === 'future' ? (markersVisible ? 1 : 0) : 0,
                  transition: 'opacity 0.25s ease',
                  pointerEvents: journeyState === 'future' ? 'auto' : 'none',
                }}
              >
                {/* Pulse ring on first dot while popover is visible */}
                {isFirstDot && showPopover && journeyState === 'future' && (
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      left: pixelX - 24,
                      top: pixelY - 24,
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      border: '2px solid #999',
                      animation: 'dotPulse 2s ease-out infinite',
                    }}
                  />
                )}
                {/* Invisible hit area */}
                <div
                  className="absolute cursor-pointer rounded-full"
                  style={{
                    left: pixelX - (isMobileLayout ? 34 : 40),
                    top: pixelY - (isMobileLayout ? 34 : 40),
                    width: isMobileLayout ? 68 : 80,
                    height: isMobileLayout ? 68 : 80,
                    background: isHovered ? 'rgba(0,0,0,0.05)' : 'transparent',
                    transition: 'background 0.2s ease',
                  }}
                  onClick={() => setSelectedStep({
                    stageIdx: marker.stageIdx,
                    stepIdx: marker.stepIdx,
                    label: marker.label.split('\n').join(' '),
                    markerIndex: i,
                  })}
                  onMouseEnter={() => setHoveredDot(i)}
                  onMouseLeave={() => { setHoveredDot(null); setPressedDotCircle(null); }}
                  onMouseDown={() => setPressedDotCircle(i)}
                  onMouseUp={() => setPressedDotCircle(null)}
                />
                {/* Dot / Icon */}
                {i === 5 ? (
                  <img
                    src={emailIcon}
                    alt="Email"
                    className="absolute pointer-events-none"
                    style={{
                      left: pixelX - (isMobileLayout ? 20 : 23),
                      top: pixelY - (isMobileLayout ? 20 : 23),
                      width: isMobileLayout ? 40 : 46,
                      height: isMobileLayout ? 40 : 46,
                      transform: isCirclePressed ? 'scale(0.9)' : isHovered ? 'scale(1.4)' : 'scale(1)',
                      filter: isHovered && !isCirclePressed ? 'drop-shadow(0 3px 8px rgba(0,0,0,0.4))' : 'none',
                      transition: 'transform 0.2s ease, filter 0.2s ease',
                    }}
                  />
                ) : (
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      left: pixelX - (isMobileLayout ? 8 : 9),
                      top: pixelY - (isMobileLayout ? 8 : 9),
                      width: isMobileLayout ? 16 : 18,
                      height: isMobileLayout ? 16 : 18,
                      borderRadius: '50%',
                      background: '#191919',
                      border: '3px solid white',
                      transform: isCirclePressed ? 'scale(0.9)' : isHovered ? 'scale(1.5)' : 'scale(1)',
                      boxShadow: isHovered && !isCirclePressed ? '0 3px 12px rgba(0,0,0,0.45)' : 'none',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    }}
                  />
                )}
                {/* Label */}
                <div
                  className="absolute"
                  style={{ ...labelStyle, pointerEvents: 'none' }}
                >
                  <div
                    style={{
                      display: 'inline-block',
                      fontFamily: 'Arial, sans-serif',
                      fontSize: 16,
                      color: '#191919',
                      textAlign: side === 'left' ? 'right' : side === 'right' ? 'left' : 'center',
                      lineHeight: 1.35,
                      padding: isMobileLayout ? '8px 6px' : '12px 10px',
                      borderRadius: 6,
                      background: isHovered ? 'rgba(255,255,255,0.8)' : 'transparent',
                      border: isHovered ? '1px solid rgba(0,0,0,0.1)' : '1px solid transparent',
                      backdropFilter: isHovered ? 'blur(16px)' : undefined,
                      WebkitBackdropFilter: isHovered ? 'blur(16px)' : undefined,
                      boxShadow: isHovered ? '0px 2px 8px rgba(0,0,0,0.1)' : 'none',
                      transform: isLabelPressed ? 'scale(0.95)' : 'scale(1)',
                      transition: 'background 0.2s ease, border 0.2s ease, box-shadow 0.2s ease',
                      whiteSpace: 'pre-line',
                      maxWidth: isMobileLayout
                        ? i === 1
                          ? Math.min(260, containerWidth * 0.62)
                          : Math.min(200, containerWidth * 0.42)
                        : 200,
                      pointerEvents: journeyState === 'future' ? 'auto' : 'none',
                      cursor: journeyState === 'future' ? 'pointer' : 'default',
                    }}
                    onClick={() => setSelectedStep({
                      stageIdx: marker.stageIdx,
                      stepIdx: marker.stepIdx,
                      label: marker.label.split('\n').join(' '),
                      markerIndex: i,
                    })}
                    onMouseEnter={() => setHoveredDot(i)}
                    onMouseLeave={() => { setHoveredDot(null); setPressedDotLabel(null); }}
                    onMouseDown={() => setPressedDotLabel(i)}
                    onMouseUp={() => setPressedDotLabel(null)}
                  >
                    {lines.join('\n')}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Guided Tour Popover — only in Future state, anchored to first future dot */}
          {futurePositions.length > 0 && journeyState === 'future' && (
            <GuidedTourPopover
              visible={showPopover}
              onDismiss={() => setShowPopover(false)}
              anchorX={getMarkerPosition(futurePositions[0], 0, 'future').x}
              anchorY={getMarkerPosition(futurePositions[0], 0, 'future').y}
              placement={isMobileLayout ? 'below' : 'above'}
              compact={isMobileLayout}
            />
          )}
        </div>
        </div>

        {/* Summary Section */}
        <div
          className="w-full max-w-[1200px] px-[24px] relative z-10"
          style={{
            opacity: showElements ? (markersTransitioning ? 0 : 1) : 0,
            transform: showElements ? 'translateY(0)' : 'translateY(20px)',
            transition: markersTransitioning
              ? 'opacity 0.25s ease'
              : 'opacity 0.25s ease, transform 0.6s ease 0.2s',
          }}
        >
          <div className="bg-white/80 backdrop-blur-[25px] rounded-[12px] border border-black/10 shadow-[0px_10px_22px_0px_rgba(0,0,0,0.05),0px_40px_40px_0px_rgba(0,0,0,0.04)]">
            <div className={`grid p-[24px] md:p-[32px] ${isMobileLayout ? 'grid-cols-1' : 'grid-cols-5'}`} style={{ gap: summaryGap }}>
              {summaryData.map((stage) => (
                <div key={stage.num} className="flex-1 flex flex-col gap-[8px]">
                  <p className="text-[40px] tracking-[-1.4px] leading-none" style={{ color: stage.color, fontWeight: 'bold' }}>{stage.num}</p>
                  <p className="text-[24px] text-black tracking-[-0.84px] leading-[1.1]" style={{ fontWeight: 'bold' }}>{stage.name}</p>
                  <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full" style={{ backgroundColor: stage.color }} />
                    <p className="pl-[12px] text-[14px] text-[#191919] opacity-60 leading-[1.4]">{stage.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Platform Modal */}
      <AnimatePresence>
        {selectedStep && selectedPlatform && selectedStage && (
          <PlatformModal
            platform={selectedPlatform}
            stageColor={stageColors[selectedStep.stageIdx]}
            stepLabel={selectedStep.label}
            stageName={selectedStage.title}
            onClose={() => setSelectedStep(null)}
            beforeImg={comparisonImages[selectedStep.markerIndex]?.before}
            afterImg={comparisonImages[selectedStep.markerIndex]?.after}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
