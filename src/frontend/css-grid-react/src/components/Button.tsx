import { MouseEventHandler } from "react";

export const Button: React.FC<{
  onClickCb: () => void;
  text: string;
  className: string;
}> = ({ onClickCb, text, className }) => {
  const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    console.log("Event", e);
    onClickCb();
  };

  return (
    <button className={className} onClick={onClick}>
      <span>{text}</span>
    </button>
  );
};
