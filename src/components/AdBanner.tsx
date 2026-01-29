import { ExternalLink } from 'lucide-react';
import adGoldNews from '@/assets/ad-gold-news.jpg';
import adMining from '@/assets/ad-mining.jpg';
import adChronicle from '@/assets/ad-chronicle.jpg';
import adListings from '@/assets/ad-listings.jpg';
import adConsulting from '@/assets/ad-consulting.jpg';

interface AdBannerProps {
  variant: 'fires' | 'consulting' | 'boats' | 'chronicle' | 'gold' | 'mining' | 'listings';
  href: string;
}

const adContent = {
  fires: {
    title: 'Alaska Fires',
    subtitle: 'Real-time fire monitoring & safety resources',
    cta: 'Stay Informed',
    icon: '🔥',
    image: null,
    theme: 'from-orange-900/90 via-red-900/80 to-orange-950/90',
  },
  consulting: {
    title: 'Alaska Consulting Group',
    subtitle: 'Expert business solutions for the Last Frontier',
    cta: 'Learn More',
    icon: null,
    image: adConsulting,
    theme: 'from-neutral-900/95 via-zinc-800/90 to-neutral-900/95',
  },
  boats: {
    title: 'Alaskan Boats',
    subtitle: 'Your source for quality marine vessels',
    cta: 'Browse Listings',
    icon: '⛵',
    image: null,
    theme: 'from-sky-900/90 via-blue-900/85 to-slate-900/90',
  },
  chronicle: {
    title: 'The Anchorage Chronicle',
    subtitle: '"In a world of national headlines and distant concerns, we chose to focus on what matters most: the stories of our neighbors, our communities, and our home"',
    cta: 'Read Now',
    icon: null,
    image: adChronicle,
    theme: 'from-stone-900/90 via-neutral-800/85 to-stone-900/90',
  },
  gold: {
    title: 'Alaska Gold News',
    subtitle: 'Premium coverage of Alaska\'s mining industry',
    cta: 'Explore',
    icon: null,
    image: adGoldNews,
    theme: 'from-slate-900/95 via-zinc-900/90 to-slate-950/95',
  },
  mining: {
    title: 'Alaska Mining Equipment',
    subtitle: 'Industrial equipment for extreme conditions',
    cta: 'View Catalog',
    icon: null,
    image: adMining,
    theme: 'from-zinc-900/95 via-neutral-800/90 to-zinc-900/95',
  },
  listings: {
    title: 'Alaska Listings',
    subtitle: 'FREE 60-day listings during beta!',
    cta: 'List Now',
    icon: null,
    image: adListings,
    theme: 'from-slate-900/95 via-zinc-800/90 to-slate-900/95',
  },
};

const AdBanner = ({ variant, href }: AdBannerProps) => {
  const content = adContent[variant];

  // For ads with background images
  if (content.image) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block w-full h-20 sm:h-24 overflow-hidden group"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={content.image}
            alt={content.title}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${content.theme}`} />
        </div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-between px-4 sm:px-8 container-news">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="flex-1 min-w-0">
              <h3 className="font-headline font-bold text-sm sm:text-base text-white truncate">
                {content.title}
              </h3>
              <p className="hidden sm:block text-xs text-white/70 max-w-lg line-clamp-2">
                {content.subtitle}
              </p>
            </div>
          </div>
          <span className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-white/90 group-hover:text-white transition-colors shrink-0 ml-4">
            {content.cta}
            <ExternalLink className="h-3.5 w-3.5" />
          </span>
        </div>
      </a>
    );
  }

  // For simple ads without background images (fires, boats)
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative block w-full h-14 sm:h-16 overflow-hidden group bg-gradient-to-r ${content.theme}`}
    >
      <div className="relative z-10 h-full flex items-center justify-between px-4 sm:px-8 container-news">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {content.icon && <span className="text-xl">{content.icon}</span>}
          <div className="flex-1 min-w-0">
            <h3 className="font-headline font-bold text-sm text-white truncate">
              {content.title}
            </h3>
            <p className="hidden sm:block text-xs text-white/70 truncate">
              {content.subtitle}
            </p>
          </div>
        </div>
        <span className="flex items-center gap-1.5 text-xs font-medium text-white/90 group-hover:text-white transition-colors shrink-0 ml-4">
          {content.cta}
          <ExternalLink className="h-3.5 w-3.5" />
        </span>
      </div>
    </a>
  );
};

export default AdBanner;
