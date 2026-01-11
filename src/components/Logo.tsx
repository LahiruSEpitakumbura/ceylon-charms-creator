import logo from '@/assets/logo.png';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizes = {
    sm: 'h-10',
    md: 'h-14',
    lg: 'h-20',
  };

  return (
    <img 
      src={logo} 
      alt="AO Travels - Travel Right, Explore Bright" 
      className={`${sizes[size]} w-auto object-contain ${className}`}
    />
  );
}
