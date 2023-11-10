import { knexBuilder } from "../config/knexBuilder";
const getOrders = async () => {
  return knexBuilder.select("*").from("orders");
};
export default {
  getOrders
};
