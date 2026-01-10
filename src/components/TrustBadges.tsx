import { Shield, Award, Headphones, Star } from 'lucide-react';

export function TrustBadges() {
  const badges = [
    { icon: Shield, text: 'Licensed & Insured' },
    { icon: Award, text: '10+ Years Experience' },
    { icon: Star, text: '500+ 5-Star Reviews' },
    { icon: Headphones, text: '24/7 Support' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
      {badges.map((badge) => (
        <div
          key={badge.text}
          className="trust-badge"
        >
          <badge.icon className="w-4 h-4 text-primary" />
          <span>{badge.text}</span>
        </div>
      ))}
    </div>
  );
}
