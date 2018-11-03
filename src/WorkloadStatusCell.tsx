import React from 'react';
import { IWorkloadStatusItem } from "./workloadTypes"

import "./Tooltip.css"

interface IProps {
  status: IWorkloadStatusItem
}

function WorkloadStatusCell (props: IProps) {
  const { status } = props;

  // Color
  let className;
  switch (status.status) {
    case "ok":
    className = "text-success"
      break;
    case "high":
    className = "text-danger"
      break;
  }

  className += " tooltip-top";

  const tooltip = `
    Avg: ${round(status.avg)} ms
    Median: ${round(status.median)} ms
    Approx. Median: ${round(status.approximateMedian)} ms`;

  // Text
  const statusText = props.status.status === "unknown"
    ? "-"
    : props.status.status;

  return <span className={className} data-tooltip={tooltip}>{statusText}</span>;
}

function round(value?: number): number|undefined {
  if (value === undefined) {
    return value;
  }

  return Math.round(value * 100) / 100;
}

export default WorkloadStatusCell;
