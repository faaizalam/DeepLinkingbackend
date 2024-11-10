import express from "express";
import expressAsyncHandler from "express-async-handler";
import { ShareControl } from "../controller/ShareController.js";



export let ShareRouter=express.Router()

ShareRouter.get("/:type/:id",ShareControl)