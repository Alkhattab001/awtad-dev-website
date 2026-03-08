import { useLanguage } from '@/context/LanguageContext';
import InterestForm from '@/components/shared/InterestForm';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  const { t } = useLanguage();

  const contactInfo = [
    { icon: <MapPin size={20} />, title: t('Visit Us', 'زورونا'), detail: t('Muscat, Oman', 'مسقط، عُمان') },
    { icon: <Phone size={20} />, title: t('Call Us', 'اتصل بنا'), detail: '+968 1234 5678' },
    { icon: <Mail size={20} />, title: t('Email Us', 'راسلنا'), detail: 'info@awtad.com' },
    { icon: <Clock size={20} />, title: t('Working Hours', 'ساعات العمل'), detail: t('Sun – Thu: 8AM – 5PM', 'الأحد – الخميس: 8ص – 5م') },
  ];

  return (
    <>
      {/* Header */}
      <section className="bg-accent py-20">
        <div className="container-premium text-center">
          <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            {t('Get in Touch', 'تواصل معنا')}
          </p>
          <h1 className="font-display text-4xl font-bold text-accent-foreground md:text-5xl">
            {t('Contact Us', 'اتصل بنا')}
          </h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-premium grid gap-12 lg:grid-cols-5">
          {/* Contact Info */}
          <div className="lg:col-span-2">
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
                <div key={i} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-body text-sm font-semibold text-foreground">{item.title}</h3>
                    <p className="font-body text-sm text-muted-foreground">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-lg border border-border bg-card p-8 shadow-sm">
              <h3 className="font-display text-xl font-semibold text-foreground mb-6">
                {t('Send Us a Message', 'أرسل لنا رسالة')}
              </h3>
              <InterestForm inquiryType="contact" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
