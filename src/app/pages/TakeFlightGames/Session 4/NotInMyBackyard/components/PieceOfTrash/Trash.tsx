import React from "react";

export enum DinosaurType {
  TRex = "trex",
  Triceratops = "triceratops", 
  Stegosaurus = "stegosaurus",
  Velociraptor = "velociraptor",
  Brontosaurus = "brontosaurus",
}

const icons: Record<string, any> = {
  [DinosaurType.TRex]: (
    <svg viewBox="0 0 64 64">
      <ellipse cx="32" cy="45" rx="18" ry="12" fill="#8bc34a" stroke="#2b2b2b" strokeWidth="2"/>
      <ellipse cx="32" cy="25" rx="12" ry="8" fill="#689f38" stroke="#2b2b2b" strokeWidth="2"/>
      <path d="M20 25c-4-2-6-6-4-8 2-2 6 0 8 2" fill="#8bc34a" stroke="#2b2b2b" strokeWidth="2"/>
      <path d="M44 25c4-2 6-6 4-8-2-2-6 0-8 2" fill="#8bc34a" stroke="#2b2b2b" strokeWidth="2"/>
      <circle cx="28" cy="22" r="2" fill="#fff"/>
      <circle cx="36" cy="22" r="2" fill="#fff"/>
      <circle cx="28" cy="22" r="1" fill="#000"/>
      <circle cx="36" cy="22" r="1" fill="#000"/>
      <path d="M26 28c2 2 4 2 6 2s4 0 6-2" stroke="#2b2b2b" strokeWidth="2" strokeLinecap="round"/>
      <path d="M18 50l-4 8M46 50l4 8" stroke="#2b2b2b" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  ),
  [DinosaurType.Triceratops]: (
    <svg viewBox="0 0 64 64">
      <ellipse cx="32" cy="40" rx="20" ry="14" fill="#ff9800" stroke="#2b2b2b" strokeWidth="2"/>
      <path d="M12 30c0-8 8-12 20-12s20 4 20 12c0 4-4 8-8 10-8 4-16 4-24 0-4-2-8-6-8-10z" fill="#ffb74d" stroke="#2b2b2b" strokeWidth="2"/>
      <circle cx="26" cy="25" r="2" fill="#fff"/>
      <circle cx="38" cy="25" r="2" fill="#fff"/>
      <circle cx="26" cy="25" r="1" fill="#000"/>
      <circle cx="38" cy="25" r="1" fill="#000"/>
      <path d="M18 20l-6-8M32 18l0-10M46 20l6-8" stroke="#2b2b2b" strokeWidth="3" strokeLinecap="round"/>
      <ellipse cx="18" cy="12" rx="3" ry="6" fill="#ff9800" stroke="#2b2b2b" strokeWidth="2"/>
      <ellipse cx="32" cy="8" rx="3" ry="6" fill="#ff9800" stroke="#2b2b2b" strokeWidth="2"/>
      <ellipse cx="46" cy="12" rx="3" ry="6" fill="#ff9800" stroke="#2b2b2b" strokeWidth="2"/>
    </svg>
  ),
  [DinosaurType.Stegosaurus]: (
    <svg viewBox="0 0 64 64">
      <ellipse cx="32" cy="45" rx="22" ry="10" fill="#4caf50" stroke="#2b2b2b" strokeWidth="2"/>
      <ellipse cx="25" cy="25" rx="8" ry="6" fill="#66bb6a" stroke="#2b2b2b" strokeWidth="2"/>
      <circle cx="22" cy="23" r="1.5" fill="#fff"/>
      <circle cx="28" cy="23" r="1.5" fill="#fff"/>
      <circle cx="22" cy="23" r="0.8" fill="#000"/>
      <circle cx="28" cy="23" r="0.8" fill="#000"/>
      <path d="M15 35l-2-12M25 30l0-15M35 32l2-16M45 35l0-12M52 40l-2-8" stroke="#2b2b2b" strokeWidth="2"/>
      <polygon points="13,23 17,35 15,35" fill="#8bc34a" stroke="#2b2b2b" strokeWidth="2"/>
      <polygon points="25,15 27,30 23,30" fill="#8bc34a" stroke="#2b2b2b" strokeWidth="2"/>
      <polygon points="37,16 35,32 39,32" fill="#8bc34a" stroke="#2b2b2b" strokeWidth="2"/>
      <polygon points="45,23 47,35 43,35" fill="#8bc34a" stroke="#2b2b2b" strokeWidth="2"/>
      <polygon points="50,32 52,40 48,40" fill="#8bc34a" stroke="#2b2b2b" strokeWidth="2"/>
    </svg>
  ),
  [DinosaurType.Velociraptor]: (
    <svg viewBox="0 0 64 64">
      <ellipse cx="32" cy="42" rx="16" ry="10" fill="#9c27b0" stroke="#2b2b2b" strokeWidth="2"/>
      <ellipse cx="28" cy="25" rx="10" ry="7" fill="#ba68c8" stroke="#2b2b2b" strokeWidth="2"/>
      <circle cx="25" cy="22" r="2" fill="#fff"/>
      <circle cx="31" cy="22" r="2" fill="#fff"/>
      <circle cx="25" cy="22" r="1" fill="#000"/>
      <circle cx="31" cy="22" r="1" fill="#000"/>
      <path d="M20 25c-2-1-4-3-3-5 1-2 4-1 5 1" fill="#9c27b0" stroke="#2b2b2b" strokeWidth="2"/>
      <path d="M22 28c2 1 4 1 6 0" stroke="#2b2b2b" strokeWidth="2" strokeLinecap="round"/>
      <path d="M16 48l-4 8M48 48l4 8" stroke="#2b2b2b" strokeWidth="3" strokeLinecap="round"/>
      <path d="M40 35c8-2 12 2 10 8-2 6-8 4-10 0" fill="#9c27b0" stroke="#2b2b2b" strokeWidth="2"/>
      <path d="M14 40c2 4 6 6 10 4" stroke="#2b2b2b" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  [DinosaurType.Brontosaurus]: (
    <svg viewBox="0 0 64 64">
      <ellipse cx="32" cy="48" rx="24" ry="8" fill="#795548" stroke="#2b2b2b" strokeWidth="2"/>
      <ellipse cx="32" cy="35" rx="18" ry="12" fill="#8d6e63" stroke="#2b2b2b" strokeWidth="2"/>
      <path d="M20 30c-8-4-12-12-8-20 4-8 12-4 16 4 4 8 0 16-8 16z" fill="#a1887f" stroke="#2b2b2b" strokeWidth="2"/>
      <circle cx="18" cy="18" r="2" fill="#fff"/>
      <circle cx="18" cy="18" r="1" fill="#000"/>
      <path d="M16 22c2 1 4 1 6 0" stroke="#2b2b2b" strokeWidth="2" strokeLinecap="round"/>
      <path d="M45 35c8 0 12-4 12-8s-4-8-12-8" fill="none" stroke="#2b2b2b" strokeWidth="2"/>
      <path d="M20 52l-4 8M44 52l4 8" stroke="#2b2b2b" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="25" cy="30" r="3" fill="#6d4c41" opacity="0.6"/>
      <circle cx="35" cy="32" r="2.5" fill="#6d4c41" opacity="0.6"/>
      <circle cx="40" cy="28" r="2" fill="#6d4c41" opacity="0.6"/>
    </svg>
  ),
};

export default function Dinosaur({ type = "trex", size = 64, fill, stroke }) {
  const icon = icons[type] || icons.trex;
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
