import express from "express";
import { addMovie } from "../controllers/movie-controller";
const movieRouter= express.Router();

movieRouter.post("/",addMovie);
movieRouter.post("/",getMovies);


export default movieRouter;
