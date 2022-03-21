import { distributionByAgeReport } from "data";

import { ChartPanel } from "../chart-panels";
import { useChart } from "../hooks";

import { renderChart } from "./Age.renderer";

export const AgeChartPanel = () => {
  const { chart, isLoading, alert } = useChart(distributionByAgeReport, renderChart);

  return (
    <ChartPanel
      alert={alert}
      chart={chart}
      isLoading={isLoading}
      title="Composition"
      subTitle="By Age"
    />
  );
};
