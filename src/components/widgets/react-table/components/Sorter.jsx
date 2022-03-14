import { MdArrowDownward, MdArrowUpward } from "react-icons/md";
import { HeaderGroup } from "react-table";

export const Sorter = ({ column }) => {
  return (
    <span className="react-table-sorting">
      {column.isSorted ? column.isSortedDesc ? <MdArrowDownward /> : <MdArrowUpward /> : <></>}
    </span>
  );
};
