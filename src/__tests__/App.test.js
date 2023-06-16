import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as weatherModule from "../weather";
import App from "../App";

const cities = ["Hyderabad", "Rajahmundry", "Lucknow", "Raipur"];

const mockedWeatherData = {
  temp: 25,
  temp_max: 30,
  temp_min: 20,
  description: "Sunny"
};

const mockedRjyData = {
  temp: 25,
  temp_max: 30,
  temp_min: 20,
  description: "Sunny"
};
describe("App", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .spyOn(weatherModule, "default")
      .mockImplementation((city) =>
        Promise.resolve(
          city === "Hyderabad" ? mockedWeatherData : mockedRjyData
        )
      );
  });

  afterEach(() => {});
  it("should render dropdown options for cities", async () => {
    const { getByRole, getByTestId } = render(<App />);
    const dropdown = getByRole("combobox");
    expect(dropdown).toBeInTheDocument();
    expect(dropdown.children.length).toBe(4);
    expect(dropdown.children[0]).toHaveTextContent("Hyderabad");
    expect(dropdown.children[1]).toHaveTextContent("Rajahmundry");
    expect(dropdown.children[2]).toHaveTextContent("Lucknow");
    expect(dropdown.children[3]).toHaveTextContent("Raipur");
    await waitFor(() =>
      expect(weatherModule.default).toHaveBeenCalledWith(cities[0])
    );
    expect(getByTestId("weather-result")).toHaveTextContent(
      `${mockedWeatherData.description}, ${mockedWeatherData.temp}°C (Max ${mockedWeatherData.temp_max}, Min ${mockedWeatherData.temp_min})`
    );
  });

  it("should get weather data and display it on selecting a city", async () => {
    const { getByRole, getByTestId } = render(<App />);
    await waitFor(() =>
      expect(weatherModule.default).toHaveBeenCalledWith(cities[0])
    );
    const select = getByRole("combobox");
    fireEvent.change(select, { target: { value: cities[1] } });
    await waitFor(() =>
      expect(weatherModule.default).toHaveBeenLastCalledWith(cities[1])
    );
    expect(getByTestId("weather-result")).toHaveTextContent(
      `${mockedRjyData.description}, ${mockedRjyData.temp}°C (Max ${mockedRjyData.temp_max}, Min ${mockedRjyData.temp_min})`
    );
  });
});
