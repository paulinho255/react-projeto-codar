import React from 'react'
import styles from './NewProject.module.css'
import ProjectForms from '../Projects/ProjectForms'
import { useNavigate } from 'react-router-dom'

function NewProject() {

	/* Redirecionar para uma proxima pagina, apos realização de um post na pagina. */
    const history = useNavigate()

    function createPost(project) {
        // Inicialiar o project com um array vazio e cost como 0
        project.cost = 0
        project.services = []

        fetch('http://localhost:5000/projects', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(project),
        }).then((resp) => resp.json())
          .then((data) => {
              console.log(data)
              // redirect
              history('/projects',{message: 'Projeto criado com sucesso.'} )
        }).catch(err => {
            console.log(err)
        })
    }

  return (
    <div className={styles.newproject_container} >
    	<h1>Criar Projeto</h1>
    	<p>Crie seu projeto para depois adicionar os serviços</p>
		<ProjectForms handleSubmit={createPost} btnText="Criar Projeto" />    	

    </div>
  )
}

export default NewProject