import { StringCodec } from 'nats.ws';

export const SERVERS_FALLBACK = ['ws://localhost:1234'];
export const MESSAGES_LIMIT = 100;

export const SERVER_DEFAULT = 'ws://localhost:1234';
export const SUBJECT_DEFAULT = '>';

export const natsStringCodec = StringCodec();
