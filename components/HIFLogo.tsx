'use client'

interface HIFLogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  showStudio?: boolean
  animated?: boolean
  color?: string
}

const sizeMap = {
  sm: { width: 60, height: 20 },
  md: { width: 80, height: 26 },
  lg: { width: 120, height: 40 },
  xl: { width: 160, height: 53 },
  '2xl': { width: 240, height: 80 },
  '3xl': { width: 320, height: 106 },
}

export function HIFLogo({ 
  className = '', 
  size = 'md',
  showStudio = false,
  animated = false,
  color = '#e0e0e0'
}: HIFLogoProps) {
  const dimensions = sizeMap[size]
  
  return (
    <div className={`inline-flex flex-col items-start ${className}`}>
      <svg
        viewBox="0 0 150 50"
        width={dimensions.width}
        height={dimensions.height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={animated ? 'animate-fadeIn' : ''}
      >
        {/* H - Left vertical stroke */}
        <rect x="5" y="5" width="9" height="35" fill={color} />
        {/* H - Right vertical stroke */}
        <rect x="33" y="5" width="9" height="35" fill={color} />
        {/* H - Horizontal crossbar */}
        <rect x="5" y="20" width="37" height="9" fill={color} />
        
        {/* I - Vertical stroke */}
        <rect x="55" y="5" width="9" height="35" fill={color} />
        
        {/* Extended horizontal line from I going left under H */}
        <rect x="0" y="42" width="64" height="5" fill={color} />
        
        {/* F - Left vertical stroke */}
        <rect x="75" y="5" width="9" height="35" fill={color} />
        {/* F - Top horizontal stroke */}
        <rect x="75" y="5" width="28" height="9" fill={color} />
        {/* F - Middle horizontal stroke */}
        <rect x="75" y="20" width="22" height="9" fill={color} />
      </svg>
      
      {showStudio && (
        <span 
          className="text-gray-400 tracking-[0.3em] uppercase mt-1"
          style={{ 
            fontSize: `${dimensions.height * 0.25}px`,
            marginLeft: '2px'
          }}
        >
          Production
        </span>
      )}
    </div>
  )
}

