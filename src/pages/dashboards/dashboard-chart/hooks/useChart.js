import { useEffect, useState } from "react";

import { renderChartErrorAlert } from "..";

export const useChart = (data, renderChart) => {
  const [isLoading] = useState(false);
  const [chart, setChart] = useState();
  const [alert, setAlert] = useState();

  useEffect(() => {
    setChart(renderChart(data));
    if (data) {
      setChart(renderChart(data));
    } else {
      setAlert(renderChartErrorAlert());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isLoading, chart, alert };
};
