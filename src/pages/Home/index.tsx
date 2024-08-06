import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import {
  fetchWeatherData,
  fetchHourlyData,
} from "../../redux/slices/weatherSlice";
import { Button, Table, Card, Typography, Spin, Input } from "antd";
import debounce from "lodash.debounce";

const { Text } = Typography;

const Home: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { weatherData, hourlyData, loading, error } = useSelector(
    (state: RootState) => state.weather
  );
  const [location, setLocation] = useState<string>("");
  const [showHourlyData, setShowHourlyData] = useState<boolean>(false);
  useEffect(() => {
    if (weatherData) {
      dispatch(fetchHourlyData(weatherData.location.name));
      const weatherCondition = weatherData.current.condition.text;
      let backgroundImage = 'url("img/clear.gif")';
      switch (weatherCondition) {
        case "Snow":
          backgroundImage =
            'url("https://mdbgo.io/ascensus/mdb-advanced/img/snow.gif")';
          break;
        case "Partly Cloudy":
        case "Cloudy":
          backgroundImage =
            'url("https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif")';
          break;
        case "Mist":
        case "Fog":
          backgroundImage =
            'url("https://mdbgo.io/ascensus/mdb-advanced/img/fog.gif")';
          break;
        case "Light drizzle":
        case "Patchy rain nearby":
        case "Light rain shower":
        case "Moderate or heavy rain shower":
          backgroundImage =
            'url("https://mdbgo.io/ascensus/mdb-advanced/img/rain.gif")';
          break;
        case "Clear":
          backgroundImage =
            'url("https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif")';
          break;
        case "Patchy light rain in area with thunder":
          backgroundImage =
            'url("https://mdbgo.io/ascensus/mdb-advanced/img/thunderstorm.gif")';
          break;
        default:
          backgroundImage =
            'url("https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif")';
          break;
      }
      document.getElementById("wrapper-bg")!.style.backgroundImage =
        backgroundImage;
    }
  }, [weatherData, dispatch]);
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
    debouncedFetchWeatherData(e.target.value);
  };

  const debouncedFetchWeatherData = useCallback(
    debounce((location: string) => {
      dispatch(fetchWeatherData(location));
    }, 500),
    [dispatch]
  );

  useEffect(() => {
    console.log(weatherData);

    if (weatherData) {
      dispatch(fetchHourlyData(weatherData.location.name));
    }
  }, [weatherData, dispatch]);

  useEffect(() => {
    dispatch(fetchWeatherData(location));
  }, []);

  const handleShowHourlyData = () => {
    setShowHourlyData(true);
    if (weatherData) {
      dispatch(fetchHourlyData(weatherData.location.name));
    }
  };

  const columns: any = [
    {
      title: "Hour",
      dataIndex: "time",
      align: "center",
      key: "time",
    },

    {
      title: "Temperature",
      dataIndex: "temp_c",
      key: "temp_c",
      align: "center",
      render: (text: number) => `${text}°C`,
    },
    {
      title: "Wind",
      dataIndex: "wind_kph",
      key: "wind_kph",
      align: "center",
      render: (text: number) => `${text}km/h`,
    },
    {
      title: "Rain",
      dataIndex: "precip_mm",
      key: "precip_mm",
      align: "center",
      render: (text: number) => `${text}%`,
    },
    {
      title: "Condition",
      dataIndex: "condition",
      key: "condition",
      align: "center",
      render: (condition: any) => (
        <div>
          <Text>{condition.text}</Text>
          <img src={condition.icon} alt="" className="condition-icon" />
        </div>
      ),
    },
  ];

  return (
    <div className="home-container">
      <section className="vh-100">
        <div className="container py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-7 col-xl-5">
              <Input
                type="text"
                value={location}
                onChange={handleLocationChange}
                placeholder="Lokasiya daxil edin..."
                className="search-input"
              />
              <p></p>
              <Card
                className="text-white bg-image shadow-4-strong"
                id="wrapper-bg"
              >
                <div className="card-header p-4 border-0">
                  <div className="text-center mb-3">
                    <p className="h2 mb-1" id="wrapper-name">
                      {weatherData?.location.name},{" "}
                      {weatherData?.location.country}
                    </p>
                    <p className="mb-1" id="wrapper-description">
                      {weatherData?.current.condition.text}
                    </p>
                    <p className="display-1 mb-1" id="wrapper-temp">
                      {weatherData?.current.temp_c}°C
                    </p>
                    <span>
                      Pressure:{" "}
                      <span id="wrapper-pressure">
                        {weatherData?.current.pressure_mb} hPa
                      </span>
                    </span>
                    <span className="mx-2">|</span>
                    <span>
                      Humidity:{" "}
                      <span id="wrapper-humidity">
                        {weatherData?.current.humidity}%
                      </span>
                    </span>
                    <div className="weather-icon-container">
                      <img
                        src={weatherData?.current.condition.icon}
                        alt=""
                        className="weather-icon"
                      />
                    </div>
                    <Button
                      onClick={handleShowHourlyData}
                      disabled={loading || !weatherData}
                      type="dashed"
                      style={{ marginTop: 16 }}
                    >
                      {loading ? <Spin size="small" /> : "Daha Ətraflı"}
                    </Button>
                  </div>
                </div>
              </Card>
              <p></p>
            </div>
          </div>
          {showHourlyData && hourlyData.length > 0 && (
            <div className="card-body px-5">
              <Table
                columns={columns}
                bordered={true}
                dataSource={hourlyData}
                rowKey="time"
                pagination={false}
                className="weather-table"
              />
            </div>
          )}
        </div>
      </section>
      {error && <Text type="danger">Error: {error}</Text>}
    </div>
  );
};

export default Home;
