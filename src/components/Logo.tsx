interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizes = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-14',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* AO Logo Mark */}
      <div className={`${sizes[size]} aspect-square relative`}>
        <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Background circle */}
          <circle cx="30" cy="30" r="28" stroke="currentColor" strokeWidth="2" className="text-primary" />
          
          {/* A letter */}
          <path
            d="M18 42L26 18H34L42 42"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary"
          />
          <path
            d="M21 35H39"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className="text-primary"
          />
          
          {/* Small O inside/overlapping */}
          <circle
            cx="38"
            cy="24"
            r="8"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="hsl(var(--background))"
            className="text-primary"
          />
        </svg>
      </div>
      
      {/* Text */}
      <div className="flex flex-col">
        <span className="font-display text-xl font-bold text-primary leading-none">
          AO Travels
        </span>
        <span className="text-[10px] tracking-widest text-muted-foreground uppercase">
          Travel Right • Explore Bright
        </span>
      </div>
    </div>
  );
}
