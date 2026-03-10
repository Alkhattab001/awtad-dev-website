import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Building2, Users, Award, MapPin, Shield, TrendingUp, Gem, ChevronRight, Phone } from 'lucide-react';
import PropertyCard from '@/components/properties/PropertyCard';
import ScrollReveal from '@/components/shared/ScrollReveal';
import AnimatedCounter from '@/components/shared/AnimatedCounter';
import { getProperties } from '@/services/api';
import heroImg from '@/assets/hero-main.jpeg';
import property1 from '@/assets/property-1.jpg';
import property2 from '@/assets/property-2.jpg';
import property3 from '@/assets/property-3.jpg';
import aboutImg from '@/assets/about-awtad.jpeg';
import ctaBg from '@/assets/cta-bg.jpeg';
import type { Easing } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import type { Property } from '@/types';

const easeOut: Easing = [0, 0, 0.2, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: easeOut },
  }),
};

const Index = () => {
  const { t, language } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProperties().then((data) => {
      setProperties(data);
      setLoading(false);
    });
  }, []);

  const stats = [
    { value: '5', label: t('Years of Excellence', 'عاماً من التميز'), suffix: '+' },
    { value: '1,000', label: t('Units Delivered', 'وحدة تم تسليمها'), suffix: '+' },
    { value: '4', label: t('Active Projects', 'مشروع نشط'), suffix: '' },
    { value: '98', label: t('Client Satisfaction', 'رضا العملاء'), suffix: '%' },
  ];

  const values = [
    { icon: <Shield size={24} />, title: t('Trust & Integrity', 'الثقة والنزاهة'), desc: t('Built on transparency and a proven track record of delivering on every promise.', 'مبنية على الشفافية وسجل حافل بالوفاء بكل وعد.') },
    { icon: <Gem size={24} />, title: t('Premium Quality', 'جودة فاخرة'), desc: t('Every detail is crafted to the highest international standards of luxury.', 'كل تفصيلة مصنوعة وفق أعلى المعايير الدولية للفخامة.') },
    { icon: <TrendingUp size={24} />, title: t('Investment Value', 'قيمة استثمارية'), desc: t('Strategic locations and timeless designs that grow in value year after year.', 'مواقع استراتيجية وتصاميم خالدة تنمو قيمتها عاماً بعد عام.') },
    { icon: <Users size={24} />, title: t('Client Focused', 'تركيز على العميل'), desc: t('Personalized service from first inquiry to handover and beyond.', 'خدمة شخصية من أول استفسار حتى التسليم وما بعده.') },
  ];

  const articles = [
    { title: t('Oman Real Estate Market Analysis 2026', 'تحليل سوق العقارات العماني 2026'), cat: t('Market', 'السوق'), date: t('2026', '2026'), image: property1, excerpt: t('Comprehensive analysis of Oman\'s property market performance, trends, and investment opportunities.', 'تحليل شامل لأداء سوق العقارات العماني واتجاهاته وفرص الاستثمار.'), link: 'https://sandsofwealth.com/blogs/news/oman-real-estate-market' },
    { title: t('Best Areas to Buy Property in Muscat', 'أفضل مناطق شراء العقارات في مسقط'), cat: t('Insights', 'رؤى'), date: t('2026', '2026'), image: property2, excerpt: t('Discover the top neighborhoods and areas for property investment in Muscat, from Al Mouj to Sultan Haitham City.', 'اكتشف أفضل الأحياء والمناطق للاستثمار العقاري في مسقط.'), link: 'https://sandsofwealth.com/blogs/news/muscat-which-area' },
    { title: t('Property Market Outlook Oman 2026', 'توقعات سوق العقارات في عُمان 2026'), cat: t('Analysis', 'تحليل'), date: t('2026', '2026'), image: property3, excerpt: t('Expert insights on Oman\'s property market outlook, price trends, and what to expect in the coming year.', 'رؤى الخبراء حول توقعات سوق العقارات العماني واتجاهات الأسعار.'), link: 'https://sandsofwealth.com/blogs/news/market-outlook-oman' },
  ];

  return (
    <>
      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
          <img src={heroImg} alt="Premium development" className="h-full w-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />
        <div className="absolute inset-0 bg-charcoal/20" />
        <motion.div className="container-premium relative z-10" style={{ opacity: heroOpacity }}>
          <motion.div initial="hidden" animate="visible" className="max-w-5xl text-center mx-auto">
            <motion.div variants={fadeUp} custom={0} className="mb-8 h-px w-16 bg-gradient-gold mx-auto" />
            <motion.p variants={fadeUp} custom={0} className="mb-5 font-body text-sm font-semibold uppercase tracking-[0.25em] text-gold-light">
              {t('Defining Luxury Living in Oman', 'حيث تبدأ الفخامة')}
            </motion.p>
            <motion.h1 variants={fadeUp} custom={1} className="font-display text-5xl font-bold leading-[1.1] text-cream md:text-7xl lg:text-8xl">
              {language === 'ar' ? (
                <>نبني <span className="text-gradient-gold">معالم</span> الغد</>
              ) : (
                <>Building<br /><span className="text-gradient-gold">Landmarks</span><br />of Tomorrow</>
              )}
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="mt-7 max-w-2xl mx-auto font-body text-lg leading-relaxed text-cream/70 md:text-xl">
              {t(
                'Premium developments combining world-class design, strategic locations, and enduring value across the Sultanate of Oman.',
                'مشاريع فاخرة تجمع بين التصميم العالمي والمواقع الاستراتيجية والقيمة الدائمة في سلطنة عُمان.'
              )}
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="mt-10 flex flex-wrap gap-4 justify-center">
              <Link to="/properties" className="group inline-flex items-center gap-3 rounded-sm bg-gradient-gold px-8 py-4 font-body text-sm font-semibold tracking-wide text-primary-foreground transition-all hover:shadow-lg hover:shadow-gold/20">
                {t('Explore Our Projects', 'استكشف مشاريعنا')}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-3 rounded-sm border border-cream/25 px-8 py-4 font-body text-sm font-semibold tracking-wide text-cream transition-all hover:border-cream/50 hover:bg-cream/5">
                <Phone size={14} />
                {t('Register Interest', 'سجل اهتمامك')}
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        >
          <div className="h-10 w-[1px] bg-gradient-to-b from-cream/50 to-transparent" />
        </motion.div>
      </section>

      {/* ─── FEATURED PROJECTS ─── */}
      <section className="section-padding bg-background">
        <div className="container-premium">
          <ScrollReveal className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-4 h-px w-12 bg-gradient-gold" />
              <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                {t('Featured Projects', 'المشاريع المميزة')}
              </p>
              <h2 className="font-display text-3xl font-bold text-foreground md:text-5xl">
                {t('Our Latest', 'أحدث')}<br className="hidden md:block" />{t(' Developments', ' مشاريعنا')}
              </h2>
            </div>
            <Link to="/properties" className="group hidden items-center gap-2 font-body text-sm font-medium text-primary hover:text-gold-dark md:flex">
              {t('View All Projects', 'عرض كل المشاريع')}
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </Link>
          </ScrollReveal>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <p className="text-muted-foreground">{t('Loading...', 'جاري التحميل...')}</p>
            ) : (
              properties.slice(0, 3).map((p, i) => (
                <ScrollReveal key={p.id} delay={i * 0.1}>
                  <PropertyCard property={p} />
                </ScrollReveal>
              ))
            )}
          </div>
          <div className="mt-10 text-center md:hidden">
            <Link to="/properties" className="inline-flex items-center gap-2 rounded-sm bg-gradient-gold px-7 py-3.5 font-body text-sm font-semibold text-primary-foreground">
              {t('View All Projects', 'عرض كل المشاريع')} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── STATS BANNER ─── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-accent" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        <div className="container-premium relative py-20 md:py-24">
          <div className="grid grid-cols-2 gap-y-12 gap-x-8 md:grid-cols-4">
            {stats.map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.12} className="text-center">
                <p className="font-display text-5xl font-bold text-gradient-gold md:text-6xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} suffixClassName="text-gold-light" />
                </p>
                <div className="mx-auto mt-3 mb-3 h-px w-8 bg-gold/30" />
                <p className="font-body text-sm text-accent-foreground/70 tracking-wide">{stat.label}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMPANY INTRO ─── */}
      <section className="section-padding bg-background">
        <div className="container-premium grid gap-16 md:grid-cols-2 items-center">
          <ScrollReveal direction="left">
            <div className="mb-4 h-px w-12 bg-gradient-gold" />
            <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              {t('About Awtad', 'عن أوتاد')}
            </p>
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl lg:text-5xl mb-8 leading-tight">
              {t('A Legacy of Excellence in Property Development', 'إرث من التميز في التطوير العقاري')}
            </h2>
            <p className="font-body text-base leading-[1.8] text-muted-foreground mb-5">
              {t(
                'For over 5 years, Awtad has been at the forefront of property development in the Sultanate of Oman, creating spaces that inspire and endure. Our commitment to quality, innovation, and client satisfaction has established us as one of the most trusted names in the industry.',
                'منذ أكثر من 5 أعوام، تتصدر أوتاد مشهد التطوير العقاري في سلطنة عُمان، وتبتكر مساحات تلهم وتدوم. لقد رسّخ التزامنا بالجودة والابتكار ورضا العملاء اسمنا كأحد أكثر الأسماء الموثوقة في القطاع.'
              )}
            </p>
            <p className="font-body text-base leading-[1.8] text-muted-foreground mb-8">
              {t(
                'Every project we undertake reflects our deep understanding of the Omani market and our dedication to creating communities that stand the test of time.',
                'كل مشروع نتولاه يعكس فهمنا العميق للسوق العُماني وتفانينا في إنشاء مجتمعات تصمد أمام اختبار الزمن.'
              )}
            </p>
            <Link to="/about" className="group inline-flex items-center gap-3 font-body text-sm font-semibold text-primary hover:text-gold-dark transition-colors">
              {t('Discover Our Story', 'اكتشف قصتنا')}
              <ChevronRight size={16} className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </Link>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.2} className="relative">
            <div className="relative overflow-hidden rounded-sm">
              <img src={aboutImg} alt="About Awtad" className="w-full aspect-[4/5] object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/80 to-transparent p-8 pt-20">
                <div className="flex items-end gap-6">
                  <div>
                    <p className="font-display text-4xl font-bold text-gradient-gold">5+</p>
                    <p className="font-body text-sm text-cream/80 mt-1">{t('Years of Excellence', 'عاماً من التميز')}</p>
                  </div>
                  <div className="h-12 w-px bg-cream/20" />
                  <div>
                    <p className="font-display text-4xl font-bold text-gradient-gold">1,000+</p>
                    <p className="font-body text-sm text-cream/80 mt-1">{t('Units Delivered', 'وحدة تم تسليمها')}</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ─── */}
      <section className="section-padding bg-secondary">
        <div className="container-premium">
          <ScrollReveal className="mb-14 max-w-2xl">
            <div className="mb-4 h-px w-12 bg-gradient-gold" />
            <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              {t('Why Awtad', 'لماذا أوتاد')}
            </p>
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              {t('Built on Values That Endure', 'مبنية على قيم دائمة')}
            </h2>
          </ScrollReveal>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="group rounded-sm border border-border bg-card p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:-translate-y-1">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-sm bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    {v.icon}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">{v.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LATEST INSIGHTS ─── */}
      <section className="section-padding bg-background">
        <div className="container-premium">
          <ScrollReveal className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-4 h-px w-12 bg-gradient-gold" />
              <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                {t('Insights & News', 'أخبار ورؤى')}
              </p>
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                {t('Latest Articles', 'آخر المقالات')}
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid gap-8 md:grid-cols-3">
            {articles.map((a, i) => (
              <ScrollReveal key={i} delay={i * 0.12}>
                <a href={a.link} target="_blank" rel="noopener noreferrer" className="group block">
                  <article>
                    <div className="relative aspect-[16/10] overflow-hidden rounded-sm mb-5">
                      <img src={a.image} alt={a.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-charcoal/0 transition-colors group-hover:bg-charcoal/10" />
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-body text-xs font-semibold uppercase tracking-wider text-primary">{a.cat}</span>
                      <span className="h-1 w-1 rounded-full bg-border" />
                      <span className="font-body text-xs text-muted-foreground">{a.date}</span>
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground leading-snug mb-2 group-hover:text-primary transition-colors">{a.title}</h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-2">{a.excerpt}</p>
                  </article>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={ctaBg} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-charcoal/75" />
        </div>
        <div className="container-premium relative z-10 text-center">
          <ScrollReveal>
            <div className="mx-auto mb-6 h-px w-16 bg-gradient-gold" />
            <h2 className="font-display text-4xl font-bold text-cream md:text-6xl mb-6 leading-tight">
              {t('Your Future Home', 'منزلك المستقبلي')}<br />
              <span className="text-gradient-gold">{t('Awaits', 'بانتظارك')}</span>
            </h2>
            <p className="mx-auto max-w-lg font-body text-base text-cream/60 mb-10 leading-relaxed">
              {t(
                'Contact our team today to explore available properties and take the first step towards exceptional living.',
                'تواصل مع فريقنا اليوم لاستكشاف العقارات المتاحة واتخذ الخطوة الأولى نحو حياة استثنائية.'
              )}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="group inline-flex items-center gap-3 rounded-sm bg-gradient-gold px-10 py-4 font-body text-sm font-semibold tracking-wide text-primary-foreground transition-all hover:shadow-lg hover:shadow-gold/20">
                {t('Register Your Interest', 'سجل اهتمامك')}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </Link>
              <Link to="/properties" className="inline-flex items-center gap-2 rounded-sm border border-cream/20 px-10 py-4 font-body text-sm font-semibold tracking-wide text-cream transition-all hover:border-cream/40 hover:bg-cream/5">
                {t('Browse Projects', 'تصفح المشاريع')}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default Index;
