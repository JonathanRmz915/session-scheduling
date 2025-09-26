import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
setupZoneTestEnv();

import { webcrypto, randomUUID as nodeRandomUUID } from 'crypto';

if (!(globalThis as any).crypto) {
  (globalThis as any).crypto = (webcrypto ?? {}) as Crypto;
} else if (webcrypto && !(globalThis as any).crypto.subtle) {
  Object.assign(globalThis.crypto as any, webcrypto);
}

if (typeof (globalThis as any).crypto.randomUUID !== 'function') {
  if (typeof nodeRandomUUID === 'function') {
    (globalThis as any).crypto.randomUUID = nodeRandomUUID;
  } else {
    (globalThis as any).crypto.randomUUID = () => {
      const bytes =
        globalThis.crypto?.getRandomValues?.(new Uint8Array(16)) ??
        Uint8Array.from({ length: 16 }, () => Math.floor(Math.random() * 256));

      bytes[6] = (bytes[6] & 0x0f) | 0x40;
      bytes[8] = (bytes[8] & 0x3f) | 0x80;
      const hex = [...bytes].map(b => b.toString(16).padStart(2, '0')).join('');
      return `${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20)}`;
    };
  }
}
