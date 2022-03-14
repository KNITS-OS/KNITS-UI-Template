export const lineDataTemplate = ({ label }) => {
  return {
    labels: [],
    datasets: [
      {
        label,
        data: [],
        pointRadius: 4,
      },
    ],
  };
};

export const lineOptionsTemplate = {
  plugins: {
    tooltip: {
      intersect: false,
    },
    decimation: {
      enabled: true,
    },
  },
};
