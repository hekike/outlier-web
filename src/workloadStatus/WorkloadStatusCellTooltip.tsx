import React, { Component, ReactChildren } from 'react';
import { UncontrolledTooltip } from "reactstrap";
import { IWorkloadStatus, IWorkloadStatusItem } from "../types/workloadTypes";

interface IProps {
  children: any,
  status: IWorkloadStatusItem
  workload: IWorkloadStatus
}

function WorkloadStatusCellTooltip(props: IProps) {
  const { children, status, workload } = props;
  const id = `tooltip-${workload.name}-${new Date(status.date).getTime()}`;

  return (
    <span>
      <span id={id}>
        {children}
      </span>
      <UncontrolledTooltip
        placement="top"
        target={id}
        delay={{ show: 0, hide: 0 }}
        innerClassName="text-left"
      >
        <strong>Avg:</strong> {round(status.avg)} ms<br/>
        <strong>Median:</strong> {round(status.median)} ms<br/>
        <strong>Approx. Median:</strong> {round(status.approximateMedian)} ms
      </UncontrolledTooltip>
    </span>
  );
}

function round(value?: number): number|undefined {
  if (value === undefined) {
    return value;
  }

  return Math.round(value * 100) / 100;
}

export default WorkloadStatusCellTooltip;
