import { distributionByGenderReport } from "data";

import { ChartPanel } from "../chart-panels";
import { useChart } from "../hooks";

import { renderChart } from "./Gender.renderer";

export const GenderChartPanel = () => {
  const { isLoading, chart, alert } = useChart(distributionByGenderReport, renderChart);

  return (
    <ChartPanel
      alert={alert}
      chart={chart}
      isLoading={isLoading}
      title="Composition"
      subTitle="By Gender"
    />
  );
};
