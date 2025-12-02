import React, { useMemo } from 'react';
import { useBeijingTime } from '../hooks/useBeijingTime';

export const RolexWatch: React.FC = () => {
  const { hours, minutes, seconds, date, dayOfWeek } = useBeijingTime();

  // Rotations
  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6 + (seconds / 10);
  const hourDeg = (hours % 12) * 30 + (minutes / 2);

  // --- Helpers ---
  const renderTicks = () => {
    const ticks = [];
    for (let i = 0; i < 60; i++) {
      const isHour = i % 5 === 0;
      const angle = i * 6;
      // Skip date window area roughly
      if (i > 13 && i < 17) continue;

      ticks.push(
        <line
          key={i}
          x1="200"
          y1="58"
          x2="200"
          y2={isHour ? "65" : "62"}
          stroke="white"
          strokeWidth={isHour ? 1.5 : 0.5}
          strokeOpacity={isHour ? 0.9 : 0.6}
          transform={`rotate(${angle} 200 200)`}
        />
      );
    }
    return ticks;
  };

  const BezelMarkings = useMemo(() => {
    const elements = [];
    for (let i = 0; i < 60; i++) {
      if (i === 0) continue; // Triangle at 0
      
      const angle = i * 6;
      const isMain = i % 5 === 0;
      const isTen = i % 10 === 0 && i !== 0; // 10, 20, 30...

      // First 15 mins have distinct hash marks
      if (i <= 15) {
          elements.push(
            <line
              key={`line-${i}`}
              x1="200"
              y1="42"
              x2="200"
              y2={isMain ? "54" : "48"}
              stroke="#e0e0e0" // Platinum dust color
              strokeWidth={isMain ? 2 : 1}
              transform={`rotate(${angle} 200 200)`}
              opacity={0.9}
            />
          );
      } else if (isMain) {
          if (i === 20 || i === 30 || i === 40 || i === 50) {
             // Draw Number
             const r = 166; 
             const rad = (angle - 90) * (Math.PI / 180);
             const x = 200 + r * Math.cos(rad);
             const y = 200 + r * Math.sin(rad);
             
             elements.push(
               <text
                 key={`num-${i}`}
                 x={x}
                 y={y}
                 textAnchor="middle"
                 dominantBaseline="central"
                 fill="#e0e0e0"
                 transform={`rotate(${angle}, ${x}, ${y})`}
                 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "24px" }}
               >
                 {i}
               </text>
             );
          } else {
             // Draw Stick
             elements.push(
                <line
                  key={`stick-${i}`}
                  x1="200"
                  y1="42"
                  x2="200"
                  y2="54"
                  stroke="#e0e0e0"
                  strokeWidth={2}
                  transform={`rotate(${angle} 200 200)`}
                />
             );
          }
      }
    }
    return elements;
  }, []);

  return (
    <div className="relative w-[92vw] h-[92vw] max-w-[380px] max-h-[380px] md:max-w-[600px] md:max-h-[600px] md:w-[600px] md:h-[600px] filter drop-shadow-2xl select-none">
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* 1. BRUSHED STEEL TEXTURE (Vertical for Bracelet) */}
          <linearGradient id="brushedSteel" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#888" />
            <stop offset="10%" stopColor="#ccc" />
            <stop offset="25%" stopColor="#999" />
            <stop offset="40%" stopColor="#ddd" />
            <stop offset="50%" stopColor="#aaa" />
            <stop offset="60%" stopColor="#ddd" />
            <stop offset="75%" stopColor="#999" />
            <stop offset="90%" stopColor="#ccc" />
            <stop offset="100%" stopColor="#888" />
          </linearGradient>

          {/* 2. CASE LUGS TEXTURE (Satin finish) */}
          <linearGradient id="lugSteel" x1="0%" y1="0%" x2="0%" y2="100%">
             <stop offset="0%" stopColor="#b0b0b0" />
             <stop offset="50%" stopColor="#f0f0f0" />
             <stop offset="100%" stopColor="#909090" />
          </linearGradient>

          {/* 3. CERAMIC BEZEL (Deep Green Gloss) */}
          <linearGradient id="ceramicGreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#022e15" />
            <stop offset="40%" stopColor="#0b5e2f" />
            <stop offset="50%" stopColor="#128a45" /> {/* Highlight */}
            <stop offset="60%" stopColor="#0b5e2f" />
            <stop offset="100%" stopColor="#001a0b" />
          </linearGradient>
          
          {/* 4. BLACK DIAL (Deep Gloss) */}
          <radialGradient id="dialBlack" cx="50%" cy="50%" r="50%">
            <stop offset="80%" stopColor="#000" />
            <stop offset="100%" stopColor="#1a1a1a" />
          </radialGradient>

          {/* 5. GOLD/STEEL INDICES BORDER */}
          <linearGradient id="indicesMetal" x1="0%" y1="0%" x2="100%" y2="100%">
             <stop offset="0%" stopColor="#fff" />
             <stop offset="50%" stopColor="#999" />
             <stop offset="100%" stopColor="#fff" />
          </linearGradient>

           {/* 6. CYCLOPS REFLECTION */}
           <linearGradient id="cyclopsGlare" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="30%" stopColor="rgba(255,255,255,0.1)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.6)" />
              <stop offset="55%" stopColor="rgba(255,255,255,0.1)" />
           </linearGradient>

           <filter id="shadowDP" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.5"/>
           </filter>

            <filter id="innerShadow">
                <feOffset dx="0" dy="1" />
                <feGaussianBlur stdDeviation="1" result="offset-blur" />
                <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
                <feFlood floodColor="black" floodOpacity="1" result="color" />
                <feComposite operator="in" in="color" in2="inverse" result="shadow" />
                <feComposite operator="over" in="shadow" in2="SourceGraphic" />
            </filter>
            
            <clipPath id="clipTop">
                 <path d="M140,-120 L140,-60 L260,-60 L260,-120 Z" />
            </clipPath>
            <clipPath id="clipBottom">
                 <path d="M140,460 L140,520 L260,520 L260,460 Z" />
            </clipPath>
        </defs>

        {/* --- BRACELET (Top & Bottom) --- */}
        {/* Top Links */}
        <g clipPath="url(#clipTop)">
            <path d="M140,-120 L140,-60 L260,-60 L260,-120 Z" fill="url(#brushedSteel)" />
            {/* Center Link definition */}
            <path d="M175,-120 L175,-60 L225,-60 L225,-120 Z" fill="url(#brushedSteel)" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
        </g>
        {/* Bottom Links */}
        <g clipPath="url(#clipBottom)">
             <path d="M140,460 L140,520 L260,520 L260,460 Z" fill="url(#brushedSteel)" />
             <path d="M175,460 L175,520 L225,520 L225,460 Z" fill="url(#brushedSteel)" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
        </g>

        {/* --- CASE LUGS --- */}
        <path 
            d="M125,50 C125,-40 140,-90 176,-90 L224,-90 C260,-90 275,-40 275,50 L275,350 C275,440 260,490 224,490 L176,490 C140,490 125,440 125,350 Z"
            fill="url(#lugSteel)"
            stroke="#999" strokeWidth="1"
        />
        
        {/* Crown Guards */}
        <path d="M270,160 Q290,170 290,200 Q290,230 270,240" fill="#d1d1d1" stroke="#999" strokeWidth="1" />

        {/* Winding Crown */}
        <g transform="translate(285, 200)">
            <rect x="-5" y="-18" width="16" height="36" rx="2" fill="url(#brushedSteel)" stroke="#888" />
            <line x1="0" y1="-18" x2="0" y2="18" stroke="#666" strokeWidth="1" />
            <line x1="5" y1="-18" x2="5" y2="18" stroke="#666" strokeWidth="1" />
            <path d="M11,-12 L14,-12 L14,12 L11,12" fill="#ccc" />
        </g>

        {/* --- OUTER BEZEL (Knurled Steel Edge) --- */}
        <circle cx="200" cy="200" r="198" fill="#c0c0c0" />
        {/* Simulated teeth */}
        <circle cx="200" cy="200" r="195" fill="none" stroke="#888" strokeWidth="4" strokeDasharray="2 4" />

        {/* --- CERAMIC BEZEL INSERT --- */}
        <circle cx="200" cy="200" r="192" fill="url(#ceramicGreen)" />
        <circle cx="200" cy="200" r="152" fill="none" stroke="#ddd" strokeWidth="0.5" opacity="0.3" /> {/* Inner rim */}

        {/* Bezel Markings */}
        {BezelMarkings}

        {/* Pearl at 12 */}
        <g transform="translate(200, 32)">
            <circle r="8" fill="#d1d1d1" /> {/* Steel cup */}
            <circle r="5" fill="#e0fffb" stroke="#bbb" strokeWidth="0.5" /> {/* Lume */}
        </g>

        {/* --- DIAL AREA --- */}
        {/* Rehaut (Inner Slope) */}
        <circle cx="200" cy="200" r="150" fill="#e6e6e6" />
        <circle cx="200" cy="200" r="146" fill="#111" /> {/* Depth shadow */}
        
        {/* Main Dial Surface */}
        <circle cx="200" cy="200" r="145" fill="url(#dialBlack)" />
        
        {/* Minute Ticks */}
        {renderTicks()}

        {/* --- BRANDING --- */}
        <g transform="translate(200, 110)">
             {/* Crown Logo */}
            <path d="M0,-14 L-4,-6 L-8,-16 L-11,-3 L-13,-10 L-15,8 C-15,10 0,10 0,10 C0,10 15,10 15,8 L13,-10 L11,-3 L8,-16 L4,-6 L0,-14" fill="#e0e0e0" />
            <circle cx="0" cy="-16" r="1.5" fill="#e0e0e0" />
            <circle cx="-8" cy="-18" r="1.5" fill="#e0e0e0" />
            <circle cx="-15" cy="-12" r="1.5" fill="#e0e0e0" />
            <circle cx="8" cy="-18" r="1.5" fill="#e0e0e0" />
            <circle cx="15" cy="-12" r="1.5" fill="#e0e0e0" />
            
            <text y="18" textAnchor="middle" fill="#e0e0e0" style={{fontFamily: 'serif', fontSize: '15px', letterSpacing: '2px', fontWeight: 'bold'}}>ROLEX</text>
            <text y="30" textAnchor="middle" fill="#e0e0e0" style={{fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '1px'}}>OYSTER PERPETUAL DATE</text>
        </g>

        <g transform="translate(200, 260)">
             <text y="0" textAnchor="middle" fill="#e0e0e0" style={{fontFamily: 'sans-serif', fontSize: '11px', letterSpacing: '1px', fontWeight: 'bold'}}>SUBMARINER</text>
             <text y="14" textAnchor="middle" fill="#e0e0e0" style={{fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '1px'}}>1000<tspan fontStyle="italic">ft</tspan> = 300<tspan fontStyle="italic">m</tspan></text>
             <text y="28" textAnchor="middle" fill="#e0e0e0" style={{fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '1px'}}>SUPERLATIVE CHRONOMETER</text>
             <text y="38" textAnchor="middle" fill="#e0e0e0" style={{fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '1px'}}>OFFICIALLY CERTIFIED</text>
        </g>
        
        <text x="200" y="335" textAnchor="middle" fill="#e0e0e0" style={{fontFamily: 'sans-serif', fontSize: '6px', opacity: 0.8}}>SWISS MADE</text>

        {/* --- INDICES --- */}
        {/* 12 o'clock Triangle */}
        <path d="M200,68 L188,92 L212,92 Z" fill="#e0fffb" stroke="url(#indicesMetal)" strokeWidth="2" filter="url(#shadowDP)" />
        
        {/* Rectangles at 6, 9 */}
        <rect x="194" y="308" width="12" height="28" fill="#e0fffb" stroke="url(#indicesMetal)" strokeWidth="2" filter="url(#shadowDP)" /> {/* 6 */}
        <rect x="64" y="194" width="28" height="12" fill="#e0fffb" stroke="url(#indicesMetal)" strokeWidth="2" filter="url(#shadowDP)" /> {/* 9 */}

        {/* Circles */}
        {[1,2,4,5,7,8,10,11].map(h => {
             const angle = h * 30;
             const r = 122; 
             const rad = (angle - 90) * (Math.PI / 180);
             const x = 200 + r * Math.cos(rad);
             const y = 200 + r * Math.sin(rad);
             return <circle key={h} cx={x} cy={y} r="10" fill="#e0fffb" stroke="url(#indicesMetal)" strokeWidth="2" filter="url(#shadowDP)" />
        })}

        {/* --- DATE WINDOW (Functional) --- */}
        <g transform="translate(315, 200)">
            {/* Window Cutout */}
            <rect x="-24" y="-14" width="48" height="28" rx="1" fill="#f4f4f4" />
            
            {/* Calendar Functionality: Date & Day */}
            {/* Day of Week (Red text above, small) */}
            <text x="0" y="-5" textAnchor="middle" fill="#cc0000" style={{fontFamily: 'sans-serif', fontSize: '7px', fontWeight: 'bold', letterSpacing: '1px'}}>
                {dayOfWeek}
            </text>
            
            {/* Date Number (Black, serif) */}
            <text x="0" y="11" textAnchor="middle" fill="#000" style={{fontFamily: 'serif', fontSize: '18px', fontWeight: 'bold'}}>
                {date}
            </text>
        </g>

        {/* --- HANDS (With dimensional shading) --- */}
        <g filter="url(#shadowDP)">
            {/* Hour Hand (Mercedes) */}
            <g transform={`rotate(${hourDeg} 200 200)`}>
                {/* Stem */}
                <path d="M197,200 L197,140 L203,140 L203,200 Z" fill="#e8e8e8" />
                <path d="M197,200 L197,140 L200,140 L200,200 Z" fill="#ccc" /> {/* Shading */}
                
                {/* Circle symbol */}
                <circle cx="200" cy="132" r="9" fill="none" stroke="#e8e8e8" strokeWidth="2" />
                {/* Mercedes Logo inside */}
                <path d="M200,132 L200,123 M200,132 L193,137 M200,132 L207,137" stroke="#e8e8e8" strokeWidth="1.5" />
                
                {/* Lume Fill */}
                <path d="M200,132 L200,124 A8,8 0 0,0 192,137 Z" fill="#e0fffb" />
                <path d="M200,132 L192,138 A8,8 0 0,0 207,138 Z" fill="#e0fffb" />
                <path d="M200,132 L208,137 A8,8 0 0,0 201,124 Z" fill="#e0fffb" />
                
                {/* Tip */}
                <path d="M197,123 L200,112 L203,123" fill="#e8e8e8" />
            </g>

            {/* Minute Hand (Sword) */}
            <g transform={`rotate(${minuteDeg} 200 200)`}>
                 <path d="M197,200 L196,60 L200,50 L204,60 L203,200 Z" fill="#e8e8e8" />
                 <path d="M197,200 L196,60 L200,50 L200,200 Z" fill="#b0b0b0" /> {/* Half shading for 3D effect */}
                 <rect x="198" y="65" width="4" height="100" fill="#e0fffb" />
            </g>

            {/* Second Hand (Lollipop) */}
            <g transform={`rotate(${secondDeg} 200 200)`}>
                <line x1="200" y1="230" x2="200" y2="50" stroke="#ccc" strokeWidth="1.5" />
                <circle cx="200" cy="200" r="3.5" fill="#ccc" />
                {/* Lume Dot */}
                <circle cx="200" cy="80" r="4.5" fill="#e0fffb" stroke="#ccc" strokeWidth="1" />
            </g>
            
            {/* Center Pin Cap */}
            <circle cx="200" cy="200" r="2" fill="#fff" stroke="#999" strokeWidth="0.5" />
        </g>

        {/* --- CYCLOPS LENS (Magnifier) --- */}
        <g transform="translate(315, 200)">
           <rect x="-26" y="-16" width="52" height="32" rx="4" fill="url(#cyclopsGlare)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" style={{mixBlendMode: 'overlay'}} />
        </g>

        {/* Crystal Reflection (Flash) */}
        <path d="M100,60 L180,60 L140,340 L60,340 Z" fill="white" opacity="0.03" transform="rotate(-45 200 200)" pointerEvents="none" />

      </svg>
    </div>
  );
};