import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { getPropertyBySlug, getUnitsByProperty } from '@/services/api';
import UnitStyleCard from '@/components/properties/UnitStyleCard';
import InterestForm from '@/components/shared/InterestForm';
import type { Property, Unit } from '@/types';
import { MapPin, Building2, Calendar, ArrowLeft, X, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PropertyDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, language } = useLanguage();
  const [property, setProperty] = useState<Property | null>(null);
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getPropertyBySlug(slug).then(async (p) => {
      if (p) {
        setProperty(p);
        const u = await getUnitsByProperty(p.id);
        setUnits(u);
      }
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="font-display text-2xl text-foreground">{t('Property not found', 'المشروع غير موجود')}</p>
        <Link to="/properties" className="font-body text-sm text-primary hover:underline">{t('Back to Properties', 'العودة إلى المشاريع')}</Link>
      </div>
    );
  }

  const name = language === 'en' ? property.name_en : property.name_ar;
  const desc = language === 'en' ? property.full_description_en : property.full_description_ar;
  const loc = language === 'en' ? property.location_en : property.location_ar;

  const handleUnitInterest = (unit: Unit) => {
    setSelectedUnit(unit);
    setShowForm(true);
  };

  const handleProjectInterest = () => {
    setSelectedUnit(null);
    setShowForm(true);
  };

  return (
    <>
      {/* Hero Gallery */}
      <section className="relative h-[60vh] min-h-[400px]">
        <img
          src={property.gallery_images[galleryIndex] || property.cover_image}
          alt={name}
          className="h-full w-full object-cover"
        />
        <div className="bg-overlay-dark absolute inset-0" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container-premium">
            <Link to="/properties" className="mb-4 inline-flex items-center gap-2 font-body text-sm text-cream/70 hover:text-cream transition-colors">
              <ArrowLeft size={16} className="rtl:rotate-180" /> {t('All Properties', 'كل المشاريع')}
            </Link>
            <h1 className="font-display text-4xl font-bold text-cream md:text-5xl">{name}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1.5 font-body text-sm text-cream/70">
                <MapPin size={14} /> {loc}
              </span>
              <span className="flex items-center gap-1.5 font-body text-sm text-cream/70">
                <Building2 size={14} /> {property.total_units} {t('units', 'وحدة')}
              </span>
            </div>
          </div>
        </div>
        {/* Gallery dots */}
        {property.gallery_images.length > 1 && (
          <div className="absolute bottom-4 right-8 flex gap-2 rtl:left-8 rtl:right-auto">
            {property.gallery_images.map((_, i) => (
              <button
                key={i}
                onClick={() => setGalleryIndex(i)}
                className={`h-2 w-8 rounded-full transition-colors ${i === galleryIndex ? 'bg-gold' : 'bg-cream/30'}`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Overview */}
      <section className="section-padding">
        <div className="container-premium grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">{t('Project Overview', 'نظرة عامة')}</h2>
            <p className="font-body text-base leading-relaxed text-muted-foreground">{desc}</p>

            {/* Amenities */}
            <h3 className="font-display text-xl font-semibold text-foreground mt-10 mb-4">{t('Amenities & Features', 'المرافق والمميزات')}</h3>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {[...property.amenities, ...property.features].map((item, i) => (
                <div key={i} className="flex items-center gap-2 rounded-md bg-muted/50 px-4 py-3 font-body text-sm text-foreground">
                  <CheckCircle2 size={14} className="shrink-0 text-primary" /> {item}
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar CTA */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 rounded-lg border border-border bg-card p-6 shadow-sm">
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{t('Interested in this project?', 'مهتم بهذا المشروع؟')}</h3>
              <p className="font-body text-sm text-muted-foreground mb-4">{property.availability_summary}</p>
              <button
                onClick={handleProjectInterest}
                className="w-full rounded-md bg-gradient-gold px-6 py-3 font-body text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                {t('Register Interest', 'سجل اهتمامك')}
              </button>
              <div className="mt-4 rounded-md bg-muted/50 p-4">
                <div className="flex items-center gap-2 font-body text-sm text-muted-foreground">
                  <Calendar size={14} />
                  <span>{t('Updated', 'آخر تحديث')}: {property.updated_at}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unit Styles */}
      {units.length > 0 && (
        <section className="section-padding bg-secondary">
          <div className="container-premium">
            <div className="mb-12">
              <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                {t('Unit Catalogue', 'كتالوج الوحدات')}
              </p>
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                {t('Available Unit Styles', 'أنماط الوحدات المتاحة')}
              </h2>
            </div>
            <div className="space-y-8">
              {units.map((unit) => (
                <UnitStyleCard key={unit.id} unit={unit} onInterest={handleUnitInterest} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Interest Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4 backdrop-blur-sm"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-lg border border-border bg-background p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {selectedUnit ? t("I'm Interested", 'أنا مهتم') : t('Register Interest', 'سجل اهتمامك')}
                </h3>
                <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
                  <X size={20} />
                </button>
              </div>
              <InterestForm
                inquiryType={selectedUnit ? 'unit' : 'project'}
                propertyId={property.id}
                unitId={selectedUnit?.id}
                propertyName={name}
                unitName={selectedUnit ? (language === 'en' ? selectedUnit.title_en : selectedUnit.title_ar) : undefined}
                onClose={() => setShowForm(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PropertyDetails;
