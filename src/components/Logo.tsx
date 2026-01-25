import logo from '@/assets/logo.png';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizes = {
    sm: 'h-12',
    md: 'h-16',
    lg: 'h-24',
  };

  return (
    <img 
      src={logo} 
      alt="AO Travels - Travel Right, Explore Bright" 
      className={`${sizes[size]} w-auto object-contain ${className}`}
    />
  );
}
