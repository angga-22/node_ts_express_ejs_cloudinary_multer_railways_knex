import express, { Request, Response } from "express";

const Dashboard = express.Router();
Dashboard.get("/", (req: Request, res: Response) => {
  const { type, name, message, url } = req.query;
  res.render("dashboard", {
    type,
    name,
    message,
    url
  });
});

export default Dashboard;
