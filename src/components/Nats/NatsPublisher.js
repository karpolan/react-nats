import { useEffect, useId, useState } from 'react';
import { connect } from 'nats.ws';
import {
  NATS_CONNECTION_NAME,
  NATS_SERVERS_FALLBACK,
  NATS_SERVER_DEFAULT,
  natsEncode,
} from './utils';

const NatsPublisher = ({ server = NATS_SERVER_DEFAULT, subject }) => {
  const idSubject = useId();
  const idMessage = useId();
  const [connection, setConnection] = useState();

  const onSendMessage = (event) => {
    event.preventDefault();
    const subject = event?.target?.[idSubject]?.value || 'default';
    const data = natsEncode(event?.target?.[idMessage]?.value ?? '');
    connection?.publish(subject, data);
  };

  useEffect(
    () => {
      let natsConnection;

      async function openConnection() {
        try {
          natsConnection = await connect({
            name: NATS_CONNECTION_NAME, // TODO: Do we need this as property?
            servers: [
              server, // configuration form props
              ...NATS_SERVERS_FALLBACK, // optional fallback server(s)
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
      <h2>Publish message</h2>

      <form onSubmit={onSendMessage}>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div>
            <label htmlFor={idSubject}>Subject</label>
            <datalist id="subjects">
              <option value="subject1">subject1</option>
              <option value="subject2">subject2</option>
            </datalist>
            <input
              id={idSubject}
              type="text"
              defaultValue={subject}
              list="subjects"
            />
          </div>
          <div>
            <label htmlFor={idMessage}>Data as Text or JSON</label>
            <textarea id={idMessage} rows={3} />
          </div>
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
};

export default NatsPublisher;
