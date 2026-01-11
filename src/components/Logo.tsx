import logoLight from '@/assets/logo-light.png';
import logoDark from '@/assets/logo-dark.png';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
}

export function Logo({ className = '', size = 'md', variant = 'light' }: LogoProps) {
  const sizes = {
    sm: 'h-10',
    md: 'h-14',
    lg: 'h-20',
  };

  const logo = variant === 'dark' ? logoDark : logoLight;

  return (
    <img 
      src={logo} 
      alt="AO Travels - Travel Right, Explore Bright" 
      className={`${sizes[size]} w-auto object-contain ${className}`}
    />
  );
}
