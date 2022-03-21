import { Card, CardHeader, CardBody, Spinner } from "reactstrap";

interface Props {
  title: string;
  subTitle: string;
  chart: JSX.Element | undefined;
  isLoading: boolean;
  alert: JSX.Element | undefined;
}

export const ChartPanel = ({ chart, title, subTitle, isLoading, alert }: Props) => {
  return (
    <Card>
      <CardHeader>
        <h6 className="surtitle">{title}</h6>
        <h5 className="h3 mb-0">{subTitle}</h5>
      </CardHeader>
      <CardBody>
        <div className="chart">{isLoading ? <Spinner /> : chart ? chart : alert}</div>
      </CardBody>
    </Card>
  );
};
