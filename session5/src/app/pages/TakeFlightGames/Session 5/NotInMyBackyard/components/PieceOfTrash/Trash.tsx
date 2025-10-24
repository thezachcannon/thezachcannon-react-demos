import React from "react";

export enum TrashType {
  DeathStarDebris = "deathStarDebris",
  TieFighterWing = "tieFighterWing",
  StormtrooperHelmet = "stormtrooperHelmet",
  LightsaberHilt = "lightsaberHilt",
  ImperialCrate = "imperialCrate",
}

const icons: Record<string, any> = {
  [TrashType.DeathStarDebris]: (
    <svg viewBox="0 0 64 64">
      <circle cx="32" cy="32" r="28" fill="#666666" stroke="#333" strokeWidth="2" />
      <circle cx="32" cy="32" r="24" fill="#888888" opacity="0.8" />
      <circle cx="24" cy="24" r="6" fill="#444444" stroke="#222" strokeWidth="1" />
      <circle cx="40" cy="28" r="4" fill="#444444" stroke="#222" strokeWidth="1" />
      <circle cx="28" cy="40" r="3" fill="#444444" stroke="#222" strokeWidth="1" />
      <path d="M16 20l8 8M48 16l-8 8M20 48l8-8" stroke="#555" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  [TrashType.TieFighterWing]: (
    <svg viewBox="0 0 64 64">
      <rect x="8" y="20" width="48" height="24" rx="4" fill="#333333" stroke="#111" strokeWidth="2" />
      <rect x="12" y="24" width="40" height="16" fill="#555555" opacity="0.8" />
      <circle cx="32" cy="32" r="8" fill="#666666" stroke="#222" strokeWidth="2" />
      <circle cx="32" cy="32" r="4" fill="#888888" />
      <path d="M16 28h8M40 28h8M16 36h8M40 36h8" stroke="#777" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  [TrashType.StormtrooperHelmet]: (
    <svg viewBox="0 0 64 64">
      <ellipse cx="32" cy="30" rx="20" ry="24" fill="#ffffff" stroke="#333" strokeWidth="2" />
      <ellipse cx="26" cy="26" rx="4" ry="6" fill="#000000" />
      <ellipse cx="38" cy="26" rx="4" ry="6" fill="#000000" />
      <path d="M24 36c4 2 8 2 16 0" fill="none" stroke="#333" strokeWidth="3" strokeLinecap="round"/>
      <rect x="30" y="40" width="4" height="8" rx="2" fill="#333" />
      <path d="M20 20c6-4 8-4 24 0" fill="none" stroke="#ddd" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  [TrashType.LightsaberHilt]: (
    <svg viewBox="0 0 64 64">
      <rect x="28" y="8" width="8" height="48" rx="4" fill="#c0c0c0" stroke="#333" strokeWidth="2" />
      <rect x="26" y="12" width="12" height="6" rx="2" fill="#888888" />
      <rect x="26" y="22" width="12" height="4" rx="1" fill="#666666" />
      <rect x="26" y="30" width="12" height="4" rx="1" fill="#666666" />
      <rect x="26" y="38" width="12" height="4" rx="1" fill="#666666" />
      <circle cx="32" cy="50" r="4" fill="#444444" stroke="#222" strokeWidth="1" />
      <rect x="30" y="6" width="4" height="4" rx="2" fill="#00ff00" opacity="0.8" />
    </svg>
  ),
  [TrashType.ImperialCrate]: (
    <svg viewBox="0 0 64 64">
      <rect x="12" y="16" width="40" height="32" rx="2" fill="#444444" stroke="#222" strokeWidth="2" />
      <rect x="16" y="20" width="32" height="24" fill="#666666" opacity="0.8" />
      <path d="M20 24h24M20 32h24M20 40h24" stroke="#888" strokeWidth="2" strokeLinecap="round"/>
      <rect x="28" y="26" width="8" height="12" fill="#333333" stroke="#111" strokeWidth="1" />
      <circle cx="32" cy="32" r="2" fill="#ff0000" />
      <path d="M12 16l8-8h24l8 8M12 48l8 8h24l8-8" fill="#555" stroke="#222" strokeWidth="1"/>
    </svg>
  ),
};

export default function Trash({ type = "deathStarDebris", size = 64, fill, stroke }) {
  const icon = icons[type] || icons.deathStarDebris;
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
