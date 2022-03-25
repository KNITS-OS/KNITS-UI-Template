export const barDataTemplate = ({ bars }) => {
  const datasets = bars.map(bar => ({
    label: bar.label,
    data: [],
    backgroundColor: bar.backgroundColor,
    maxBarThickness: 10,
  }));

  return {
    labels: [],
    datasets,
  };
};

export const barOptionsTemplate = {
  plugins: {
    tooltip: {
      mode: "index",
      intersect: false,
    },
  },
};

export const multiBarOptionsTemplate = {
  plugins: {
    tooltip: {
      mode: "index",
      intersect: false,
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};
