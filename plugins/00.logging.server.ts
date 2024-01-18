import { defineNuxtPlugin } from 'nuxt/app';
import pino from 'pino';

const severityMapper = {
  trace: 'DEBUG',
  debug: 'DEBUG',
  info: 'INFO',
  warn: 'WARNING',
  error: 'ERROR',
  fatal: 'CRITICAL',
};

const prodLogger = pino({
  level: 'info',
  timestamp: pino.stdTimeFunctions.isoTime,
  messageKey: 'message',
  errorKey: 'stack_trace',
  formatters: {
    level: (label) => ({
      severity: severityMapper[label as keyof typeof severityMapper] ?? label.toUpperCase(),
    }),
  },
  serializers: {
    stack_trace: ({ stack }) => stack,
    pid: () => undefined,
    hostname: () => undefined,
  },
});

const devLogger = pino({
  level: 'trace',
  timestamp: pino.stdTimeFunctions.isoTime,
  transport: {
    target: 'pino-pretty',
  },
  serializers: {
    pid: () => undefined,
    hostname: () => undefined,
  },
});

export default defineNuxtPlugin(() => {
  return {
    provide: {
      logger: (process.env.NODE_ENV === 'development') ? devLogger : prodLogger,
    },
  };
});
