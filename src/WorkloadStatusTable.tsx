
import moment from "moment";
import React from 'react';

import WorkloadStatusRow from './WorkloadStatusRow'
import { IWorkloadStatus } from "./workloadTypes"

interface IProps {
  workload: IWorkloadStatus
}

function WorkloadStatusTable (props: IProps) {
  const { workload } = props;
  const startDate = workload && workload.statuses &&
    workload.statuses.length ?
    moment(workload.statuses[0].date).format('MMMM Do YYYY')
    : null;

  return (
    <table className="table mt-4">
      <thead className="text-muted">
        <tr>
          <td>{startDate}</td>
          {workload.statuses.map((status) => {
            const date = moment(status.date).format('h:mm');
            return <td key={status.date.toString()}>{date}</td>;
          })}
        </tr>
      </thead>
      <thead>
        <tr><th colSpan={14}>Upstream</th></tr>
      </thead>
      <tbody>
        {workload.sources.map((source) =>
          <WorkloadStatusRow
            key={`source-${source.name}`}
            workload={source} />
        )}
      </tbody>
      <thead>
        <tr><th colSpan={14}>Destination</th></tr>
      </thead>
      <tbody>
        <WorkloadStatusRow
          workload={workload}
          style={{ backgroundColor: "#F5F5F5" }} />
      </tbody>
      <thead>
        <tr><th colSpan={14}>Downstream</th></tr>
      </thead>
      <tbody>
        {workload.destinations.map((destination) =>
          <WorkloadStatusRow
            key={`destination-${destination.name}`}
            workload={destination} />
        )}
      </tbody>
    </table>
  );
}

export default WorkloadStatusTable;
