import { useEffect, useState } from "react";

import { renderChartErrorAlert } from "..";

interface RenderChartFunction<T> {
  (response: T): JSX.Element;
}

export const useChart = <T>(data: T, renderChart: RenderChartFunction<T>) => {
  const [isLoading] = useState<boolean>(false);
  const [chart, setChart] = useState<JSX.Element>();
  const [alert, setAlert] = useState<JSX.Element>();

  useEffect(() => {
    if (data) {
      setChart(renderChart(data));
    } else {
      setAlert(renderChartErrorAlert());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isLoading, chart, alert };
};
