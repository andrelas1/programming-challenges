export const CardImage: React.FC<{ url: string; title: string }> = ({
  url,
  title,
}) => {
  return (
    <div className="card-image">
      <img src={url} alt={"img"} />
      <p>{title}</p>
    </div>
  );
};
