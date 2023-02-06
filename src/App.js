import { NatsSubjectListener } from './components/Nats';

const App = () => {
  return (
    <>
      <header>NATS clients built with React</header>
      <hr />
      <main>
        <NatsSubjectListener _subject="react" />
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
