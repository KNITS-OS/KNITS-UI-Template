export const pieDataTemplate = ({ label, backgroundColor }) => {
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

export const pieOptionsTemplate = {
  plugins: {
    legend: {
      position: "top",
    },
  },
  animation: {
    animateScale: true,
  },
};
