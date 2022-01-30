import { FC } from "react";

interface Props {
  width?: string | number;
  height?: string | number;
}

export const StatsIcon: FC<Props> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <defs>
      <style>{".a{fill:none;stroke:#000;stroke-linecap:round;stroke-miterlimit:10}"}</style>
    </defs>
    <title>{"analytics-graph-bar"}</title>
    <path
      className="a"
      d="M.5 23.5h23M4.5 19a.5.5 0 0 0-.5-.5H2a.5.5 0 0 0-.5.5v4.5h3ZM10.5 14a.5.5 0 0 0-.5-.5H8a.5.5 0 0 0-.5.5v9.5h3ZM16.5 16a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 0-.5.5v7.5h3ZM22.5 9a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 0-.5.5v14.5h3Z"
    />
    <circle className="a" cx={3} cy={11.5} r={1.5} />
    <circle className="a" cx={9} cy={6.5} r={1.5} />
    <circle className="a" cx={15} cy={8.5} r={1.5} />
    <circle className="a" cx={21} cy={2} r={1.5} />
    <path
      className="a"
      d="m4.261 10.45 3.587-2.99M10.424 6.974l3.153 1.051M19.8 2.9l-3.759 4.385"
    />
  </svg>
);
