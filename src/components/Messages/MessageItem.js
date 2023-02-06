const MessageItem = ({ message }) => {
  const { data, subject } = message;
  return (
    <div>
      <div>subject: {subject}</div>
      <div>data: {data}</div>
    </div>
  );
};

export default MessageItem;
