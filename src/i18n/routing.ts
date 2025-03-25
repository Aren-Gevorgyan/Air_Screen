import { DEFAULT_LOCALE, LOCALES } from '@/assets/constants';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localeDetection: false,
});
