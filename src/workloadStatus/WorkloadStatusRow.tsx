
import React from 'react';

import { IWorkloadStatus } from "../types/workloadTypes"
import WorkloadStatusCell from "./WorkloadStatusCell"

interface IProps {
  workload: IWorkloadStatus,
  style?: any
}

function WorkloadStatusRow (props: IProps) {
  const { workload, style } = props;

  return (
    <tr style={style}>
      <td>{workload.name}</td>
      {workload.statuses.map((statusItem) =>
        <td key={statusItem.date}>
          <WorkloadStatusCell workload={workload} status={statusItem} />
        </td>
      )}
    </tr>
  );
}

export default WorkloadStatusRow;
