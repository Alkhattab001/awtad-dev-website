import { useLanguage } from '@/context/LanguageContext';
import { BedDouble, Bath, Maximize, Building2, Gem, Waves, Briefcase } from 'lucide-react';
import type { Unit } from '@/types';
import UnitImageGallery from './UnitImageGallery';

interface Props {
  unit: Unit;
  onInterest: (unit: Unit) => void;
  index: number;
}

const availColors: Record<string, string> = {
  available: 'bg-green-50 text-green-800 border-green-300',
  reserved: 'bg-amber-50 text-amber-800 border-amber-300',
  sold: 'bg-muted text-muted-foreground border-border',
};

const availLabels: Record<string, { en: string; ar: string }> = {
  available: { en: 'Available', ar: 'متاح' },
  reserved: { en: 'Reserved', ar: 'محجوز' },
  sold: { en: 'Sold', ar: 'مباع' },
};

const UnitStyleCard = ({ unit, onInterest, index }: Props) => {
  const { t, language } = useLanguage();
  const title = language === 'en' ? unit.title_en : unit.title_ar;
  const desc = language === 'en' ? unit.description_en : unit.description_ar;
  const avail = availLabels[unit.availability_status];
  const isEven = index % 2 === 1;

  const allSpecs = [
    { icon: <Maximize size={18} />, label: t('Area', 'المساحة'), value: `${unit.area_sqm} ${t('sqm', 'م²')}`, show: unit.area_sqm > 0 },
    { icon: <BedDouble size={18} />, label: t('Bedrooms', 'غرف النوم'), value: unit.bedrooms, show: unit.bedrooms > 0 },
    { icon: <Bath size={18} />, label: t('Bathrooms', 'الحمامات'), value: unit.bathrooms, show: unit.bathrooms > 0 },
    { icon: <Gem size={18} />, label: t('Balconies', 'الشرفات'), value: unit.balconies, show: unit.balconies > 0 },
    { icon: <Waves size={18} />, label: t('Living Rooms', 'الصالات'), value: unit.living_rooms, show: unit.living_rooms > 0 },
    { icon: <Briefcase size={18} />, label: t('Working Rooms', 'غرف العمل'), value: unit.working_rooms, show: unit.working_rooms > 0 },
    { icon: <Building2 size={18} />, label: t('Floors', 'الطوابق'), value: unit.floor, show: unit.floor && unit.floor !== '0' && unit.floor !== '1' },
  ];

  const specs = allSpecs.filter(spec => spec.show);

  
  return (
    <article className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className={`grid md:grid-cols-2 ${isEven ? 'md:direction-rtl' : ''}`}>
        {/* ── Image Panel ── */}
        <div className="group/img relative min-h-[340px] md:min-h-[520px] overflow-hidden">
          <UnitImageGallery
            images={unit.gallery_images?.length ? unit.gallery_images : [unit.brochure_image]}
            alt={title}
          />
        </div>

        {/* ── Information Panel ── */}
        <div className={`flex flex-col justify-between p-8 md:p-10 lg:p-12 ${isEven ? 'md:direction-ltr' : ''}`}>
          {/* Top: title + availability */}
          <div>
            {/* Availability badge */}
            <span
              className={`mb-5 inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 font-body text-xs font-bold uppercase tracking-wider ${availColors[unit.availability_status]}`}
            >
              <span className={`inline-block h-2 w-2 rounded-full ${
                unit.availability_status === 'available' ? 'bg-green-500' :
                unit.availability_status === 'reserved' ? 'bg-amber-500' : 'bg-muted-foreground'
              }`} />
              {t(avail.en, avail.ar)}
            </span>

            {/* Title */}
            <h3 className="font-display text-2xl font-bold text-foreground md:text-3xl leading-tight mb-3">
              {title}
            </h3>

            {/* Description */}
            <p className="font-body text-sm leading-relaxed text-muted-foreground mb-8 max-w-md">
              {desc}
            </p>

            {/* ── Specification Grid ── */}
            <div className="mb-6">
              <h4 className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">
                {t('Specifications', 'المواصفات')}
              </h4>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                {specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-primary">
                      {spec.icon}
                    </span>
                    <div className="min-w-0">
                      <p className="font-body text-[11px] uppercase tracking-wider text-muted-foreground">{spec.label}</p>
                      <p className="font-body text-sm font-semibold text-foreground">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            
            {/* ── Extra features ── */}
            {unit.extra_features.length > 0 && (
              <div className="mb-8">
                <h4 className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3">
                  {t('Additional Features', 'ميزات إضافية')}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {unit.extra_features.map((feat, i) => (
                    <span key={i} className="rounded-full border border-border bg-muted/50 px-3 py-1 font-body text-xs text-foreground">
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* ── Price ── */}
            {unit.price_starting_from && (
              <div className="mb-8 border-t border-border pt-6">
                <p className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  {t('Starting from', 'يبدأ من')}
                </p>
                <p className="font-display text-2xl font-bold text-foreground">
                  {unit.price_starting_from.toLocaleString()}{' '}
                  <span className="text-base font-normal text-muted-foreground">{t('OMR', 'ر.ع.')}</span>
                </p>
              </div>
            )}
          </div>

          {/* Bottom: CTA */}
          <button
            onClick={() => onInterest(unit)}
            disabled={unit.availability_status === 'sold'}
            className="w-full rounded-lg bg-gradient-gold px-6 py-4 font-body text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:opacity-90 hover:shadow-lg disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {t("I'm Interested in This Unit", 'أنا مهتم بهذه الوحدة')}
          </button>
        </div>
      </div>
    </article>
  );
};

export default UnitStyleCard;
