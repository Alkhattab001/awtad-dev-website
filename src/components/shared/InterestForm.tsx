import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { submitInterestForm } from '@/services/api';
import type { Inquiry } from '@/types';
import { toast } from 'sonner';
import { z } from 'zod';

interface Props {
  inquiryType: Inquiry['inquiry_type'];
  propertyId?: string;
  unitId?: string;
  propertyName?: string;
  unitName?: string;
  onClose?: () => void;
}

const schema = z.object({
  full_name: z.string().trim().min(1).max(100),
  phone: z.string().trim().min(5).max(20),
  email: z.string().trim().email().max(255),
  preferred_contact_method: z.enum(['email', 'phone', 'whatsapp']),
  message: z.string().trim().max(1000),
});

const InterestForm = ({ inquiryType, propertyId, unitId, propertyName, unitName, onClose }: Props) => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<{
    full_name: string;
    phone: string;
    email: string;
    preferred_contact_method: 'email' | 'phone' | 'whatsapp';
    message: string;
  }>({
    full_name: '',
    phone: '',
    email: '',
    preferred_contact_method: 'email',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(t('Please fill in all required fields correctly.', 'يرجى ملء جميع الحقول المطلوبة بشكل صحيح.'));
      return;
    }

    setLoading(true);
    try {
      const inquiry: Inquiry = {
        full_name: parsed.data.full_name,
        phone: parsed.data.phone,
        email: parsed.data.email,
        preferred_contact_method: parsed.data.preferred_contact_method,
        message: parsed.data.message,
        inquiry_type: inquiryType,
        property_id: propertyId,
        unit_id: unitId,
      };
      await submitInterestForm(inquiry);
      toast.success(t('Thank you! We will be in touch shortly.', 'شكراً لك! سنتواصل معك قريباً.'));
      onClose?.();
    } catch {
      toast.error(t('Something went wrong. Please try again.', 'حدث خطأ. يرجى المحاولة مرة أخرى.'));
    } finally {
      setLoading(false);
    }
  };

  const inputClass = 'w-full rounded-md border border-border bg-background px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition';

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {(propertyName || unitName) && (
        <div className="rounded-md bg-muted/50 p-4 font-body text-sm">
          {propertyName && <p className="text-muted-foreground">{t('Property', 'المشروع')}: <span className="font-medium text-foreground">{propertyName}</span></p>}
          {unitName && <p className="text-muted-foreground mt-1">{t('Unit', 'الوحدة')}: <span className="font-medium text-foreground">{unitName}</span></p>}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <input
          type="text"
          placeholder={t('Full Name *', 'الاسم الكامل *')}
          value={form.full_name}
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
          className={inputClass}
          required
          maxLength={100}
        />
        <input
          type="tel"
          placeholder={t('Phone Number *', 'رقم الهاتف *')}
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className={inputClass}
          required
          maxLength={20}
        />
      </div>

      <input
        type="email"
        placeholder={t('Email Address *', 'البريد الإلكتروني *')}
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className={inputClass}
        required
        maxLength={255}
      />

      <div>
        <label className="mb-2 block font-body text-sm text-muted-foreground">
          {t('Preferred Contact Method', 'طريقة التواصل المفضلة')}
        </label>
        <div className="flex gap-3">
          {(['email', 'phone', 'whatsapp'] as const).map((method) => (
            <button
              key={method}
              type="button"
              onClick={() => setForm({ ...form, preferred_contact_method: method })}
              className={`rounded-full border px-4 py-2 font-body text-xs font-medium transition-all ${
                form.preferred_contact_method === method
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border text-muted-foreground hover:border-primary/50'
              }`}
            >
              {method === 'email' ? t('Email', 'بريد') : method === 'phone' ? t('Phone', 'هاتف') : 'WhatsApp'}
            </button>
          ))}
        </div>
      </div>

      <textarea
        placeholder={t('Your message (optional)', 'رسالتك (اختياري)')}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        rows={4}
        className={inputClass}
        maxLength={1000}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-gradient-gold px-6 py-3.5 font-body text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {loading ? t('Submitting...', 'جاري الإرسال...') : t('Submit Inquiry', 'إرسال الاستفسار')}
      </button>
    </form>
  );
};

export default InterestForm;
