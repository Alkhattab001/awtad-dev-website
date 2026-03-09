import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { MapPin, ArrowRight } from 'lucide-react';
import type { Property } from '@/types';

interface Props {
  property: Property;
}

const statusColors: Record<string, string> = {
  upcoming: 'bg-primary/90 text-primary-foreground border border-primary shadow-lg',
  under_construction: 'bg-gold/90 text-gold-dark border border-gold shadow-lg',
  ready: 'bg-green-600 text-white border border-green-700 shadow-lg',
  sold_out: 'bg-muted/80 text-muted-foreground border border-muted shadow-lg',
};

const statusLabels: Record<string, { en: string; ar: string }> = {
  upcoming: { en: 'Upcoming', ar: 'قريباً' },
  under_construction: { en: 'Under Construction', ar: 'قيد الإنشاء' },
  ready: { en: 'Ready', ar: 'جاهز' },
  sold_out: { en: 'Sold Out', ar: 'نفذت' },
};

const PropertyCard = ({ property }: Props) => {
  const { t, language } = useLanguage();
  const name = language === 'en' ? property.name_en : property.name_ar;
  const desc = language === 'en' ? property.short_description_en : property.short_description_ar;
  const loc = language === 'en' ? property.location_en : property.location_ar;
  const status = statusLabels[property.status] || statusLabels.upcoming;

  return (
    <Link to={`/properties/${property.slug}`} className="group block">
      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-2">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={property.cover_image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <span className={`rounded-full px-3 py-1 font-body text-xs font-semibold ${statusColors[property.status]}`}>
              {t(status.en, status.ar)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-2 flex items-center gap-1.5 text-muted-foreground">
            <MapPin size={13} />
            <span className="font-body text-xs">{loc}</span>
          </div>
          <h3 className="font-display text-xl font-semibold text-foreground mb-2">{name}</h3>
          <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">{desc}</p>
          <div className="flex items-center justify-between">
            <span className="font-body text-xs text-muted-foreground">{property.availability_summary}</span>
            <span className="flex items-center gap-1 font-body text-sm font-medium text-primary transition-colors group-hover:text-gold-dark">
              {t('View Details', 'عرض التفاصيل')}
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
