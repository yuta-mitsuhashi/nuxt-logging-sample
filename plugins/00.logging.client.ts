import { defineNuxtPlugin } from 'nuxt/app';
import pino from 'pino';

export default defineNuxtPlugin(() => {
  const logger = pino({
    level: 'info',
    timestamp: pino.stdTimeFunctions.isoTime,
  });
  return {
    provide: {
      logger,
    },
  };
});
