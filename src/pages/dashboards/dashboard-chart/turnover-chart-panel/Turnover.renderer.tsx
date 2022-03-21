import { Bar } from "react-chartjs-2";

import { TurnoverChart, IBarChart } from "types";
import { ThemeColors } from "variables/app.consts";

import { barDataTemplate, barOptionsTemplate } from "..";

export const toTurnoverBarChartUI = (response: TurnoverChart[]): IBarChart => {
  const template = barDataTemplate({
    bars: [
      { label: "Onboarded", backgroundColor: ThemeColors.theme["success"] },
      { label: "Offboarded", backgroundColor: ThemeColors.theme["danger"] },
    ],
  });
  response.forEach(turnOverRecord => {
    template.labels = template.labels ? template.labels : [];
    template.labels.push(turnOverRecord.month);
    template.datasets[0].data.push(turnOverRecord.onboarded);
    template.datasets[1].data.push(turnOverRecord.offboarded);
  });

  return {
    data: template,
    options: barOptionsTemplate,
  };
};

export const renderChart = (response: TurnoverChart[]) => {
  const barChart = toTurnoverBarChartUI(response);
  return <Bar data={barChart.data} options={barChart.options} className="chart-canvas" />;
};
