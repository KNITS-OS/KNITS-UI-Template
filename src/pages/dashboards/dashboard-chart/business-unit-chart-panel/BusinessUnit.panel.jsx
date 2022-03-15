import { distributionByBusinessUnitReport } from "data";

import { ChartPanel } from "../chart-panels";
import { useChart } from "../hooks";

import { renderChart } from "./BusinessUnit.renderer";

export const BusinessUnitChartPanel = () => {
  const { isLoading, chart, alert } = useChart(distributionByBusinessUnitReport, renderChart);

  return (
    <ChartPanel
      alert={alert}
      chart={chart}
      isLoading={isLoading}
      title="Composition"
      subTitle="By Business Unit"
    />
  );
};
