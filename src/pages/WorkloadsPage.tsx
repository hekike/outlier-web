import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { IWorkload } from "../types/workloadTypes"

interface IProps {}

interface IState {
  err?: Error,
  isLoading: boolean,
  workloads: IWorkload[]
}

interface IFetchResponse {
  workloads: IWorkload[]
}

class WorkloadsPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      err: undefined,
      isLoading: false,
      workloads: []
    };
  }

  public componentDidMount() {
    this.fetchData();
  }

  public render() {
    const { isLoading, err, workloads } = this.state;

    return (
      <main className="container">
        <div className="row">
          <div className="col-12">
            {isLoading ? <p>Loading...</p> : null}
            {err ? <p>{err.message}</p> : null}

            <div className="list-group">
              {workloads.map((workload) =>
                <Link
                  to={`/workloads/${workload.name}`}
                  className="list-group-item list-group-item-action"
                  key={workload.name}>
                {workload.name}
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
    );
  }

  private fetchData() : Promise<void> {
    this.setState({
      err: undefined,
      isLoading: true
    });

    return fetch('/api/v1/workloads')
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch resource: " + response.statusText);
        }
        return response.json()
      })
      .then((response: IFetchResponse) => {
        this.setState({
          err: undefined,
          isLoading: false,
          workloads: response.workloads
        });
      })
      .catch((err) => {
        this.setState({
          err,
          isLoading: false,
          workloads: []
        });
      });
  }
}

export default WorkloadsPage;
