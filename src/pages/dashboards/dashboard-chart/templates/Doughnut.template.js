import { ChartData, ChartOptions } from "chart.js";

interface DoughnutDataProps {
  label
  backgroundColor[];
}

export const doughnutDataTemplate = ({ label, backgroundColor }: DoughnutDataProps) => {
  return {
    labels: [],
    datasets: [
      {
        label,
        data: [],
        backgroundColor,
      },
    ],
  } 
};

export const doughnutOptionsTemplate: ChartOptions<"doughnut"> = {
  plugins: {
    legend: {
      position: "top",
    },
  },
  animation: {
    animateScale: true,
  },
  cutout: 100,
};
