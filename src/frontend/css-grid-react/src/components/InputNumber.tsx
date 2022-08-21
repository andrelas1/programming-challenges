import { useState } from "react";

export const InputNumber: React.FC<{
  cb: (val: number) => void;
  className: string;
}> = ({ cb }) => {
  const [value, setValue] = useState<number>();

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = parseInt(e.target.value, 10);

    setValue(value);
    cb(value);
  };

  return <input type="number" value={value} onChange={onChange} />;
};
