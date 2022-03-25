import { Pie } from "react-chartjs-2";

import { ThemeColors } from "variables/app.consts";

import { pieDataTemplate, pieOptionsTemplate } from "..";

const toPieChartUI = response => {
  const genderTemplate = pieDataTemplate({
    label: "Gender",
    backgroundColor: [ThemeColors.theme["primary"], ThemeColors.theme["info"]],
  });

  response.forEach(genderRecord => {
    genderTemplate.labels?.push(genderRecord.label);
    genderTemplate.datasets[0].data.push(genderRecord.value);
  });

  return {
    data: genderTemplate,
    options: pieOptionsTemplate,
  };
};

export const renderChart = response => {
  const pieChart = toPieChartUI(response.data);
  return <Pie data={pieChart.data} options={pieChart.options} className="chart-canvas" />;
};
