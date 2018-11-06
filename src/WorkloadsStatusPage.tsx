import moment from "moment";
import React, { Component } from 'react';

import WorkloadStatusRow from './WorkloadStatusRow'
import { IWorkloadStatus } from "./workloadTypes"

import "./WorkloadsStatusPage.css"
import { stat } from "fs";

interface IProps {
  match: {
    params: {
      name: string
    }
  }
}

interface IState {
  err?: Error,
  isLoading: boolean,
  name: string,
  workload?: IWorkloadStatus
}

class WorkloadsStatusPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      err: undefined,
      isLoading: true,
      name: props.match.params.name,
      workload: undefined
    };
  }

  public componentDidMount() {
    this.fetchData(this.state.name);
  }

  public render() {
    const { err, isLoading, workload } = this.state;

    const startDate = workload && workload.statuses ?
      moment(workload.statuses[0].date).format('MMMM Do YYYY')
      : null;

    return (
      <div className="row">
        <div className="col-12">
          <h1>Workload Status</h1>

          {isLoading ? <p>Loading...</p> : null}
          {err ? <p>{err.message}</p> : null}

          {workload ?
            <div>
              <h2>{workload.name}</h2>

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
            </div>
            : null
          }
        </div>
      </div>
    );
  }

  private fetchData(name: string) : Promise<void> {
    this.setState({
      err: undefined,
      isLoading: true
    });

    return fetch(`/api/v1/workloads/${name}/status`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch resource: " + response.statusText);
        }
        return response.json()
      })
      .then((response: IWorkloadStatus) => {
        this.setState({
          err: undefined,
          isLoading: false,
          workload: response
        });
      })
      .catch((err) => {
        this.setState({
          err,
          isLoading: false,
          workload: undefined
        });
      });
  }
}

export default WorkloadsStatusPage;
