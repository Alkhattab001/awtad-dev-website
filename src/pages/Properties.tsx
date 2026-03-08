import { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import PropertyCard from '@/components/properties/PropertyCard';
import { getProperties } from '@/services/api';
import type { Property } from '@/types';
import { Search, SlidersHorizontal } from 'lucide-react';

const Properties = () => {
  const { t, language } = useLanguage();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    getProperties()
      .then(setProperties)
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      const name = language === 'en' ? p.name_en : p.name_ar;
      const loc = language === 'en' ? p.location_en : p.location_ar;
      const q = search.toLowerCase();
      const matchesSearch = !q || name.toLowerCase().includes(q) || loc.toLowerCase().includes(q);
      const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [properties, search, statusFilter, language]);

  const statuses = [
    { value: 'all', label: t('All', 'الكل') },
    { value: 'upcoming', label: t('Upcoming', 'قريباً') },
    { value: 'under_construction', label: t('Under Construction', 'قيد الإنشاء') },
    { value: 'ready', label: t('Ready', 'جاهز') },
  ];

  return (
    <>
      {/* Header */}
      <section className="bg-accent py-20">
        <div className="container-premium text-center">
          <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            {t('Our Portfolio', 'مشاريعنا')}
          </p>
          <h1 className="font-display text-4xl font-bold text-accent-foreground md:text-5xl">
            {t('Properties & Projects', 'العقارات والمشاريع')}
          </h1>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-border bg-background sticky top-20 z-30">
        <div className="container-premium flex items-center gap-4 py-4">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground rtl:left-auto rtl:right-3" />
            <input
              type="text"
              placeholder={t('Search properties...', 'ابحث عن مشروع...')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-md border border-border bg-background py-2.5 pl-10 pr-4 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 rtl:pr-10 rtl:pl-4"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 rounded-md border border-border px-4 py-2.5 font-body text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary md:hidden"
          >
            <SlidersHorizontal size={16} /> {t('Filters', 'تصفية')}
          </button>

          <div className="hidden gap-2 md:flex">
            {statuses.map((s) => (
              <button
                key={s.value}
                onClick={() => setStatusFilter(s.value)}
                className={`rounded-full border px-4 py-2 font-body text-xs font-medium transition-all ${
                  statusFilter === s.value
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground hover:border-primary/50'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {showFilters && (
          <div className="container-premium flex flex-wrap gap-2 pb-4 md:hidden">
            {statuses.map((s) => (
              <button
                key={s.value}
                onClick={() => { setStatusFilter(s.value); setShowFilters(false); }}
                className={`rounded-full border px-4 py-2 font-body text-xs font-medium transition-all ${
                  statusFilter === s.value
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Grid */}
      <section className="section-padding">
        <div className="container-premium">
          {loading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse rounded-lg bg-muted aspect-[4/5]" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-body text-lg text-muted-foreground">
                {t('No properties found matching your criteria.', 'لم يتم العثور على مشاريع مطابقة.')}
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Properties;
