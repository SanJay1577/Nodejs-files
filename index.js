// const express = require('express'); //3rd part pacakge
// const {MongoClient} = require("mongodb");
import express from "express";
import {MongoClient} from "mongodb";
import dotenv from "dotenv"
import { getMovies, postMovie, filterById, deleteMovieById } from "./helper.js"; // inde we have to import and export in .js files 
dotenv.config();
console.log(process.env)
const app = express();
const PORT = process.env.PORT; 
const movies = [
    {
    "id": "104",
    "name": "Interstellar",
    "poster": "https://m.media-amazon.com/images/I/A1JVqNMI7UL._SL1500_.jpg",
    "rating": 8.6,
    "summary": "When Earth becomes uninhabitable in the future, a farmer and ex-NASA\n pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team\n of researchers, to find a new planet for humans.",
    "trailer": "https://www.youtube.com/embed/zSWdZVtXT7E",
    "language": "english"
    },
    {
    "id": "100",
    "name": "Iron man 2",
    "poster": "https://m.media-amazon.com/images/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_FMjpg_UX1000_.jpg",
    "rating": 7,
    "summary": "With the world now aware that he is Iron Man, billionaire inventor Tony Stark (Robert Downey Jr.) faces pressure from all sides to share his technology with the military. He is reluctant to divulge the secrets of his armored suit, fearing the information will fall into the wrong hands. With Pepper Potts (Gwyneth Paltrow) and Rhodes (Don Cheadle) by his side, Tony must forge new alliances and confront a powerful new enemy.",
    "trailer": "https://www.youtube.com/embed/wKtcmiifycU",
    "language": "english"
    },
    {
    "id": "101",
    "name": "No Country for Old Men",
    "poster": "https://upload.wikimedia.org/wikipedia/en/8/8b/No_Country_for_Old_Men_poster.jpg",
    "rating": 8.1,
    "summary": "A hunter's life takes a drastic turn when he discovers two million dollars while strolling through the aftermath of a drug deal. He is then pursued by a psychopathic killer who wants the money.",
    "trailer": "https://www.youtube.com/embed/38A__WT3-o0",
    "language": "english"
    },
    {
    "id": "102",
    "name": "Jai Bhim",
    "poster": "https://m.media-amazon.com/images/M/MV5BY2Y5ZWMwZDgtZDQxYy00Mjk0LThhY2YtMmU1MTRmMjVhMjRiXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg",
    "summary": "A tribal woman and a righteous lawyer battle in court to unravel the mystery around the disappearance of her husband, who was picked up the police on a false case",
    "rating": 8.8,
    "trailer": "https://www.youtube.com/embed/nnXpbTFrqXA",
    "language": "tamil"
    },
    {
    "id": "103",
    "name": "The Avengers",
    "rating": 8,
    "summary": "Marvel's The Avengers (classified under the name Marvel Avengers\n Assemble in the United Kingdom and Ireland), or simply The Avengers, is\n a 2012 American superhero film based on the Marvel Comics superhero team\n of the same name.",
    "poster": "https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_crd_05.jpg",
    "trailer": "https://www.youtube.com/embed/eOrNdBpGMv8",
    "language": "english"
    },
    
    {
    "id": "105",
    "name": "Baahubali",
    "poster": "https://flxt.tmsimg.com/assets/p11546593_p_v10_af.jpg",
    "rating": 8,
    "summary": "In the kingdom of Mahishmati, Shivudu falls in love with a young warrior woman. While trying to woo her, he learns about the conflict-ridden past of his family and his true legacy.",
    "trailer": "https://www.youtube.com/embed/sOEg_YZQsTI",
    "language": "telugu"
    },
    {
    "id": "106",
    "name": "Ratatouille",
    "poster": "https://resizing.flixster.com/gL_JpWcD7sNHNYSwI1ff069Yyug=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzLzc4ZmJhZjZiLTEzNWMtNDIwOC1hYzU1LTgwZjE3ZjQzNTdiNy5qcGc=",
    "rating": 8,
    "summary": "Remy, a rat, aspires to become a renowned French chef. However, he fails to realise that people despise rodents and will never enjoy a meal cooked by him.",
    "trailer": "https://www.youtube.com/embed/NgsQ8mVkN8w",
    "language": "english"
    }
    ]
    
// const MONGO_URL ="mongodb://localhost"
const MONGO_URL =process.env.MONGO_URL; 
async function createConnection(){
    const client = new MongoClient(MONGO_URL)
    await client.connect();
    console.log("mongo is connected");
    return client;
}

export const client = await createConnection();
//interceptor:
app.use(express.json()); 
//express.json is the inbuild middleware 
app.get("/", (request, response)=>{
    response.send("Hello World, Happy new Year")
});

// app.get("/movies", (request, response)=>{
//     const {language, rating} = request.query // reques.query to specify the things next to ? in url
//     console.log(request.query, language); // after the url type ? to get the requst 
//     let filteredMovies = movies;
//     if(language){
//         filteredMovies= filteredMovies.filter((mv)=> mv.language === language);
//     // response.send(movies.filter((mv)=> mv.language === language));
//          }
       
//          if(rating){
//             filteredMovies= filteredMovies.filter((mv)=> mv.rating == rating);
//             //since rating is string we use ==
//              }

//     // response.send(movies); to get all the movies 
//     response.send(filteredMovies); 
// }); 

app.get("/movies", async (request, response)=>{

    if(request.query.rating){
        request.query.rating = +request.query.rating;
    }
    console.log(request.query);
    const movie = await getMovies(request); // to convert from cursor to array to load the data.
    response.send(movie); 
}); 



app.post("/movies", async (request, response)=>{ //`we need to use express.json as a middle ware to tell the postman it's a jason data that is inserted in the above creteConnection
    const newMovies = request.body;
    console.log(newMovies);
    const result = await postMovie(newMovies);
    response.send(result); 
}); 

app.get("/movies/:id", async (request, response)=>{
    const {id} = request.params;
    console.log(id);
    // const movie = movies.filter((mv)=> mv.id === id); 
    // the above code will filter with an array

    // const movie = movies.filter((mv)=> mv.id === id)[0];
    //the above code will filer the value with exactly the object 

    // const movie = movies.find((mv)=> mv.id === id); 
    //fins tag will get the object without use of filter: 
    const movie = await filterById(id);

    console.log(request.params); 
    movie 
    ? response.send(movie) 
    : response.status(404).send({message: "No movies found"});

}); 

app.delete("/movies/:id", async (request, response)=>{
    const {id} = request.params;
    console.log(id);

    const movie = await deleteMovieById(id);

    console.log(request.params); 
    response.send(movie);

}); 

app.listen(PORT, ()=>console.log(`Server Started : localhost:${PORT}
                                  Movies Port     : localhost:${PORT}/movies`)); 



