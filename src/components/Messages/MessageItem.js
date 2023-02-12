import ObjectAsList from './ObjectAsList';

const MessageItem = ({ message }) => {
  const { data, subject } = message;
  const dataToRender = data ? (
    typeof data !== 'string' ? (
      <ObjectAsList object={data} />
    ) : (
      data
    )
  ) : (
    '[no data]'
  );
  return (
    <div>
      <div>
        {subject}: {dataToRender}
      </div>
    </div>
  );
};

export default MessageItem;
