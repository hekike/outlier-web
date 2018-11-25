import React from 'react';
import { IWorkloadStatus, IWorkloadStatusItem } from "../types/workloadTypes";
import WorkloadStatusCellTooltip from "./WorkloadStatusCellTooltip";

interface IProps {
  workload: IWorkloadStatus
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

  // Text
  const statusText = props.status.status === "unknown"
    ? "-"
    : props.status.status;

  return <WorkloadStatusCellTooltip workload={props.workload} status={props.status}>
      <span className={className}>{statusText}</span>
    </WorkloadStatusCellTooltip>;
}

export default WorkloadStatusCell;
