import { dashboardService } from "redux/features";

import { ChartPanel } from "../chart-panels";
import { useChart } from "../hooks";

import { renderChart } from "./Turnover.renderer";

export const TurnoverChartPanel = () => {
  const { isLoading, chart, alert } = useChart(dashboardService.getTurnoverReport, renderChart);
  return (
    <ChartPanel
      alert={alert}
      chart={chart}
      isLoading={isLoading}
      title="Care Members"
      subTitle="Onboarded/Offboarded"
    />
  );
};
