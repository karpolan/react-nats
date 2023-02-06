import { useCallback, useEffect, useState } from 'react';
import { MessageList } from '../Messages';
import { StringCodec, connect } from 'nats.ws';

const FALLBACK_SERVERS = ['ws://localhost:1234'];

const natsStringCodec = StringCodec();

const NatsSubjectListener = ({
  server = 'ws://localhost:1234',
  subject = '>',
}) => {
  const [list, setList] = useState([]);

  const onMessage = useCallback(
    (error, message) => {
      if (error) {
        console.error(error);
        return;
      }
      const { data, headers, reply, subject, sid } = message;
      setList((oldList) => [
        { data: natsStringCodec.decode(data), headers, reply, subject, sid },
        ...oldList,
      ]);
    },
    [] // Single instance of callback for entire life-time, created on component mount
  );

  useEffect(
    () => {
      let natsConnection;
      let natsSubscription;

      async function connectAndSubscribe() {
        try {
          natsConnection = await connect({
            servers: [
              server, // configuration form props
              ...FALLBACK_SERVERS, // optional fallback server(s)
            ],
          });
          natsSubscription = natsConnection.subscribe(subject, {
            callback: onMessage,
          });
        } catch (error) {
          console.error(error);
        }
      }

      async function unsubscribeAndClose() {
        try {
          natsSubscription?.unsubscribe();
          natsConnection?.close();
        } catch (error) {
          console.error(error);
        }
      }

      connectAndSubscribe();
      return () => {
        unsubscribeAndClose();
      };
    },
    [server, onMessage] // Executed only when .server property changes, in 99% cases single time on component mount
  );

  return (
    <div>
      <h2>NatsSubjectListener</h2>
      <MessageList list={list} />
    </div>
  );
};

export default NatsSubjectListener;
