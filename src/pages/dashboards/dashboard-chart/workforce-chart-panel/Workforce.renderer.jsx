import { Line } from "react-chartjs-2";

import { lineDataTemplate, lineOptionsTemplate } from "..";

const toWorkforceLineChartUI = apiResponse => {
  const template = lineDataTemplate({ label: "Members" });
  apiResponse.forEach(workforceRecord => {
    template.labels = template.labels ? template.labels : [];
    template.labels.push(workforceRecord.label);
    template.datasets[0].data.push(workforceRecord.value);
  });
  return {
    data: template,
    options: lineOptionsTemplate,
  };
};

export const renderChart = response => {
  const chart = toWorkforceLineChartUI(response);
  return (
    <Line data={chart.data} options={chart.options} id="chart-workforce" className="chart-canvas" />
  );
};
