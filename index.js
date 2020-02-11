const express = require('express');

const server = express();

server.use(express.json());

//Constante array projetos
const projects = [];

/*Create a new project
* Body = id and title
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
*with the id present in the route parameters.
* Route params: id
* Request body: title
*/
server.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project);
});

server.listen(3001);