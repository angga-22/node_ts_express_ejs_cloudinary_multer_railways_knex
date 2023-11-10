import express, { Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import upload from "../config/multer";
import { JSONResponse, Car } from "../interfaces/";
import { STATUS_CODE } from "../constants/";
import carModel from "../models/carModel";
const Cars = express.Router();

const addCarHandler = async (req: Request, res: Response) => {
  const fileBase64: string | undefined = req.file?.buffer.toString("base64");
  const fileData: string = `data:${req.file?.mimetype};base64,${fileBase64}`;
  const imageID = Math.floor(Math.random() * 101);
  try {
    let imageUrl: string = ``;
    await cloudinary.uploader.upload(
      fileData,
      { public_id: `${imageID}` },
      (error: unknown, result: any) => {
        if (error) {
          const response: JSONResponse = {
            status: STATUS_CODE[400],
            messages: "Failed to upload image"
          };
          res.status(400).json(response);
          return;
        }
        imageUrl = result.url;
      }
    );
    const carData: Car = {
      name: req.body.carName,
      rentPrice: req.body.rentPrice,
      imageUrl,
      startRent: new Date(),
      finishRent: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    await carModel.addCar(carData);
    const response: JSONResponse = {
      status: STATUS_CODE[201],
      messages: "Successfully adding car"
    };
    res.status(201).json(response);
  } catch (error) {
    const response: JSONResponse = {
      status: STATUS_CODE[500],
      messages: "Error uploading image to Cloudinary:"
    };
    res.status(500).json(response);
  }
};

Cars.get("/", async (req: Request, res: Response) => {
  const { type, name, message, url } = req.query;
  res.render("cars", {
    type,
    name,
    message,
    url
  });
});

Cars.get("/list", async (req: Request, res: Response) => {
  try {
    const { name } = req.query;
    if (name) {
      const searchData = await carModel.searchCar(name.toString());
      if (req.accepts("json")) {
        res.status(200).json({ data: searchData });
      }
    } else {
      const data = await carModel.getCars();
      if (req.accepts("json")) {
        res.status(200).json({ data });
      }
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

Cars.delete("/delete/:id", async (req: Request, res: Response) => {
  const data = await carModel.deleteCar(+req.params.id);
  if (req.accepts("json")) {
    res.status(200).json({ data });
  }
});

Cars.post("/", upload.single("imageUrl"), addCarHandler);

export default Cars;
