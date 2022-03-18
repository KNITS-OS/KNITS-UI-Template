import { Card, CardHeader, CardBody, Spinner } from "reactstrap";

export const ChartPanel = ({ isLoading, chart, alert, title, subTitle }) => {
  return (
    <Card>
      <CardHeader>
        <h6 className="surtitle">{title}</h6>
        <h5 className="h3 mb-0">{subTitle}</h5>
      </CardHeader>
      <CardBody>
        <div className="chart">
          {isLoading ? (
            <>
              <Spinner />
            </>
          ) : chart ? (
            chart
          ) : (
            alert
          )}
        </div>
      </CardBody>
    </Card>
  );
};
