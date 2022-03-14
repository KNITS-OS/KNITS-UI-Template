import ReactToPrint from "react-to-print";

import { Button } from "reactstrap";

export const PrintButton = ({ ref }) => {
  return (
    <ReactToPrint
      trigger={() => (
        <Button color="primary" size="sm" className="buttons-copy buttons-html5" id="print-tooltip">
          Print
        </Button>
      )}
      content={() => ref.current}
    />
  );
};
