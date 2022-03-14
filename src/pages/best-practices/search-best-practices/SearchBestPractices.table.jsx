import moment from "moment";
import { Column } from "react-table";

import { TwoMouseEventActionButtons, IDefaultActionButtons } from "components/widgets";

import { DATE_FILTER_FORMAT } from "variables/app.consts";

export const bestPracticesTableColumns = ({
  onDetailsButtonClick,
  onRemoveButtonClick,
}: IDefaultActionButtons) => {
  return [
    {
      accessor: "id",
      Header: "id",
    },
    {
      accessor: "title",
      Header: "Title",
    },
    {
      accessor: "description",
      Header: "Description",
    },
    {
      accessor: "author",
      Header: "Author",
    },
    {
      accessor: "tags",
      Header: "Tags",
      Cell: ({ row }) => {
        const { tags = [] } = row.original;

        return (
          <>
            {tags.map((tag, i) => (
              <div key={i}>{tag} </div>
            ))}
          </>
        );
      },
    },
    {
      accessor: "rating",
      Header: "Rating",
      Cell: ({ row }) => {
        const { rating } = row.original;
        return (
          <>
            {/* @todo - fix rating to use react-rating component */}
            {rating}
            {/* <Rating
              initialRating={rating}
              emptySymbol="fa fa-star-o fa-2x"
              fullSymbol="fa fa-star fa-2x"
              readonly
            /> */}
          </>
        );
      },
    },
    {
      accessor: "publishDate",
      Header: "Publish Date",
      Cell: ({ row }) => {
        const { publishDate } = row.original;
        return <>{moment(publishDate, DATE_FILTER_FORMAT).format(DATE_FILTER_FORMAT)}</>;
      },
    },
    TwoMouseEventActionButtons({ onDetailsButtonClick, onRemoveButtonClick }),
  ];
};
