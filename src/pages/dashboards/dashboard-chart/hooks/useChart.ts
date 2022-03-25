import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

import { HttpResponseType } from "redux/app";

import { renderChartErrorAlert } from "../Chart.renderers";

interface ApiCallFunction<T> {
  (): HttpResponseType<T>;
}

interface RenderChartFunction<T> {
  (response: AxiosResponse<T>): JSX.Element;
}

export const useChart = <T>(
  asyncFunction: ApiCallFunction<T>,
  renderChart: RenderChartFunction<T>
) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [chart, setChart] = useState<JSX.Element>();
  const [alert, setAlert] = useState<JSX.Element>();

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
