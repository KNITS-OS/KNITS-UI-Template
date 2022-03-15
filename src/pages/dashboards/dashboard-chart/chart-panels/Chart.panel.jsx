import { Card, CardHeader, CardBody } from "reactstrap";

export const ChartPanel = ({ chart, title, subTitle }) => {
  return (
    <Card>
      <CardHeader>
        <h6 className="surtitle">{title}</h6>
        <h5 className="h3 mb-0">{subTitle}</h5>
      </CardHeader>
      <CardBody>
        <div className="chart">{chart}</div>
      </CardBody>
    </Card>
  );
};
