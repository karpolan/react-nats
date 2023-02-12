import { useCallback, useId, useState } from 'react';
import { NATS_SERVER_DEFAULT } from './utils';

const NatsServerConnector = () => {
  const idServer = useId();
  const [server, setServer] = useState(NATS_SERVER_DEFAULT);

  const onInputChange = useCallback((event) => {
    setServer(event?.target?.value);
  }, []);

  const onButtonClick = (event) => {
    console.log('server: ', server);
  };

  return (
    <div>
      <h2>NatsServerConnector</h2>

      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div>
          <label htmlFor={idServer}>Server URL</label>
          <input
            id={idServer}
            type="text"
            value={server}
            onChange={onInputChange}
          />
        </div>
        <button onClick={onButtonClick}>Connect</button>
      </div>
    </div>
  );
};

export default NatsServerConnector;
