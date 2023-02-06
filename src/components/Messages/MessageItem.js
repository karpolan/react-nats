const MessageItem = ({ message }) => {
  const { data, subject } = message;
  return (
    <div>
      {/* <div>subject: {message.subject}</div> */}
      <div>data: {message.data}</div>
      {/* <div>sid: {message.sid}</div> */}
    </div>
  );
};

export default MessageItem;
