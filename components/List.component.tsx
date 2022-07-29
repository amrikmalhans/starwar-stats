import { NextPage } from "next";

interface Props {
  field: string;
  value: string | number;
}

const List: NextPage<Props> = ({ field, value }) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <p className="text-right font-bold">{field}:</p>
      <p>{value}</p>
    </div>
  );
};

export default List;
