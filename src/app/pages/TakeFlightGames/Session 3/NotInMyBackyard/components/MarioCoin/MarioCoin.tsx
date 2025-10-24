import React from "react";

export enum CoinType {
  Gold = "gold",
  Silver = "silver",
  Bronze = "bronze",
  Star = "star",
  Mushroom = "mushroom",
}

const coinIcons: Record<string, any> = {
  [CoinType.Gold]: (
    <svg viewBox="0 0 32 32" className="animate-spin">
      <circle cx="16" cy="16" r="14" fill="#FFD700" stroke="#B8860B" strokeWidth="2" />
      <circle cx="16" cy="16" r="10" fill="#FFF700" opacity="0.8" />
      <text x="16" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#B8860B">$</text>
    </svg>
  ),
  [CoinType.Silver]: (
    <svg viewBox="0 0 32 32" className="animate-spin">
      <circle cx="16" cy="16" r="14" fill="#C0C0C0" stroke="#808080" strokeWidth="2" />
      <circle cx="16" cy="16" r="10" fill="#E8E8E8" opacity="0.8" />
      <text x="16" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#808080">$</text>
    </svg>
  ),
  [CoinType.Bronze]: (
    <svg viewBox="0 0 32 32" className="animate-spin">
      <circle cx="16" cy="16" r="14" fill="#CD7F32" stroke="#8B4513" strokeWidth="2" />
      <circle cx="16" cy="16" r="10" fill="#DEB887" opacity="0.8" />
      <text x="16" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#8B4513">$</text>
    </svg>
  ),
  [CoinType.Star]: (
    <svg viewBox="0 0 32 32" className="animate-pulse">
      <path 
        d="M16 2 L20 12 L30 12 L22 18 L26 28 L16 22 L6 28 L10 18 L2 12 L12 12 Z" 
        fill="#FFD700" 
        stroke="#FFA500" 
        strokeWidth="2" 
      />
      <path 
        d="M16 6 L18 12 L24 12 L19 16 L21 22 L16 18 L11 22 L13 16 L8 12 L14 12 Z" 
        fill="#FFFF00" 
        opacity="0.8" 
      />
    </svg>
  ),
  [CoinType.Mushroom]: (
    <svg viewBox="0 0 32 32" className="animate-bounce">
      <ellipse cx="16" cy="24" rx="8" ry="4" fill="#8B4513" />
      <path 
        d="M8 20 Q8 8 16 8 Q24 8 24 20 Q24 24 20 24 L12 24 Q8 24 8 20 Z" 
        fill="#FF4444" 
      />
      <circle cx="12" cy="16" r="2" fill="#FFFFFF" />
      <circle cx="20" cy="16" r="2" fill="#FFFFFF" />
      <circle cx="16" cy="12" r="1.5" fill="#FFFFFF" />
      <rect x="14" y="20" width="4" height="6" fill="#F5DEB3" />
    </svg>
  ),
};

const coinValues = {
  [CoinType.Gold]: 10,
  [CoinType.Silver]: 5,
  [CoinType.Bronze]: 2,
  [CoinType.Star]: 50,
  [CoinType.Mushroom]: 25,
};

export const MarioCoin = ({ coinType, onClick }: { coinType: CoinType, onClick?: () => void }) => {
  const handleClick = () => {
    if (onClick) {
      // Play coin sound effect (if you want to add audio later)
      onClick();
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="relative cursor-pointer hover:scale-125 transition-transform duration-150"
      title={`${coinType} coin - ${coinValues[coinType]} points`}
    >
      <div className="w-8 h-8">
        {coinIcons[coinType] || coinIcons[CoinType.Gold]}
      </div>
    </div>
  );
};