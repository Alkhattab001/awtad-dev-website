import { useState, useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { SlidersHorizontal, X } from 'lucide-react';
import type { Unit } from '@/types';

interface Props {
  units: Unit[];
  onFilter: (filtered: Unit[]) => void;
}

const UnitFilters = ({ units, onFilter }: Props) => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [bedrooms, setBedrooms] = useState<number | null>(null);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minArea, setMinArea] = useState('');
  const [maxArea, setMaxArea] = useState('');
  const [availability, setAvailability] = useState('all');

  const bedroomOptions = useMemo(() => {
    const set = new Set(units.map((u) => u.bedrooms));
    return Array.from(set).sort((a, b) => a - b);
  }, [units]);

  const applyFilters = () => {
    const filtered = units.filter((u) => {
      if (bedrooms !== null && u.bedrooms !== bedrooms) return false;
      if (minPrice && u.price_starting_from && u.price_starting_from < Number(minPrice)) return false;
      if (maxPrice && u.price_starting_from && u.price_starting_from > Number(maxPrice)) return false;
      if (minArea && u.area_sqm < Number(minArea)) return false;
      if (maxArea && u.area_sqm > Number(maxArea)) return false;
      if (availability !== 'all' && u.availability_status !== availability) return false;
      return true;
    });
    onFilter(filtered);
  };

  const clearFilters = () => {
    setBedrooms(null);
    setMinPrice('');
    setMaxPrice('');
    setMinArea('');
    setMaxArea('');
    setAvailability('all');
    onFilter(units);
  };

  const hasActiveFilters = bedrooms !== null || minPrice || maxPrice || minArea || maxArea || availability !== 'all';

  // auto-apply on change
  useMemo(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bedrooms, minPrice, maxPrice, minArea, maxArea, availability]);

  const inputClass =
    'w-full rounded-md border border-border bg-background px-3 py-2 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30';

  return (
    <div className="mb-10">
      {/* Toggle + Quick Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setOpen(!open)}
          className={`flex items-center gap-2 rounded-full border px-5 py-2.5 font-body text-xs font-semibold uppercase tracking-wider transition-all ${
            open || hasActiveFilters
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-border text-muted-foreground hover:border-primary/50'
          }`}
        >
          <SlidersHorizontal size={14} />
          {t('Filter Units', 'تصفية الوحدات')}
          {hasActiveFilters && (
            <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              !
            </span>
          )}
        </button>

        {/* Quick bedroom pills */}
        {bedroomOptions.map((b) => (
          <button
            key={b}
            onClick={() => setBedrooms(bedrooms === b ? null : b)}
            className={`rounded-full border px-4 py-2 font-body text-xs font-medium transition-all ${
              bedrooms === b
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border text-muted-foreground hover:border-primary/50'
            }`}
          >
            {b} {t('BR', 'غرف')}
          </button>
        ))}

        {/* Availability quick pills */}
        {['available', 'reserved'].map((s) => (
          <button
            key={s}
            onClick={() => setAvailability(availability === s ? 'all' : s)}
            className={`rounded-full border px-4 py-2 font-body text-xs font-medium transition-all ${
              availability === s
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border text-muted-foreground hover:border-primary/50'
            }`}
          >
            {s === 'available' ? t('Available', 'متاح') : t('Reserved', 'محجوز')}
          </button>
        ))}

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 rounded-full px-3 py-2 font-body text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <X size={12} /> {t('Clear', 'مسح')}
          </button>
        )}
      </div>

      {/* Expanded Filters Panel */}
      {open && (
        <div className="mt-4 rounded-lg border border-border bg-card p-6 shadow-sm animate-fade-in">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Price Range */}
            <div>
              <label className="mb-2 block font-body text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                {t('Price Range (OMR)', 'نطاق السعر (ر.ع.)')}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder={t('Min', 'الأدنى')}
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className={inputClass}
                />
                <span className="text-muted-foreground">–</span>
                <input
                  type="number"
                  placeholder={t('Max', 'الأقصى')}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Area Range */}
            <div>
              <label className="mb-2 block font-body text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                {t('Area Range (sqm)', 'نطاق المساحة (م²)')}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder={t('Min', 'الأدنى')}
                  value={minArea}
                  onChange={(e) => setMinArea(e.target.value)}
                  className={inputClass}
                />
                <span className="text-muted-foreground">–</span>
                <input
                  type="number"
                  placeholder={t('Max', 'الأقصى')}
                  value={maxArea}
                  onChange={(e) => setMaxArea(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="mb-2 block font-body text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                {t('Bedrooms', 'غرف النوم')}
              </label>
              <select
                value={bedrooms ?? ''}
                onChange={(e) => setBedrooms(e.target.value ? Number(e.target.value) : null)}
                className={inputClass}
              >
                <option value="">{t('Any', 'الكل')}</option>
                {bedroomOptions.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Availability */}
            <div>
              <label className="mb-2 block font-body text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                {t('Availability', 'الحالة')}
              </label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className={inputClass}
              >
                <option value="all">{t('All', 'الكل')}</option>
                <option value="available">{t('Available', 'متاح')}</option>
                <option value="reserved">{t('Reserved', 'محجوز')}</option>
                <option value="sold">{t('Sold', 'مباع')}</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnitFilters;
