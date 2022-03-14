import { ChartData, ChartOptions } from "chart.js";

interface PieDataProps {
  label
  backgroundColor[];
}

export const pieDataTemplate = ({ label, backgroundColor }: PieDataProps) => {
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

export const pieOptionsTemplate: ChartOptions<"pie"> = {
  plugins: {
    legend: {
      position: "top",
    },
  },
  animation: {
    animateScale: true,
  },
};
