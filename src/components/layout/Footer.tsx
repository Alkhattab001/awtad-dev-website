import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-accent text-accent-foreground">
      <div className="container-premium py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-display text-2xl font-bold text-gradient-gold mb-4">AWTAD</h3>
            <p className="font-body text-sm leading-relaxed opacity-80">
              {t(
                'Building landmarks that define the future of luxury living.',
                'نبني معالم تحدد مستقبل الحياة الفاخرة.'
              )}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-widest mb-4 opacity-60">
              {t('Quick Links', 'روابط سريعة')}
            </h4>
            <ul className="space-y-3 font-body text-sm">
              <li><Link to="/" className="opacity-80 transition-opacity hover:opacity-100">{t('Home', 'الرئيسية')}</Link></li>
              <li><Link to="/properties" className="opacity-80 transition-opacity hover:opacity-100">{t('Properties', 'المشاريع')}</Link></li>
              <li><Link to="/about" className="opacity-80 transition-opacity hover:opacity-100">{t('About Us', 'من نحن')}</Link></li>
              <li><Link to="/contact" className="opacity-80 transition-opacity hover:opacity-100">{t('Contact', 'تواصل معنا')}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-widest mb-4 opacity-60">
              {t('Contact Us', 'تواصل معنا')}
            </h4>
            <ul className="space-y-3 font-body text-sm">
              <li className="flex items-center gap-2 opacity-80">
                <MapPin size={14} className="shrink-0" />
                {t('Muscat, Oman', 'مسقط، عُمان')}
              </li>
              <li className="flex items-center gap-2 opacity-80">
                <Phone size={14} className="shrink-0" />
                <span dir="ltr">+968 9559 9902</span>
              </li>
                          </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-widest mb-4 opacity-60">
              {t('Stay Updated', 'ابقَ على اطلاع')}
            </h4>
            <p className="font-body text-sm opacity-80 mb-4">
              {t('Subscribe for the latest project updates.', 'اشترك لتلقي آخر تحديثات المشاريع.')}
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder={t('Your email', 'بريدك الإلكتروني')}
                className="flex-1 rounded-md border border-border bg-background/10 px-3 py-2 font-body text-sm text-accent-foreground placeholder:opacity-50 focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button className="rounded-md bg-gradient-gold px-4 py-2 font-body text-xs font-semibold text-primary-foreground">
                {t('Subscribe', 'اشترك')}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-accent-foreground/10 pt-6 text-center font-body text-xs opacity-50">
          © {new Date().getFullYear()} Awtad Development. {t('All rights reserved.', 'جميع الحقوق محفوظة.')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
