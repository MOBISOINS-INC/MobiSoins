'use client';

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';
import NextImage from 'next/image';
import type React from 'react';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type TileProvider = 'openstreetmap' | 'carto-light' | 'carto-dark' | 'esri-dark';

interface LocationMapProps {
  /** Location name to display */
  location?: string;
  /** Latitude coordinate */
  latitude?: number;
  /** Longitude coordinate */
  longitude?: number;
  /** Zoom level for the map (1-17). Base tiles are fetched one level deeper for sharpness. */
  zoom?: number;
  /** Additional CSS classes */
  className?: string;
  /** Map tile provider. CARTO's public basemaps are watermarked without an API key; esri-dark is not. */
  tileProvider?: TileProvider;
  /** Whether the card starts expanded */
  defaultExpanded?: boolean;
  /** Tile licence line shown in the expanded state (defaults per provider) */
  attribution?: string;
}

const ATTRIBUTION: Record<TileProvider, string> = {
  openstreetmap: '© OpenStreetMap contributors',
  'carto-light': '© OpenStreetMap contributors · © CARTO',
  'carto-dark': '© OpenStreetMap contributors · © CARTO',
  'esri-dark': '© Esri, HERE, Garmin · © OpenStreetMap contributors',
};

const TILE = 256;

// Fractional tile coordinates: the integer part is the tile index, the fraction is the position inside it
function latLngToTile(lat: number, lng: number, zoom: number) {
  const n = 2 ** zoom;
  const x = ((lng + 180) / 360) * n;
  const latRad = (lat * Math.PI) / 180;
  const y = ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n;
  return { x, y };
}

