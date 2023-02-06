import { useEffect, useId, useState } from 'react';
import {
  SERVERS_FALLBACK,
  SERVER_DEFAULT,
  SUBJECT_DEFAULT,
  natsStringCodec,
} from './utils';
import { connect } from 'nats.ws';

const NatsPublisher = ({
  server = SERVER_DEFAULT,
  subject = SUBJECT_DEFAULT,
}) => {
  const idSubject = useId();
  const idMessage = useId();
  const [connection, setConnection] = useState();

  const onSendMessage = (event) => {
    event.preventDefault();
    const subject = event?.target?.[idSubject]?.value ?? '';
    const data = natsStringCodec.encode(
      event?.target?.[idMessage]?.value ?? ''
    );
    console.log({ subject, data });
    connection?.publish(subject, data);
  };

  useEffect(
    () => {
      let natsConnection;

      async function openConnection() {
        try {
          natsConnection = await connect({
            servers: [
              server, // configuration form props
              ...SERVERS_FALLBACK, // optional fallback server(s)
            ],
          });
          setConnection(natsConnection); // Save connection to state
        } catch (error) {
          console.error(error);
        }
      }

      async function closeConnection() {
        try {
          // we want to insure that messages that are in flight
          // get processed, so we are going to drain the
          // connection. Drain is the same as close, but makes
          // sure that all messages in flight get seen
          // by the iterator. After calling drain on the connection
          // the connection closes.
          await natsConnection?.drain();
        } catch (error) {
          console.error(error);
        }
      }

      openConnection();
      return () => {
        closeConnection();
      };
    },
    [server] // Executed only when .server property changes, in 99% cases single time on component mount
  );

  return (
    <div>
      <h2>NatsPublisher</h2>
      <div>Server: {server}</div>
      <div>Subject: {subject}</div>

      <form onSubmit={onSendMessage}>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div>
            <label htmlFor={idSubject}>Subject</label>
            <input id={idSubject} type="text" defaultValue={subject} />
          </div>
          <div>
            <label htmlFor={idMessage}>Message</label>
            <input id={idMessage} type="text" />
          </div>
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
};

export default NatsPublisher;
