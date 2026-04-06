'use client';

import { useEffect, useRef, useCallback } from 'react';

const hotlines = [
  { icon: 'bi-shield-fill', label: 'Police', number: '0927 400 8033', tel: '09274008033' },
  { icon: 'bi-heart-fill', label: 'MSWDO', number: '0916 284 0885', tel: '09162840885' },
  { icon: 'bi-fire', label: 'Fire', number: '0936 062 0305', tel: '09360620305' },
  { icon: 'bi-building', label: 'DILG', number: '0906 188 086', tel: '0906188086' },
  {
    icon: 'bi-exclamation-triangle-fill',
    label: 'MDRRMO',
    number: '0926 383 3744',
    tel: '09263833744',
  },
  { icon: 'bi-truck', label: 'R2TMC', number: '0906 819 5569', tel: '09068195569' },
];

export default function HotlineBar() {
  const itemsRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const isTabletOrBelow = useCallback(() => {
    return typeof window !== 'undefined' && window.matchMedia('(max-width: 1024px)').matches;
  }, []);

  useEffect(() => {
    const container = itemsRef.current;
    if (!container) return;

    function buildMarquee() {
      if (!isTabletOrBelow() || trackRef.current || !container) return;
      const track = document.createElement('div');
      track.className = 'hotline-items-track';
      track.setAttribute('aria-label', 'Emergency contacts scrolling');

      const items = Array.from(container.children);
      while (container.firstChild) track.appendChild(container.firstChild);
      items.forEach((item) => {
        const clone = item.cloneNode(true) as HTMLElement;
        clone.setAttribute('aria-hidden', 'true');
        clone.setAttribute('tabindex', '-1');
        track.appendChild(clone);
      });
      container.appendChild(track);
      trackRef.current = track;
    }

    function destroyMarquee() {
      if (!trackRef.current || !container) return;
      const originals = Array.from(trackRef.current.children).slice(0, hotlines.length);
      while (container.firstChild) container.removeChild(container.firstChild);
      originals.forEach((item) => container.appendChild(item));
      trackRef.current = null;
    }

    function handleResize() {
      if (isTabletOrBelow()) buildMarquee();
      else destroyMarquee();
    }

    handleResize();
    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(handleResize, 150);
    };
    window.addEventListener('resize', onResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', onResize);
    };
  }, [isTabletOrBelow]);

  return (
    <div className="hotline-bar">
      <div className="container">
        <div className="hotline-inner">
          <div className="hotline-items" ref={itemsRef}>
            {hotlines.map((h) => (
              <a key={h.tel} href={`tel:${h.tel}`} className="hotline-item">
                <i className={`bi ${h.icon}`} aria-hidden="true" />
                <span>
                  {h.label}: {h.number}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
