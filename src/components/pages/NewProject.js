import React from 'react'
import styles from './NewProject.module.css'
import ProjectForms from '../Projects/ProjectForms'

function NewProject() {
  return (
    <div className={styles.newproject_container} >
    	<h1>Criar Projeto</h1>
    	<p>Crie seu projeto para depois adicionar os serviços</p>
		<ProjectForms btnText="Criar Projeto" />    	

    </div>
  )
}

export default NewProject