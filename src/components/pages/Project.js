import React from 'react';
import {parse, v4 as uuid4 } from 'uuid'
import styles from './Project.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loader from '../layout/Loader'
import Container from '../layout/Container'
import ProjectForms from '../Projects/ProjectForms'
import Message from '../layout/Message'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'

const Project = (props) => {
	const { id } = useParams()
	
	const [project, setProject]	= useState([])
	const [services, setServices] = useState([])
	const [showProjectForm, setShowProjectForm] = useState(false)
	const [showServiceForm, setShowServiceForm] = useState(false)
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

	function createService(project) {
		// pegar o ultimo servico
		setMessage('')
		const lastService = project.services[project.services.length -1 ]
		lastService.id = uuid4()
		const lastServiceCost = lastService.cost
		const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

		// maximum value validation
		if (newCost > parseFloat(project.budjet)){
			setMessage('Orçamento ultrapassado, verifique o valor do serviço')
			setType('error')
			project.services.pop()
			return false
		}

		// add service cost to project total cost	
		project.cost = newCost

		fetch(`http://localhost:5000/projects/${project.id}`, {
			method: 'PATCH',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(project),
		}).then((resp) => resp.json())
		.then((data) => {
			setServices(data.services)
			setShowServiceForm(false)
			})
		.catch(err => console.log(err))
	}

	function editPost(project) {
		setMessage('')
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

	function removeService(id, cost) {
		const servicesUpdated = project.services.filter(
			(service) => service.id !== id
		)
		const projectUpdated = project
		projectUpdated.services = servicesUpdated
		projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

		fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
			method: 'PATCH',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(projectUpdated)
		}).then((resp) => resp.json())
		  .then((data) => {
		  	setProject(projectUpdated)
		  	setServices(servicesUpdated)
		  	setMessage('Serviço removido com sucesso.')
		  	setType('success')
		  })	
		.catch(err => console.log())
	}

	function toggleProjectForm() {
		setShowProjectForm(!showProjectForm)
	}
	function toggleServiceForm() {
		setShowServiceForm(!showServiceForm)
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
							<div className={styles.service_form_container}>
								<h2>Adicione um serviço:</h2>
								<button onClick={toggleServiceForm} className={styles.btn} >
									{!showServiceForm ? 'Adicionar Serviço' : 'Fechar'}	
								</button>
								<div className={styles.project_info}>
									{showServiceForm && ( <ServiceForm handleSubmit={createService} 
																		btnText='Adicionar Serviço' 
																		projectData={project} /> 
									)}
								</div>
							</div>
							<h2>Serviços</h2>
							<Container customClass='start'>
								{services.length > 0 && 
									services.map((service) => (
										<ServiceCard 
											id={service.id}
											name={service.name}
											cost={service.cost}
											description={service.description}
											key={service.id}
											handleRemove={removeService}
										/>
											
										))
								}
								{services.length === 0 && <p>Não ha serviços cadastrados.</p>}
							</Container>
						</Container> 
					</div> ) : ( <Loader /> )}
			</>
			)
}

export default Project;