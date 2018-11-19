
import moment from "moment";
import React, { Component } from 'react';
import url from "url";

import WorkloadsStatusResolution, {
  defaultResolution,
  getDurationByResolution
} from "./WorkloadsStatusResolution"
import WorkloadStatusTable from "./WorkloadStatusTable"
import { IWorkloadStatus } from "./workloadTypes"

import "./WorkloadsStatusPage.css"

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
  resolution: number,
  workload?: IWorkloadStatus
}

class WorkloadsStatusPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      err: undefined,
      isLoading: true,
      name: props.match.params.name,
      resolution: defaultResolution,
      workload: undefined
    };

    this.onResolutionChange = this.onResolutionChange.bind(this);
  }

  public componentDidMount() {
    this.fetchData();
  }

  public render() {
    const { err, isLoading, workload } = this.state;

    const startDate = workload && workload.statuses &&
      workload.statuses.length ?
      moment(workload.statuses[0].date).format('MMMM Do YYYY')
      : null;

    return (
      <div className="row">
        <div className="col-12">
          <h1>Workload Status</h1>

          <WorkloadsStatusResolution
            onChange={this.onResolutionChange}
            value={this.state.resolution}
          />

          {isLoading ? <p>Loading...</p> : null}
          {err ? <p>{err.message}</p> : null}

          {workload ?
            <div>
              <h2>{workload.name}</h2>
              <WorkloadStatusTable workload={workload} />
            </div>
            : null
          }
        </div>
      </div>
    );
  }

  private onResolutionChange(event: React.FormEvent<HTMLSelectElement>) {
    this.setState({ resolution: Number(event.currentTarget.value) }, () => {
      this.fetchData();
    });
  }

  private fetchData() : Promise<void> {
    this.setState({
      err: undefined,
      isLoading: true,
      workload: undefined
    });

    const { resolution } = this.state;
    const duration = getDurationByResolution(resolution);
    const end = new Date();
    const start = moment(end).subtract(duration, 'h').toDate();

    const uri = url.format({
      pathname: `/api/v1/workloads/${this.state.name}/status`,
      query: {
        end: end.toISOString(),
        start: start.toISOString(),
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
