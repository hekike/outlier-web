
import React from 'react';
import WorkloadStatusCell from "./WorkloadStatusCell"
import { IWorkloadStatus } from "./workloadTypes"

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
          <WorkloadStatusCell status={statusItem} />
        </td>
      )}
    </tr>
  );
}

export default WorkloadStatusRow;
