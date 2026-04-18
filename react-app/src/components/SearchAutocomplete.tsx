'use client';

import { useState, useRef, useEffect } from 'react';

interface Props {
  placeholder?: string;
}

const suggestions = [
  'Birth Certificate',
  'Marriage Certificate',
  'Death Certificate',
  'Business Permit',
  'Real Property Tax',
  'Cedula',
  'Senior Citizen ID',
  'PWD ID',
  'Building Permit',
  'Financial Assistance',
  'Health Services',
  'Agriculture',
];

export default function SearchAutocomplete({ placeholder }: Props) {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length < 2) {
      setFiltered([]);
      setOpen(false);
      return;
    }
    const q = query.toLowerCase();
    setFiltered(suggestions.filter((s) => s.toLowerCase().includes(q)));
    setOpen(true);
  }, [query]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div ref={ref} className="search-autocomplete-wrapper">
      <input
        type="text"
        className="search-box"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder || 'Search services...'}
        aria-label="Search services"
        autoComplete="off"
      />
      {open && filtered.length > 0 && (
        <ul className="search-autocomplete-list" role="listbox" aria-label="Search suggestions">
          {filtered.map((item) => (
            <li
              key={item}
              role="option"
              className="search-autocomplete-item"
              onClick={() => {
                setQuery(item);
                setOpen(false);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
