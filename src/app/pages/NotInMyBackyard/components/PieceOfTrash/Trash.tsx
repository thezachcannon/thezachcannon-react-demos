import React from "react";

export enum TrashType {
  Soda = "soda",
  Banana = "banana",
  Newspaper = "newspaper",
  Bottle = "bottle",
  Bag = "bag",
}

const icons: Record<string, any> = {
  [TrashType.Soda]: (
    <svg viewBox="0 0 64 64">
      <rect x="18" y="10" width="28" height="44" rx="6" fill="#f0625b" stroke="#2b2b2b" strokeWidth="2" />
      <rect x="20" y="12" width="24" height="6" rx="3" fill="#ff8a80" opacity="0.9" />
      <ellipse cx="32" cy="54" rx="12" ry="3" fill="#c84b44" stroke="#2b2b2b" strokeWidth="1" />
      <path d="M24 22h16" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
      <path d="M24 28h10" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
    </svg>
  ),
  [TrashType.Banana]: (
    <svg viewBox="0 0 64 64">
      <path d="M10 38c6-10 20-18 32-6 6 6 4 12 2 18-2 6-18 8-30-4z" fill="#ffd54f" stroke="#2b2b2b" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M16 34c6-6 12-8 20-4" fill="none" stroke="#f9a825" strokeWidth="3" strokeLinecap="round"/>
      <path d="M28 24c2-4 8-6 12-4" fill="none" stroke="#f9a825" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="22" cy="44" r="2.5" fill="#fff" opacity="0.6"/>
    </svg>
  ),
  [TrashType.Newspaper]: (
    <svg viewBox="0 0 64 64">
      <rect x="8" y="12" width="40" height="36" rx="3" fill="#eeeeee" stroke="#2b2b2b" strokeWidth="2"/>
      <path d="M8 24h40" stroke="#bdbdbd" strokeWidth="2" strokeLinecap="round"/>
      <rect x="12" y="16" width="20" height="8" fill="#cfd8dc" rx="1"/>
      <path d="M20 28h18M20 32h14M20 36h10" stroke="#9e9e9e" strokeWidth="2" strokeLinecap="round"/>
      <path d="M44 28c3 2 6 6 4 10-2 4-6 6-10 6" fill="none" stroke="#2b2b2b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
    </svg>
  ),
  [TrashType.Bottle]: (
    <svg viewBox="0 0 64 64">
      <path d="M30 8h4v6c0 2 6 2 6 10s-6 18-6 18H28s-6-10-6-18 6-8 6-10V8z" fill="#82b1ff" stroke="#2b2b2b" strokeWidth="2" strokeLinejoin="round"/>
      <rect x="29.2" y="6" width="5.6" height="4" rx="1" fill="#bbdefb" />
      <ellipse cx="32" cy="52" rx="8.5" ry="3" fill="#5f9fff" stroke="#2b2b2b" strokeWidth="1"/>
      <path d="M28 20c4-2 8-2 12 0" stroke="#e3f2fd" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
    </svg>
  ),
  [TrashType.Bag]: (
    <svg viewBox="0 0 64 64">
      <path d="M18 14c0-3 6-6 14-6s14 3 14 6v8c0 0-2 4-3 10s-4 12-11 12-12-6-14-12-2-10-2-10z" fill="#b2ffbb" stroke="#2b2b2b" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M26 10c0 2 2 4 6 4s6-2 6-4" fill="#e8f5e9" opacity="0.6"/>
      <path d="M22 26c6 6 14 6 20 0" stroke="#9ccc65" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
      <line x1="20" y1="16" x2="20" y2="12" stroke="#2b2b2b" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
      <line x1="44" y1="16" x2="44" y2="12" stroke="#2b2b2b" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
    </svg>
  ),
};

export default function Trash({ type = "soda", size = 64, fill, stroke }) {
  const icon = icons[type] || icons.soda;
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "inline-block",
      }}
    >
      {React.cloneElement(icon, {
        width: size,
        height: size,
        ...(fill && { fill }),
        ...(stroke && { stroke }),
      })}
    </div>
  );
}
