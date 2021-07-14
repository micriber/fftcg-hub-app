import * as Sentry from '@sentry/react-native';

class Logger {
  private transporter: Transporter;
  private static instance: Logger;

  private constructor(loggerTransporter: Transporter) {
    this.transporter = loggerTransporter;
  }

  public static createLogger(transporter: Transporter): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger(transporter);
    }
    return Logger.instance;
  }

  public static getInstance(): Logger {
    return Logger.instance;
  }

  log(message: string) {
    this.transporter.log(message);
  }

  error(error: Error) {
    this.transporter.error(error);
  }
}

interface Transporter {
  log(message: string): void;
  error(error: Error): void;
}

class ConsoleTransporter implements Transporter {
  log(message: string): void {
    console.log(message);
  }

  error(error: Error): void {
    console.error(error);
  }
}

class SentryTransporter implements Transporter {
  log(message: string): void {
    Sentry.captureMessage(message);
  }

  error(error: Error): void {
    Sentry.captureException(error);
  }
}

Logger.createLogger(
  __DEV__ ? new ConsoleTransporter() : new SentryTransporter(),
);
export default Logger.getInstance();