// Get tile URL based on provider
function getTileUrl(provider: TileProvider, x: number, y: number, z: number) {
  switch (provider) {
    case 'carto-light':
      return `https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/${z}/${x}/${y}.png`;
    case 'carto-dark':
      return `https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/${z}/${x}/${y}.png`;
    case 'esri-dark':
      return `https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/${z}/${y}/${x}`;
    default:
      return `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;
  }
}

// Optional label layer drawn on top of the base tiles (esri-dark keeps labels in a separate service)
function getOverlayUrl(provider: TileProvider, x: number, y: number, z: number) {
  if (provider === 'esri-dark') {
    return `https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/${z}/${y}/${x}`;
  }
  return null;
}

// Format coordinates for display
function formatCoordinates(lat: number, lng: number) {
  const latDir = lat >= 0 ? 'N' : 'S';
  const lngDir = lng >= 0 ? 'E' : 'W';
  return `${Math.abs(lat).toFixed(4)}° ${latDir}, ${Math.abs(lng).toFixed(4)}° ${lngDir}`;
}

// Card sizes: fixed on lg, fluid width on smaller screens (the parent caps it)
const SIZES = {
  desktop: { collapsed: { width: 260, height: 150 }, expanded: { width: 420, height: 300 } },
  mobile: { collapsed: { width: '100%', height: 150 }, expanded: { width: '100%', height: 260 } },
} as const;

export function useIsLarge() {
  const [isLarge, setIsLarge] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches
  );
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => setIsLarge(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return isLarge;
}

type Tile = { key: string; url: string; left: number; top: number; size: number; layer: 'base' | 'overlay' };

export function LocationMap({
  location = 'San Francisco, CA',
  latitude = 37.7749,
  longitude = -122.4194,
  zoom = 14,
  className,
  tileProvider = 'esri-dark',
  defaultExpanded = false,
  attribution,
}: LocationMapProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [tilesLoaded, setTilesLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const isLarge = useIsLarge();
  const gridId = useId().replace(/:/g, '');
  const attributionText = attribution ?? ATTRIBUTION[tileProvider];

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-50, 50], [8, -8]);
  const rotateY = useTransform(mouseX, [-50, 50], [-8, 8]);

  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const coordinates = useMemo(() => formatCoordinates(latitude, longitude), [latitude, longitude]);

  // Tiles are positioned relative to the exact coordinate, which sits at the card centre.
  // Base tiles come from one zoom level deeper and are drawn at half size (2x density);
  // a 5x5 block keeps at least 256px of map on every side of the point.
  // Label tiles are fetched at the display zoom in a 3x3 block.
  const tiles = useMemo(() => {
    const c = latLngToTile(latitude, longitude, zoom);
    const px = c.x * TILE;
    const py = c.y * TILE;
    const list: Tile[] = [];

    const baseZoom = zoom + 1;
    const baseSize = TILE / 2;
    const bc = { x: Math.floor(c.x * 2), y: Math.floor(c.y * 2) };
    for (let dy = -2; dy <= 2; dy++) {
      for (let dx = -2; dx <= 2; dx++) {
        const tx = bc.x + dx;
        const ty = bc.y + dy;
        list.push({
          key: `b-${tx}-${ty}`,
          url: getTileUrl(tileProvider, tx, ty, baseZoom),
          left: tx * baseSize - px,
          top: ty * baseSize - py,
          size: baseSize,
          layer: 'base',
        });
      }
    }

    const oc = { x: Math.floor(c.x), y: Math.floor(c.y) };
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const tx = oc.x + dx;
        const ty = oc.y + dy;
        const url = getOverlayUrl(tileProvider, tx, ty, zoom);
        if (url) {
          list.push({ key: `o-${tx}-${ty}`, url, left: tx * TILE - px, top: ty * TILE - py, size: TILE, layer: 'overlay' });
        }
      }
    }

    return list;
  }, [latitude, longitude, zoom, tileProvider]);

  // Preload tiles, but only once the map is actually shown (saves ~30 requests on phones where it starts collapsed)
  useEffect(() => {
    if (!isExpanded || tilesLoaded) return;
    let loadedCount = 0;
    const totalTiles = tiles.length;
    const done = () => {
      loadedCount++;
      if (loadedCount === totalTiles) {
        setTilesLoaded(true);
      }
    };

    tiles.forEach((tile) => {
      const img = new Image();
      img.onload = done;
      img.onerror = done;
      img.src = tile.url;
    });
  }, [tiles, isExpanded, tilesLoaded]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const toggle = () => setIsExpanded((v) => !v);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  };

  const size = (isLarge ? SIZES.desktop : SIZES.mobile)[isExpanded ? 'expanded' : 'collapsed'];
  const expandTransition = reduceMotion
    ? { duration: 0.2 }
    : { type: 'spring' as const, stiffness: 400, damping: 35 };

  return (
    <motion.div
      ref={containerRef}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      aria-label={location}
      className={cn(
        'relative cursor-pointer select-none rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-royal-400/60',
        className
      )}
      style={{
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      onClick={toggle}
      onKeyDown={handleKeyDown}
    >
      <motion.div
        className="beam relative overflow-hidden rounded-2xl border border-white/10 bg-navy-950/70 backdrop-blur-xl"
        style={{
          rotateX: reduceMotion ? 0 : springRotateX,
          rotateY: reduceMotion ? 0 : springRotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          width: size.width,
          height: size.height,
        }}
        transition={expandTransition}
      >
        {/* Subtle gradient overlay */}
        <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-br from-navy-800/20 via-transparent to-navy-800/40" />

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="pointer-events-none absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {/* Real map tiles, positioned around the exact coordinate at the card centre */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 h-0 w-0">
                  {tiles.map((tile, index) => (
                    <motion.div
                      key={tile.key}
                      className="absolute"
                      style={{
                        width: `${tile.size}px`,
                        height: `${tile.size}px`,
                        left: `${tile.left}px`,
                        top: `${tile.top}px`,
                        zIndex: tile.layer === 'overlay' ? 1 : 0,
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: tilesLoaded ? 1 : 0 }}
                      transition={{ duration: 0.3, delay: index * 0.02 }}
                    >
                      <NextImage src={tile.url} alt="" width={TILE} height={TILE} unoptimized className="h-full w-full" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Map loading placeholder */}
              {!tilesLoaded && <div className="absolute inset-0 animate-pulse bg-navy-800" />}

              {/* Location marker */}
              <motion.div
                className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0, y: -20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 20,
                  delay: 0.3,
                }}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="drop-shadow-lg"
                  style={{
                    filter: 'drop-shadow(0 0 10px color-mix(in srgb, var(--color-sage) 50%, transparent))',
                  }}
                >
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                    className="fill-sage"
                  />
                  <circle cx="12" cy="9" r="2.5" className="fill-navy-950" />
                </svg>
              </motion.div>

              {/* Gradient overlays for better text readability */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-70" />
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-navy-950/50 via-transparent to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid pattern - only show when collapsed */}
        <motion.div
          className="absolute inset-0 opacity-[0.03]"
          animate={{ opacity: isExpanded ? 0 : 0.03 }}
          transition={{ duration: 0.3 }}
        >
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id={`grid-${gridId}`} width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" className="stroke-white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#grid-${gridId})`} />
          </svg>
        </motion.div>

        {/* Content */}
        <div className="relative z-20 flex h-full flex-col justify-between p-5">
          {/* Top section */}
          <div className="flex items-start justify-between">
            <div className="relative">
              <motion.div
                className="relative"
                animate={{
                  opacity: isExpanded ? 0 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Map Icon SVG */}
                <motion.svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-sage"
                  animate={{
                    filter: isHovered
                      ? 'drop-shadow(0 0 8px color-mix(in srgb, var(--color-sage) 60%, transparent))'
                      : 'drop-shadow(0 0 4px color-mix(in srgb, var(--color-sage) 30%, transparent))',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                  <line x1="9" x2="9" y1="3" y2="18" />
                  <line x1="15" x2="15" y1="6" y2="21" />
                </motion.svg>
              </motion.div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="space-y-1">
            <motion.h3
              className="text-sm font-medium tracking-tight text-white"
              animate={{
                x: isHovered && !reduceMotion ? 4 : 0,
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              {location}
            </motion.h3>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="font-mono text-xs text-mist-dim">{coordinates}</p>
                  <p className="mt-1 font-mono text-[10px] text-mist-dim/80">{attributionText}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Animated underline */}
            <motion.div
              className="h-px bg-gradient-to-r from-sage/50 via-sage/30 to-transparent"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{
                scaleX: isHovered || isExpanded ? 1 : 0.3,
              }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default LocationMap;
