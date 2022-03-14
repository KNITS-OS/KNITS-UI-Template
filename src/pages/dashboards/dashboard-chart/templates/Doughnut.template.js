export const doughnutDataTemplate = ({ label, backgroundColor }) => {
  return {
    labels: [],
    datasets: [
      {
        label,
        data: [],
        backgroundColor,
      },
    ],
  };
};

export const doughnutOptionsTemplate = {
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
