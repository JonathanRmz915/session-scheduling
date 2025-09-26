export type TimeRange = { start: string; end: string };
export type DateAvailability = { date: string; times: TimeRange[] | null };
export type SessionHost = { photo?: string; firstName?: string; lastName?: string; profession?: string };
export type SessionUser = { email?: string; firstName?: string; lastName?: string; timeZone?: string };
export type SessionService = { title: string };
export type SessionPage = {
  date?: string | null;
  time?: string | null;
  duration: number;
  host: SessionHost;
  user: SessionUser;
  service: SessionService;
};
