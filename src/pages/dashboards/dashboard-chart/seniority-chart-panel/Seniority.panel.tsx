import { distributionBySeniorityReport } from "data";

import { ChartPanel } from "../chart-panels";
import { useChart } from "../hooks";

import { renderChart } from "./Seniority.renderer";

export const SeniorityChartPanel = () => {
  const { isLoading, chart, alert } = useChart(distributionBySeniorityReport, renderChart);

  return (
    <ChartPanel
      alert={alert}
      chart={chart}
      isLoading={isLoading}
      title="Composition"
      subTitle="By Seniority"
    />
  );
};
