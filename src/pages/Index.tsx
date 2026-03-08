import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Users, Award, MapPin, Shield, TrendingUp, Gem, ChevronRight } from 'lucide-react';
import PropertyCard from '@/components/properties/PropertyCard';
import { mockProperties } from '@/services/api';
import heroImg from '@/assets/hero-main.jpg';
import property1 from '@/assets/property-1.jpg';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
};

const Index = () => {
  const { t } = useLanguage();

  const stats = [
    { value: '15+', label: t('Years of Excellence', 'عاماً من التميز') },
    { value: '3,200+', label: t('Units Delivered', 'وحدة تم تسليمها') },
    { value: '12', label: t('Active Projects', 'مشروع نشط') },
    { value: '98%', label: t('Client Satisfaction', 'رضا العملاء') },
  ];

  const values = [
    { icon: <Shield size={28} />, title: t('Trust & Integrity', 'الثقة والنزاهة'), desc: t('Built on transparency and a proven track record of delivering on every promise.', 'مبنية على الشفافية وسجل حافل بالوفاء بكل وعد.') },
    { icon: <Gem size={28} />, title: t('Premium Quality', 'جودة فاخرة'), desc: t('Every detail is crafted to the highest international standards of luxury.', 'كل تفصيلة مصنوعة وفق أعلى المعايير الدولية للفخامة.') },
    { icon: <TrendingUp size={28} />, title: t('Investment Value', 'قيمة استثمارية'), desc: t('Strategic locations and timeless designs that grow in value year after year.', 'مواقع استراتيجية وتصاميم خالدة تنمو قيمتها عاماً بعد عام.') },
    { icon: <Users size={28} />, title: t('Client Focused', 'تركيز على العميل'), desc: t('Personalized service from first inquiry to handover and beyond.', 'خدمة شخصية من أول استفسار حتى التسليم وما بعده.') },
  ];

  const articles = [
    { title: t('The Future of Luxury Living in Muscat', 'مستقبل الحياة الفاخرة في مسقط'), cat: t('Insights', 'رؤى'), date: 'Feb 2026', image: property1 },
    { title: t('Sustainable Design in Modern Architecture', 'التصميم المستدام في العمارة الحديثة'), cat: t('Architecture', 'عمارة'), date: 'Jan 2026', image: heroImg },
    { title: t('Why Oman is the Next Investment Hub', 'لماذا عُمان هي مركز الاستثمار القادم'), cat: t('Market', 'السوق'), date: 'Dec 2025', image: property1 },
  ];

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Premium development" className="h-full w-full object-cover" />
          <div className="bg-overlay-dark absolute inset-0" />
        </div>
        <div className="container-premium relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            <motion.p variants={fadeUp} custom={0} className="mb-4 font-body text-sm font-semibold uppercase tracking-[0.25em] text-gold-light">
              {t('Defining Luxury Living', 'نعيد تعريف الحياة الفاخرة')}
            </motion.p>
            <motion.h1 variants={fadeUp} custom={1} className="font-display text-4xl font-bold leading-tight text-cream md:text-6xl lg:text-7xl">
              {t('Building Landmarks of Tomorrow', 'نبني معالم الغد')}
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="mt-6 font-body text-lg leading-relaxed text-cream/80 md:text-xl">
              {t(
                'Premium developments that combine world-class design, strategic locations, and enduring value.',
                'مشاريع فاخرة تجمع بين التصميم العالمي والمواقع الاستراتيجية والقيمة الدائمة.'
              )}
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="mt-8 flex flex-wrap gap-4">
              <Link to="/properties" className="rounded-md bg-gradient-gold px-8 py-3.5 font-body text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
                {t('Explore Properties', 'استكشف المشاريع')}
              </Link>
              <Link to="/contact" className="rounded-md border border-cream/30 px-8 py-3.5 font-body text-sm font-semibold text-cream transition-colors hover:border-cream/60 hover:bg-cream/10">
                {t('Register Interest', 'سجل اهتمامك')}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── FEATURED PROJECTS ─── */}
      <section className="section-padding">
        <div className="container-premium">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                {t('Featured Projects', 'المشاريع المميزة')}
              </p>
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                {t('Our Latest Developments', 'أحدث مشاريعنا')}
              </h2>
            </div>
            <Link to="/properties" className="hidden items-center gap-2 font-body text-sm font-medium text-primary hover:text-gold-dark md:flex">
              {t('View All', 'عرض الكل')} <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {mockProperties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link to="/properties" className="inline-flex items-center gap-2 font-body text-sm font-medium text-primary">
              {t('View All Properties', 'عرض كل المشاريع')} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── COMPANY INTRO ─── */}
      <section className="section-padding bg-secondary">
        <div className="container-premium grid gap-12 md:grid-cols-2 items-center">
          <div>
            <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              {t('About Awtad', 'عن أوتاد')}
            </p>
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl mb-6">
              {t('A Legacy of Excellence in Development', 'إرث من التميز في التطوير')}
            </h2>
            <p className="font-body text-base leading-relaxed text-muted-foreground mb-4">
              {t(
                'For over 15 years, Awtad has been at the forefront of property development, creating spaces that inspire and endure. Our commitment to quality, innovation, and client satisfaction has established us as one of the most trusted names in the industry.',
                'منذ أكثر من 15 عامًا، تتصدر أوتاد مشهد التطوير العقاري، وتبتكر مساحات تلهم وتدوم. لقد رسّخ التزامنا بالجودة والابتكار ورضا العملاء اسمنا كأحد أكثر الأسماء الموثوقة في القطاع.'
              )}
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 font-body text-sm font-semibold text-primary hover:text-gold-dark transition-colors">
              {t('Learn More About Us', 'اعرف المزيد عنا')} <ChevronRight size={16} />
            </Link>
          </div>
          <div className="relative">
            <img src={property1} alt="About Awtad" className="rounded-lg object-cover w-full aspect-[4/3]" />
            <div className="absolute -bottom-6 -left-6 rounded-lg bg-accent p-6 shadow-xl rtl:-right-6 rtl:left-auto">
              <p className="font-display text-3xl font-bold text-gold">15+</p>
              <p className="font-body text-sm text-accent-foreground opacity-80">{t('Years of Excellence', 'عاماً من التميز')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="section-padding bg-accent">
        <div className="container-premium">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="font-display text-4xl font-bold text-gradient-gold md:text-5xl">{stat.value}</p>
                <p className="mt-2 font-body text-sm text-accent-foreground opacity-70">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ─── */}
      <section className="section-padding">
        <div className="container-premium">
          <div className="mb-12 text-center">
            <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              {t('Why Awtad', 'لماذا أوتاد')}
            </p>
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              {t('What Sets Us Apart', 'ما يميزنا')}
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-lg border border-border bg-card p-8 text-center transition-shadow hover:shadow-lg"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {v.icon}
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LATEST INSIGHTS ─── */}
      <section className="section-padding bg-secondary">
        <div className="container-premium">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                {t('Insights', 'رؤى')}
              </p>
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                {t('Latest Articles', 'آخر المقالات')}
              </h2>
            </div>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {articles.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-premium overflow-hidden group cursor-pointer"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={a.image} alt={a.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="rounded-full bg-primary/10 px-3 py-1 font-body text-xs font-semibold text-primary">{a.cat}</span>
                    <span className="font-body text-xs text-muted-foreground">{a.date}</span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground leading-snug">{a.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="relative py-24">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="h-full w-full object-cover" />
          <div className="bg-overlay-dark absolute inset-0" />
        </div>
        <div className="container-premium relative z-10 text-center">
          <h2 className="font-display text-3xl font-bold text-cream md:text-5xl mb-4">
            {t('Ready to Find Your Perfect Home?', 'هل أنت مستعد لإيجاد منزلك المثالي؟')}
          </h2>
          <p className="mx-auto max-w-xl font-body text-lg text-cream/70 mb-8">
            {t(
              'Contact our team today to explore available properties and secure your future.',
              'تواصل مع فريقنا اليوم لاستكشاف العقارات المتاحة وتأمين مستقبلك.'
            )}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="rounded-md bg-gradient-gold px-8 py-3.5 font-body text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
              {t('Contact Us', 'تواصل معنا')}
            </Link>
            <Link to="/properties" className="rounded-md border border-cream/30 px-8 py-3.5 font-body text-sm font-semibold text-cream transition-colors hover:border-cream/60 hover:bg-cream/10">
              {t('Browse Properties', 'تصفح المشاريع')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
