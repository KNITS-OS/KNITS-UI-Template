import { Pie } from "react-chartjs-2";

import { ThemeColors } from "variables/app.consts";

import { pieDataTemplate, pieOptionsTemplate } from "..";

const toPieChartUI = apiResponse => {
  const template = pieDataTemplate({
    label: "BusinessUnit",
    backgroundColor: [
      ThemeColors.theme["primary"],
      ThemeColors.theme["info"],
      ThemeColors.theme["success"],
      ThemeColors.theme["danger"],
      ThemeColors.theme["neutral4"],
      ThemeColors.theme["neutral3"],
      ThemeColors.theme["neutral5"],
      ThemeColors.theme["neutral2"],
      ThemeColors.gray[800],
      ThemeColors.gray[700],
      ThemeColors.gray[600],
      ThemeColors.gray[500],
      ThemeColors.gray[400],
    ],
  });

  apiResponse.forEach(record => {
    template.labels?.push(record.label);
    template.datasets[0].data.push(record.value);
  });

  return {
    data: template,
    options: pieOptionsTemplate,
  };
};

export const renderChart = response => {
  const pieChart = toPieChartUI(response);
  return <Pie data={pieChart.data} options={pieChart.options} className="chart-canvas" />;
};
