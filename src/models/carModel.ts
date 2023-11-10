import { Car } from "../interfaces";
import { knexBuilder } from "../config/knexBuilder";

const addCar = async (car: Car) => {
  return knexBuilder("cars").insert(car).returning("id");
};

const searchCar = async (name: string) => {
  return knexBuilder
    .select("*")
    .from("cars")
    .whereRaw("LOWER(name) = LOWER(?)", name);
};

const getCars = async () => {
  return knexBuilder.select("*").from("cars");
};

const deleteCar = async (id: number) => {
  return knexBuilder("cars").where({ id }).del();
};

export default {
  deleteCar,
  searchCar,
  addCar,
  getCars
};
