import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import {
  fetchWeatherData,
  fetchHourlyData,
} from "../../redux/slices/weatherSlice";
import { Button, Table, Card, Typography, Spin, Input } from "antd";
import * as lodash from "lodash";

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
    lodash.debounce((location: string) => {
      dispatch(fetchWeatherData(location));
    }, 500),
    [dispatch]
  );

  useEffect(() => {
    dispatch(fetchWeatherData(location));
  }, []);

  const handleShowHourlyData = () => {
    setShowHourlyData(!showHourlyData);
    if (weatherData && !showHourlyData) {
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
        <div className="tablecondition">
          <Text>{condition.text}</Text>
          <img src={condition.icon} alt="" />
        </div>
      ),
    },
  ];

  return (
    <div>
      <section>
        <div>
          <div>
            <div className="center">
              <Input
                type="text"
                value={location}
                onChange={handleLocationChange}
                placeholder="Lokasiya daxil edin..."
              />
              <p></p>
              <Card id="wrapper-bg">
                <div>
                  <div>
                    <p>
                      {weatherData?.location.name},{" "}
                      {weatherData?.location.country}
                    </p>
                    <p>{weatherData?.current.condition.text}</p>
                    <p className="temperature">
                      {weatherData?.current.temp_c}°C
                    </p>
                    <span>
                      Pressure:{" "}
                      <span id="wrapper-pressure">
                        {weatherData?.current.pressure_mb} hPa
                      </span>
                    </span>
                    <span>|</span>
                    <span>
                      Humidity:{" "}
                      <span id="wrapper-humidity">
                        {weatherData?.current.humidity}%
                      </span>
                    </span>
                    <div>
                      <img src={weatherData?.current.condition.icon} />
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
            <div>
              <Table
                columns={columns}
                bordered={true}
                dataSource={hourlyData}
                rowKey="time"
                pagination={false}
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
