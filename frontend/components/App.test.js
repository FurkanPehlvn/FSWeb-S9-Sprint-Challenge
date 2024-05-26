// frontend/components/App.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AppFunctional from "./AppFunctional";

test("Koordinatlar metni ekranda görünüyor", () => {
  render(<AppFunctional />);
  const coordinatesElement = screen.getByText(/Koordinatlar \(\d, \d\)/i);
  expect(coordinatesElement).toBeInTheDocument();
});

test("İlerleme metni ekranda görünüyor", () => {
  render(<AppFunctional />);
  const stepsElement = screen.getByText(/kere ilerlediniz/i);
  expect(stepsElement).toBeInTheDocument();
});

test("SOL butonu ekranda görünüyor", () => {
  render(<AppFunctional />);
  const buttonElement = screen.getByText(/SOL/i);
  expect(buttonElement).toBeInTheDocument();
});

test("YUKARI butonu ekranda görünüyor", () => {
  render(<AppFunctional />);
  const buttonElement = screen.getByText(/YUKARI/i);
  expect(buttonElement).toBeInTheDocument();
});

test("Inputa metin girildiğinde value değişiyor", () => {
  render(<AppFunctional />);
  const inputElement = screen.getByPlaceholderText(/email girin/i);
  fireEvent.change(inputElement, { target: { value: "test@example.com" } });
  expect(inputElement.value).toBe("test@example.com");
});
