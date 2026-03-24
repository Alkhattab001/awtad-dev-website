import { useLanguage } from '@/context/LanguageContext';
import InterestForm from '@/components/shared/InterestForm';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { MapPin, Phone, Clock, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  const { t } = useLanguage();

  const contactInfo = [
    { icon: <MapPin size={20} />, title: t('Visit Us', 'زورونا'), detail: <a href="https://maps.app.goo.gl/fDGkevP6VkFa3WRN8" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">{t('18th November St, Muscat, Oman', 'شارع ١٨ نوفمبر، مسقط، عُمان')}</a> },
    { icon: <Phone size={20} />, title: t('Contact Us', 'تواصل معنا'), detail: (
      <span className="flex flex-col gap-1">
        <a href="tel:+96895599902" dir="ltr" className="hover:text-foreground transition-colors">+968 9559 9902</a>
        <a href="tel:+96895559902" dir="ltr" className="hover:text-foreground transition-colors">+968 9555 9902</a>
      </span>
    ) },
    { icon: <Instagram size={20} />, title: t('Follow Us', 'تابعونا'), detail: <a href="https://www.instagram.com/awtad.om9" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">@awtad.om9</a> },
    { icon: <Clock size={20} />, title: t('Office Hours', 'ساعات الدوام'), detail: t('Sun – Thu: 8AM – 6PM', 'الأحد – الخميس: 8ص – 6م') },
  ];

  return (
    <>
      {/* Header */}
      <section className="bg-accent py-20">
        <div className="container-premium text-center">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.2em] text-gold"
          >
            {t('Get in Touch', 'تواصل معنا')}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-display text-4xl font-bold text-accent-foreground md:text-5xl"
          >
            {t('Contact Us', 'اتصل بنا')}
          </motion.h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-premium grid gap-12 lg:grid-cols-5">
          {/* Contact Info */}
          <ScrollReveal direction="left" className="lg:col-span-2">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">
              {t("We'd Love to Hear from You", 'يسعدنا تواصلكم معنا')}
            </h2>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-8">
              {t(
                'Whether you have a question about our properties, need more information, or want to schedule an appointment, our team is here to help.',
                'سواء كان لديك سؤال عن مشاريعنا أو تحتاج معلومات إضافية أو ترغب في حجز موعد، فريقنا هنا لمساعدتك.'
              )}
            </p>
            <div className="space-y-6">
              {contactInfo.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-body text-sm font-semibold text-foreground">{item.title}</h3>
                    <p className="font-body text-sm text-muted-foreground">{item.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          {/* Form */}
          <ScrollReveal direction="right" delay={0.15} className="lg:col-span-3">
            <div className="rounded-lg border border-border bg-card p-8 shadow-sm">
              <h3 className="font-display text-xl font-semibold text-foreground mb-6">
                {t('Send Us a Message', 'أرسل لنا رسالة')}
              </h3>
              <InterestForm inquiryType="contact" />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default Contact;
