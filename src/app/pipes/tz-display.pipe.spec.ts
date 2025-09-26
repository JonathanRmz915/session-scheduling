import { TzDisplayPipe } from './tz-display.pipe';

describe('TzDisplayPipe', () => {
  let OriginalDateTimeFormat: any;

  beforeEach(() => {
    OriginalDateTimeFormat = (Intl as any).DateTimeFormat;
  });

  afterEach(() => {
    (Intl as any).DateTimeFormat = OriginalDateTimeFormat;
    jest.resetAllMocks();
  });

  const setMockParts = (parts: Array<{ type: string; value: string }>) => {
    (Intl as any).DateTimeFormat = jest.fn().mockImplementation(() => ({
      formatToParts: () => parts
    }));
  };

  it('removes "Daylight"/"Standard" and returns cleaned name with time', () => {
    setMockParts([
      { type: 'hour', value: '09' },
      { type: 'minute', value: '30' },
      { type: 'timeZoneName', value: 'Eastern Daylight Time' }
    ]);

    const pipe = new TzDisplayPipe();
    const result = pipe.transform(new Date('2025-01-01T09:30:00Z'), 'America/New_York', 'en-US');

    expect(result).toBe('Eastern Time (09:30)');
  });

  it('maps GMT timeZoneName to GENERIC_LABELS entry when available', () => {
    setMockParts([
      { type: 'hour', value: '10' },
      { type: 'minute', value: '15' },
      { type: 'timeZoneName', value: 'GMT-05:00' }
    ]);

    const pipe = new TzDisplayPipe();
    const result = pipe.transform(new Date(), 'America/Chicago', 'en-US');

    expect(result).toBe('Central Time (10:15)');
  });

  it('falls back to the provided timeZone when no generic label exists for GMT', () => {
    setMockParts([
      { type: 'hour', value: '12' },
      { type: 'minute', value: '00' },
      { type: 'timeZoneName', value: 'GMT+00:00' }
    ]);

    const pipe = new TzDisplayPipe();
    const result = pipe.transform(new Date(), 'Etc/Unknown', 'en-US');

    expect(result).toBe('Etc/Unknown (12:00)');
  });
});
