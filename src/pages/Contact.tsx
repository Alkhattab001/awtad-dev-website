import { useLanguage } from '@/context/LanguageContext';
import InterestForm from '@/components/shared/InterestForm';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { MapPin, Phone, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  const { t } = useLanguage();

  const contactInfo = [
    { icon: <MapPin size={20} />, title: t('Visit Us', 'زورونا'), detail: t('Muscat, Oman', 'مسقط، عُمان') },
    { icon: <Phone size={20} />, title: t('Call Us', 'اتصل بنا'), detail: <span dir="ltr">+968 9559 9902</span> },
        { icon: <Clock size={20} />, title: t('Working Hours', 'ساعات العمل'), detail: t('Sun – Thu: 8AM – 5PM', 'الأحد – الخميس: 8ص – 5م') },
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
                'Whether you have a question about our properties, need more information, or want to schedule a viewing, our team is here to help.',
                'سواء كان لديك سؤال عن مشاريعنا أو تحتاج معلومات إضافية أو ترغب في حجز زيارة، فريقنا هنا لمساعدتك.'
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
