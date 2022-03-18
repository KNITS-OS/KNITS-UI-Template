import { dashboardService } from "redux/features";

import { ChartPanel } from "../chart-panels";
import { useChart } from "../hooks";

import { renderChart } from "./Age.renderer";

export const AgeChartPanel = () => {
  const { isLoading, chart, alert } = useChart(
    dashboardService.getDistributionByAgeReport,
    renderChart
  );

  return (
    <ChartPanel
      chart={chart}
      title="Composition"
      subTitle="By Age"
      alert={alert}
      isLoading={isLoading}
    />
  );
};
