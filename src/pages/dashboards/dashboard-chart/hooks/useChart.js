import { useEffect, useState } from "react";

export const useChart = (data, renderChart) => {
  const [chart, setChart] = useState();

  useEffect(() => {
    setChart(renderChart(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { chart };
};
