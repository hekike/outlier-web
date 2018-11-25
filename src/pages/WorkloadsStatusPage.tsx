
import moment from "moment";
import React, { Component } from 'react';
import url from "url";

import { IWorkloadStatus } from "../types/workloadTypes"
import WorkloadsStatusFilter from "../workloadStatus/WorkloadsStatusFilter"
import {
  defaultResolution,
  getDurationByResolution
} from "../workloadStatus/WorkloadsStatusResolution"
import WorkloadStatusTable from "../workloadStatus/WorkloadStatusTable"

interface IProps {
  match: {
    params: {
      name: string
    }
  }
}

interface IState {
  endDate: Date,
  err?: Error,
  isLoading: boolean,
  name: string,
  resolution: number,
  workload?: IWorkloadStatus
}

class WorkloadsStatusPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      endDate: new Date(),
      err: undefined,
      isLoading: true,
      name: props.match.params.name,
      resolution: defaultResolution,
      workload: undefined
    };

    this.onEndDateChange = this.onEndDateChange.bind(this);
    this.onResolutionChange = this.onResolutionChange.bind(this);
  }

  public componentDidMount() {
    this.fetchData();
  }

  public render() {
    const { err, isLoading, workload } = this.state;

    return (
      <main className="container">
        <div className="row">
          <div className="col-7">
            {isLoading
                ? <p>Loading...</p>
                : <h2>{workload ? workload.name : ''}</h2>}
          </div>
          <div className="col-5">
            <WorkloadsStatusFilter
              className="mt-1"
              onResolutionChange={this.onResolutionChange}
              resolution={this.state.resolution}
              onEndDateChange={this.onEndDateChange}
              endDate={this.state.endDate}
            />
          </div>
        </div>

        <div className="row mt-2">
          <div className="col">
            {err ? <p>{err.message}</p> : null}

            {workload
              ? <WorkloadStatusTable workload={workload} />
              : null
            }
          </div>
        </div>
      </main>
    );
  }

  private onEndDateChange(endDate: Date) {
    this.setState({ endDate }, () => {
      this.fetchData();
    });
  }

  private onResolutionChange(resolution: number) {
    this.setState({ resolution }, () => {
      this.fetchData();
    });
  }

  private fetchData() : Promise<void> {
    this.setState({
      err: undefined,
      isLoading: true,
      workload: undefined
    });

    const { resolution, endDate } = this.state;
    const duration = getDurationByResolution(resolution);
    const startDate = moment(endDate).subtract(duration, 'h').toDate();

    const uri = url.format({
      pathname: `/api/v1/workloads/${this.state.name}/status`,
      query: {
        end: endDate.toISOString(),
        start: startDate.toISOString(),
        statusStep: resolution
      }
    });

    return fetch(uri)
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
