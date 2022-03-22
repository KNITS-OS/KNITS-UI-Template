import { ChartData, ChartOptions } from "chart.js";
import { ReactNode } from "react";

export type LayoutType = "/admin" | "/auth" | "/rtl";
export type Theme = "light" | "dark";
export interface IRoute {
  collapse?: boolean;
  name?: string;
  icon?: string;
  state?: string;
  views?: IRoute[];
  miniName?: string;
  global?: boolean;
  path: string;
  component?: ReactNode;
  layout?: LayoutType;
  redirect?: string;
  key: string;
}

export type AlertType = React.ReactNode | null;

export interface SelectOption {
  value: string;
  label: string;
}

export interface RouteParams {
  id: string;
}

export interface ILineChart {
  data: ChartData<"line">;
  options: ChartOptions<"line">;
}
export interface IBarChart {
  data: ChartData<"bar">;
  options: ChartOptions<"bar">;
}
export interface IDoughnutChart {
  data: ChartData<"doughnut">;
  options: ChartOptions<"doughnut">;
}
export interface IPieChart {
  data: ChartData<"pie">;
  options: ChartOptions<"pie">;
}
