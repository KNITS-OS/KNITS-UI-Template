import { ChartData, ChartOptions } from "chart.js";

interface Props {
  label;
}

export const dotDataTemplate = ({ label }) => {
  return {
    labels: [],
    datasets: [
      {
        label,
        data: [],
        pointRadius: 10,
        pointHoverRadius: 15,
        showLine: false,
      },
    ],
  } as ChartData<"line">;
};

export const dotOptionsTemplate: ChartOptions<"line"> = {
  plugins: {},
};
