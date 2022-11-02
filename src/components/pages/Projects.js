import React, {useState, useEffect} from 'react'
import Message from '../layout/Message'
import { useLocation } from 'react-router-dom'
import styles from './Projects.module.css'
import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'
import ProjectCard from '../Projects/ProjectCard'
import Loader from '../layout/Loader'

function Projects() {
	const [projects, setProjects] = useState([])
	const [removeLoading, setRremoveLoading] = useState(false)

	/* Componente Projects.js para apresentação das mensagens e edição dos projetos criados em newproject.js */
	const location = useLocation()
	let message = ''
	if (location.state) {
		message = location.state.message
	}

	useEffect(() => {
		setTimeout(() => {
			fetch('http://localhost:5000/projects',{
				method: 'GET',
				headers: {
					'Content-type': 'application/json'
				},
			}).then((resp) => resp.json())
			.then((data) => 
				{
					setProjects(data)
					setRremoveLoading(true)
				})
			.catch((err) => console.log(err))	
		},1000)

	}, [])

	return (
		<div className={styles.project_container} >
			<div className={styles.title_container} >
				<h1>Meus Projetos</h1>
				<LinkButton to='/newProject' text='Criar Projeto' />
			</div>
			{ message && <Message type="success" msg={message}/>}
			<Container customClass="start" >
				{projects.length > 0 && projects.map((project) => (
					<ProjectCard id={project.id} 
						name={project.name} 
						budjet={project.budjet} 
						category={project.category.name} 
						key={project.id} />
						))}
				{!removeLoading && <Loader/>}
				{removeLoading && projects.length === 0 && (
					<p>Não ha projetos cadastrados.</p>
					)}
			</Container>
			</div>

			)
}

export default Projects