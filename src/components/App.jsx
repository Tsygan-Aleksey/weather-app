import React from "react";
import { debounce } from "lodash";
import { getCurrentWeather } from "../api";
import { LOAD_STATUSES } from "../constants";
import { Loader } from "../common";
import { TableWeather } from "../common";
import style from "./app.module.css";

export class App extends React.Component {
  state = {
    city: "",
    data: {},
    loadStatus: LOAD_STATUSES.UNKNOWN,
  };

  fetchWeather = (params) => {
    this.setState({ loadStatus: LOAD_STATUSES.LOADING });
    getCurrentWeather(params)
      .then(({ main }) => {
        this.setState({ loadStatus: LOAD_STATUSES.LOADED, data: main });
      })
      .catch(() => {
        this.setState({ loadStatus: LOAD_STATUSES.ERROR, data: {} });
      });
  };
  fetchWeatherDebounced = debounce(this.fetchWeather, 1000);

  componentDidUpdate(_, prevState) {
    if (prevState.city !== this.state.city) {
      this.fetchWeatherDebounced({ city: this.state.city });
    }
  }

  render() {
    return (
      <div className={style.wrapper}>
        <header className={style.header}>
          <span className={style.title}>Введите город</span>
          <input
            value={this.state.city}
            onChange={(event) => {
              this.setState({ city: event.target.value });
            }}
          />
        </header>
        <div>
          {this.state.loadStatus === LOAD_STATUSES.LOADING && <Loader />}
          {this.state.loadStatus === LOAD_STATUSES.ERROR && (
            <span>Попробуйте позже</span>
          )}
          {this.state.loadStatus === LOAD_STATUSES.LOADED && (
            <TableWeather data={this.state.data} />
          )}
        </div>
      </div>
    );
  }
}
