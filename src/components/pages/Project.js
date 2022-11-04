import React from 'react';
import styles from './Project.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loader from '../layout/Loader'
import Container from '../layout/Container'
import ProjectForms from '../Projects/ProjectForms'
import Message from '../layout/Message'

const Project = (props) => {
	const { id } = useParams()
	
	const [project, setProject]	= useState([])
	const [showProjectForm, setShowProjectForm] = useState(false)
	const [message, setMessage] = useState()
	const [type, setType] = useState()

	useEffect(() => {

		setTimeout(() => {
			fetch(`http://localhost:5000/projects/${id}`,{
				method: 'GET',
				headers: {
					'Content-type': 'application/json',
				},
			})
			.then((resp) => resp.json())
			.then((data) => {
				setProject(data)
			})
			.catch(err => console.log(err))
		}, 1000)		
	},[id] ) 

	function editPost(project) {
		// fazer o budjet validation
		if (project.budjet < project.cost) {
			setMessage('O orçamento não pode ser menor que o custo do projeto!')
			setType('error')
			return false
		}

		console.log(project)

		fetch(`http://localhost:5000/projects/${project.id}`,{
			method: 'PATCH',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(project),
		}).then(resp => resp.json())
		.then((data) => {
			setProject(data)
			setShowProjectForm(false)
			setMessage('Projeto atualizado.')
			setType('success')
		})	
		.catch(err => console.log(err))	
	}

	function toggleProjectForm() {
		setShowProjectForm(!showProjectForm)
	}

	return (
		<>
			{project.name ? ( 
				<div className={styles.project_details} > 
					<Container customClass='column'>
						{message && <Message type={type} msg={message}/>}
						<div className={styles.detail_container}>
							<h1>Projeto: {project.name} </h1>
							<button onClick={toggleProjectForm} className={styles.btn} >
								{!showProjectForm ? 'Editar Projeto' : 'Fechar'}	
							</button>
							{!showProjectForm ? (
								<div className={styles.project_info} >
									<p>
										<span>Categoria:</span> {project.category.name}
									</p>
									<p>
										<span>Total de orçamento:</span> {project.budjet}
									</p>
									<p>
										<span>Total Utilizado: </span> {project.cost}
									</p>
								</div> ) : ( <div className={styles.project_info}>
									<ProjectForms handleSubmit={editPost} btnText='Concluir edição' projectData={project} />
								</div>	
								)}
							</div>
						</Container> 
					</div> ) : ( <Loader /> )}
			</>
			)
}

export default Project;