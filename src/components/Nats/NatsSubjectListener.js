import { useCallback, useEffect, useState } from 'react';
import { connect } from 'nats.ws';
import { MessageList } from '../Messages';
import {
  MESSAGES_LIMIT,
  SERVERS_FALLBACK,
  SERVER_DEFAULT,
  SUBJECT_DEFAULT,
  natsStringCodec,
} from './utils';

const NatsSubjectListener = ({
  server = SERVER_DEFAULT,
  subject = SUBJECT_DEFAULT,
}) => {
  const [messages, setMessages] = useState([]);

  const onReceiveMessage = useCallback(
    (error, message) => {
      if (error) {
        console.error(error);
        return;
      }
      const { data, headers, reply, subject, sid } = message;
      setMessages((oldList) => [
        { data: natsStringCodec.decode(data), headers, reply, subject, sid },
        ...oldList.slice(0, MESSAGES_LIMIT),
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
              ...SERVERS_FALLBACK, // optional fallback server(s)
            ],
          });
          natsSubscription = natsConnection.subscribe(subject, {
            callback: onReceiveMessage,
          });
        } catch (error) {
          console.error(error);
        }
      }

      async function unsubscribeAndDisconnect() {
        try {
          natsSubscription?.unsubscribe();
          natsConnection?.close();
        } catch (error) {
          console.error(error);
        }
      }

      connectAndSubscribe();
      return () => {
        unsubscribeAndDisconnect();
      };
    },
    [server, subject, onReceiveMessage] // Executed only when .server or .subject property changes, in 99% cases single time on component mount
  );

  return (
    <div>
      <h2>Subscribed to "{subject}"</h2>
      <MessageList list={messages} />
    </div>
  );
};

export default NatsSubjectListener;
