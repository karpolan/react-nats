import { NatsPublisher, NatsSubjectListener } from './components';

const App = () => {
  return (
    <>
      <header>NATS clients built with React</header>
      <hr />
      <main style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div
          id="listeners"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <NatsSubjectListener subject="subject1" />
          <NatsSubjectListener subject="subject2" />
          <NatsSubjectListener subject="subject3" />
        </div>
        <div id="publisher">
          <NatsPublisher />
        </div>
      </main>
      <hr />
      <footer>
        Copyright &copy;{' '}
        <a
          href="https://karpolan.com"
          target="_blank"
          rel="noreferrer noopener"
        >
          KARPOLAN
        </a>
      </footer>
    </>
  );
};

export default App;
