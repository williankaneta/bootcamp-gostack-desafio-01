const express = require('express');

const server = express();

//use plugin express json
server.use(express.json());

//Constante array projetos
const projects = [];

//BEGIN MIDDLEWARES
/*Middleware to check according to 
//the given id if the project exists.
*/
function checkExistsProject(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ error: 'The Id Project information not found!' });
  }

  return next();
}

/**
 // Middleware that returns the log in the number of requests 
 */
function logRequests(req, res, next) {

  console.count("Number of requests");

  return next();
}

server.use(logRequests);
//END MIDDLEWARES

//BEGIN CRUD - CREATE, READ, UPDATE, DELETE
/*Create a new project
//Body = id and title
*/
server.post('/projects',(req,res) =>{
  const { id,title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  }

  projects.push(project);
  
  return res.json(projects);
});


//Consulting all projects
server.get('/projects',(req,res) => {
  return res.json(projects);
});

/*Change the title of the project 
//with the id present in the route parameters.
//Route params: id
//Request body: title
*/
server.put('/projects/:id',checkExistsProject,(req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project);
});

/*Delete project
//Route params: id
*/
server.delete('projects/:id',checkExistsProject,(req, res) =>{
  const { id } = req.params;

  const projectPos = projects.find(p => p.id == id);

  projects.splice(projectPos,1);

  return res.send();
  
});

/*Change array task
//The route must receive a title field and store 
//a new task in the task array of a specific
//project chosen through the id present in the 
//route parameters;
//Route params: id
*/
server.post('/projects/:id/tasks',checkExistsProject,(req,res) =>{
  const { id } = req.params;
  const { title }  = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(project);
});
//END CRUD

//defining the acess port in route
server.listen(3001);