import React, { Component } from 'react';

import WorkloadsStatusDate from "./WorkloadsStatusDate"
import WorkloadsStatusResolution from "./WorkloadsStatusResolution"

interface IProps {
  className?: string,
  endDate: Date,
  resolution: number,
  onResolutionChange: (resolution: number) => void,
  onEndDateChange: (date: Date) => void,
}

class WorkloadsStatusFilter extends Component<IProps> {
  constructor(props: IProps) {
    super(props);

    this.onClickNow = this.onClickNow.bind(this);
  }

  public render() {
    const {
      className,
      endDate,
      resolution,
      onResolutionChange,
      onEndDateChange
    } = this.props;

    return (
      <form className={className}>
        <div className="form-row">
          <div className="col-3">
            <WorkloadsStatusResolution
              onChange={onResolutionChange}
              value={resolution}
            />
          </div>
          <div className="col-7">
            <WorkloadsStatusDate
              onChange={onEndDateChange}
              value={endDate}
            />
          </div>
          <div className="col-2">
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={this.onClickNow}
            >
              Now
            </button>
          </div>
        </div>
      </form>
    );
  }

  private onClickNow(): void {
    const now = new Date();
    this.props.onEndDateChange(now);
  }
}

export default WorkloadsStatusFilter;
