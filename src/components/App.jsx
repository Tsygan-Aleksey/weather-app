import React from "react";
import { debounce } from "lodash";
import { Loader } from "../common";
import { TableWeather } from "../common";
import style from "./app.module.css";
import { connect } from "react-redux";
import { WeatherSelectors } from "../store";
import { WeatherAC } from "../store";

class AppOriginal extends React.Component {
  state = {
    city: "123",
  };

  fetchWeatherDebounced = debounce(this.props.getWeather, 1000);

  componentDidMount() {
    this.props.getWeather(this.state.city);
  }

  componentDidUpdate(_, prevState) {
    if (prevState.city !== this.state.city) {
      this.fetchWeatherDebounced({ city: this.state.city });
    }
  }

  render() {
    const { data, isLoading, isError, isLoaded } = this.props;
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
            {isLoading && <Loader />}
            {isError && <span>Попробуйте позже</span>}
            {isLoaded && <TableWeather data={data} />}
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: WeatherSelectors.getWeather(state),
    isLoading: WeatherSelectors.isLoading(state),
    isError: WeatherSelectors.isError(state),
    isLoaded: WeatherSelectors.isLoaded(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getWeather: (city) => dispatch(WeatherAC.fetchWeather(city))
  };
};

export const App = connect(mapStateToProps, mapDispatchToProps)(AppOriginal);
