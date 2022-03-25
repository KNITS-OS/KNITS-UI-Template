import { useState, useEffect } from "react";

import { renderChartErrorAlert } from "../Chart.renderers";

export const useChart = (asyncFunction, renderChart) => {
  const [isLoading, setIsLoading] = useState(true);
  const [chart, setChart] = useState();
  const [alert, setAlert] = useState();

  const fetchDataAsync = async () => {
    const httpResponse = await asyncFunction();
    if (!httpResponse.data) {
      setAlert(renderChartErrorAlert(httpResponse));
    } else {
      setChart(renderChart(httpResponse));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDataAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return { isLoading, chart, alert };
};
