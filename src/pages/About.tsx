import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Award, Users, Target, Eye } from 'lucide-react';
import ScrollReveal from '@/components/shared/ScrollReveal';
import aboutHero from '@/assets/about-hero.jpg';
import heroImg from '@/assets/hero-main.jpeg';
import saidProfile from '@/assets/said-profile.jpeg';
import { useRef } from 'react';

const About = () => {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const team = [
    { name: t('Said Al Maawali', 'سعيد المعولي'), role: t('Chief Executive Officer', 'الرئيس التنفيذي'), image: saidProfile },
  ];

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative h-[50vh] min-h-[350px] flex items-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
          <img src={aboutHero} alt="About" className="h-full w-full object-cover" />
          <div className="bg-overlay-dark absolute inset-0" />
        </motion.div>
        <div className="container-premium relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.2em] text-gold-light"
          >
            {t('About Awtad', 'عن أوتاد')}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-4xl font-bold text-cream md:text-5xl"
          >
            {t('Our Story', 'قصتنا')}
          </motion.h1>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="section-padding">
        <div className="container-premium grid gap-16 md:grid-cols-2">
          <ScrollReveal direction="left">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Target size={24} />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">{t('Our Mission', 'مهمتنا')}</h2>
            <p className="font-body text-base leading-relaxed text-muted-foreground">
              {t(
                'To create exceptional living and working environments that elevate lifestyles, inspire communities, and deliver enduring value through innovative design, sustainable practices, and unwavering commitment to quality.',
                'خلق بيئات معيشة وعمل استثنائية ترتقي بأساليب الحياة وتلهم المجتمعات وتقدم قيمة دائمة من خلال التصميم المبتكر والممارسات المستدامة والالتزام الراسخ بالجودة.'
              )}
            </p>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Eye size={24} />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">{t('Our Vision', 'رؤيتنا')}</h2>
            <p className="font-body text-base leading-relaxed text-muted-foreground">
              {t(
                'To be the most trusted and admired property developer in the region, known for landmark projects that set new benchmarks in design, sustainability, and resident satisfaction.',
                'أن نكون المطور العقاري الأكثر ثقة وإعجاباً في المنطقة، معروفين بمشاريع بارزة تضع معايير جديدة في التصميم والاستدامة ورضا السكان.'
              )}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Company Story */}
      <section className="section-padding bg-secondary">
        <div className="container-premium grid gap-12 items-center md:grid-cols-2">
          <ScrollReveal direction="left">
            <div className="overflow-hidden rounded-lg">
              <img src={heroImg} alt="Our journey" className="w-full aspect-[4/3] object-cover transition-transform duration-700 hover:scale-105" />
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              {t('Our Journey', 'مسيرتنا')}
            </p>
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">
              {t('5 Years of Shaping Skylines', '5 أعوام من تشكيل الأفق')}
            </h2>
            <p className="font-body text-base leading-relaxed text-muted-foreground mb-4">
              {t(
                'Founded in 2021, Awtad Development has grown from a visionary startup into one of the leading property developers in Oman. Our portfolio spans residential towers, luxury villas, and mixed-use developments across prime locations.',
                'تأسست أوتاد للتطوير في عام 2021، ونمت من شركة ناشئة ذات رؤية إلى واحدة من أبرز شركات التطوير العقاري في عُمان.'
              )}
            </p>
            <p className="font-body text-base leading-relaxed text-muted-foreground">
              {t(
                'Every project we undertake reflects our core values: quality without compromise, innovative design that respects local heritage, and a deep commitment to our clients\' aspirations.',
                'يعكس كل مشروع نتولاه قيمنا الأساسية: الجودة بلا تنازل، والتصميم المبتكر الذي يحترم التراث المحلي، والالتزام العميق بتطلعات عملائنا.'
              )}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Management Team */}
      <section className="section-padding">
        <div className="container-premium">
          <ScrollReveal className="mb-12 text-center">
            <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              {t('Leadership', 'القيادة')}
            </p>
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              {t('Management Team', 'فريق الإدارة')}
            </h2>
          </ScrollReveal>
          <div className="flex justify-center">
            {team.map((member, i) => (
              <ScrollReveal key={i} delay={i * 0.1} className="text-center">
                <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-primary/20 transition-transform duration-300 hover:scale-105">
                  <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">{member.name}</h3>
                <p className="font-body text-sm text-muted-foreground">{member.role}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-accent">
        <div className="container-premium text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-bold text-accent-foreground md:text-4xl mb-4">
              {t('Partner With Us', 'شاركنا')}
            </h2>
            <p className="mx-auto max-w-xl font-body text-base text-accent-foreground/70 mb-8">
              {t(
                'Whether you are looking for your dream home or a smart investment, we would love to hear from you.',
                'سواء كنت تبحث عن منزل أحلامك أو استثمار ذكي، يسعدنا التواصل معك.'
              )}
            </p>
            <Link to="/contact" className="inline-block rounded-md bg-gradient-gold px-8 py-3.5 font-body text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
              {t('Contact Us', 'تواصل معنا')}
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default About;
