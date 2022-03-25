import { Pie } from "react-chartjs-2";

import { ThemeColors } from "variables/app.consts";

import { pieDataTemplate, pieOptionsTemplate } from "..";

const toPieChartUI = response => {
  const template = pieDataTemplate({
    label: "Seniority",
    backgroundColor: [
      ThemeColors.theme["primary"],
      ThemeColors.theme["info"],
      ThemeColors.theme["success"],
      ThemeColors.theme["danger"],
      ThemeColors.theme["neutral4"],
      ThemeColors.theme["neutral3"],
    ],
  });

  response.forEach(record => {
    template.labels?.push(record.label);
    template.datasets[0].data.push(record.value);
  });

  return {
    data: template,
    options: pieOptionsTemplate,
  };
};

export const renderChart = response => {
  const pieChart = toPieChartUI(response.data);
  return <Pie data={pieChart.data} options={pieChart.options} className="chart-canvas" />;
};
