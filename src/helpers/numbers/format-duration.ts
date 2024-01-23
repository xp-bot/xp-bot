import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { t } from 'i18next';
import { compact } from 'lodash';

dayjs.extend(duration);
export default (ms: number) => {
  const duration = dayjs.duration(ms);
  return compact([
    duration.weeks()
      ? `${t('duration.week', {
          lng: 'en',
          ns: 'global',
          count: duration.weeks(),
        })}`
      : null,
    duration.days()
      ? `${t('duration.day', {
          lng: 'en',
          ns: 'global',
          count: duration.days(),
        })}`
      : null,
    duration.hours()
      ? `${t('duration.hour', {
          lng: 'en',
          ns: 'global',
          count: duration.hours(),
        })}`
      : null,
    duration.minutes()
      ? `${t('duration.minute', {
          lng: 'en',
          ns: 'global',
          count: duration.minutes(),
        })}`
      : null,
    duration.seconds()
      ? `${t('duration.second', {
          lng: 'en',
          ns: 'global',
          count: duration.seconds(),
        })}`
      : null,
  ]).join(', ');
};
