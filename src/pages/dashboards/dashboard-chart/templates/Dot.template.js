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
  };
};

export const dotOptionsTemplate = {
  plugins: {},
};
