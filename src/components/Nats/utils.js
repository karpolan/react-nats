import { JSONCodec, StringCodec } from 'nats.ws';

export const NATS_CONNECTION_NAME = 'NATS clients built with React';
// export const NATS_SERVERS_FALLBACK = ['ws://localhost:1234', 'demo.nats.io'];
export const NATS_SERVER_DEFAULT = 'ws://localhost:1234';
export const NATS_SERVERS_FALLBACK = [];
// export const NATS_SERVER_DEFAULT = 'demo.nats.io:4222';
export const NATS_SUBJECT_DEFAULT = '>';

export const natsStringCodec = StringCodec();
export const natsJsonCodec = JSONCodec();

// export const natsDecodeText = (dataAsUint8Array) =>
//   dataAsUint8Array ? natsStringCodec.decode(dataAsUint8Array) : '';
// export const natsEncodeText = (dataAsString) =>
//   dataAsString ? natsStringCodec.encode(dataAsString) : Empty;

// export const natsDecodeJson = (dataAsUint8Array) =>
//   dataAsUint8Array ? natsJsonCodec.decode(dataAsUint8Array) : null;
// export const natsEncodeJson = (dataAsJson) =>
//   dataAsJson ? natsJsonCodec.encode(dataAsJson) : Empty;

export const natsDecode = (dataAsUint8Array) => {
  const dataAsString = natsStringCodec.decode(dataAsUint8Array);
  let dataAsJson;
  try {
    dataAsJson = JSON.parse(dataAsString);
  } catch (error) {
    // Not a JSON
  }
  return dataAsJson ?? dataAsString;
};

export const natsEncode = (dataAsStringOrJson) => {
  const dataAsString =
    typeof dataAsStringOrJson === 'string'
      ? dataAsStringOrJson
      : JSON.stringify(dataAsStringOrJson);
  return natsStringCodec.encode(dataAsString);
};
