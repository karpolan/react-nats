import MessageItem from './MessageItem';

const MAX_MESSAGES = 10;

const MessageList = ({ list }) => {
  const messagesToRender = list?.slice(-MAX_MESSAGES) || [];
  return (
    <div>
      <h2>Last {MAX_MESSAGES} messages</h2>
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
