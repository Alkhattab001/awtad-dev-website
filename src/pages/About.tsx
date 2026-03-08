import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, Users, Target, Eye } from 'lucide-react';
import aboutHero from '@/assets/about-hero.jpg';
import heroImg from '@/assets/hero-main.jpg';

const About = () => {
  const { t } = useLanguage();

  const team = [
    { name: t('Ahmed Al-Said', 'أحمد السعيد'), role: t('Chairman & Founder', 'رئيس مجلس الإدارة والمؤسس') },
    { name: t('Fatima Al-Rashdi', 'فاطمة الراشدي'), role: t('Chief Executive Officer', 'الرئيس التنفيذي') },
    { name: t('Khalid Al-Habsi', 'خالد الحبسي'), role: t('Head of Development', 'رئيس قسم التطوير') },
    { name: t('Sara Al-Balushi', 'سارة البلوشي'), role: t('Chief Financial Officer', 'المدير المالي') },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center">
        <div className="absolute inset-0">
          <img src={aboutHero} alt="About" className="h-full w-full object-cover" />
          <div className="bg-overlay-dark absolute inset-0" />
        </div>
        <div className="container-premium relative z-10 text-center">
          <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.2em] text-gold-light">
            {t('About Awtad', 'عن أوتاد')}
          </p>
          <h1 className="font-display text-4xl font-bold text-cream md:text-5xl">
            {t('Our Story', 'قصتنا')}
          </h1>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="section-padding">
        <div className="container-premium grid gap-16 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
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
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
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
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section className="section-padding bg-secondary">
        <div className="container-premium grid gap-12 items-center md:grid-cols-2">
          <img src={heroImg} alt="Our journey" className="rounded-lg object-cover w-full aspect-[4/3]" />
          <div>
            <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              {t('Our Journey', 'مسيرتنا')}
            </p>
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">
              {t('15 Years of Shaping Skylines', '15 عامًا من تشكيل الأفق')}
            </h2>
            <p className="font-body text-base leading-relaxed text-muted-foreground mb-4">
              {t(
                'Founded in 2011, Awtad Development has grown from a visionary startup into one of the leading property developers in Oman. Our portfolio spans residential towers, luxury villas, and mixed-use developments across prime locations.',
                'تأسست أوتاد للتطوير في عام 2011، ونمت من شركة ناشئة ذات رؤية إلى واحدة من أبرز شركات التطوير العقاري في عُمان.'
              )}
            </p>
            <p className="font-body text-base leading-relaxed text-muted-foreground">
              {t(
                'Every project we undertake reflects our core values: quality without compromise, innovative design that respects local heritage, and a deep commitment to our clients\' aspirations.',
                'يعكس كل مشروع نتولاه قيمنا الأساسية: الجودة بلا تنازل، والتصميم المبتكر الذي يحترم التراث المحلي، والالتزام العميق بتطلعات عملائنا.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Management Team */}
      <section className="section-padding">
        <div className="container-premium">
          <div className="mb-12 text-center">
            <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              {t('Leadership', 'القيادة')}
            </p>
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              {t('Management Team', 'فريق الإدارة')}
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                  <Users size={32} className="text-muted-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">{member.name}</h3>
                <p className="font-body text-sm text-muted-foreground">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-accent">
        <div className="container-premium text-center">
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
        </div>
      </section>
    </>
  );
};

export default About;
