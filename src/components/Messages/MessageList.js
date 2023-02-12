import { MESSAGES_LIMIT } from '../Nats/utils';
import MessageItem from './MessageItem';

const MESSAGES_MAX_COUNT = 10;

const MessageList = ({ list }) => {
  const messagesToRender = list?.slice(0, MESSAGES_MAX_COUNT) || [];
  return (
    <div>
      {/* <h3>Showing only last {MESSAGES_MAX_COUNT} messages</h3> */}
      {messagesToRender.length > 0 ? (
        messagesToRender.map((message, index) => (
          <MessageItem key={`${message.date}-${index}`} message={message} />
        ))
      ) : (
        <div>No messages</div>
      )}
    </div>
  );
};

export default MessageList;
