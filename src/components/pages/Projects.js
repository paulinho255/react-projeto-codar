import React from 'react'
import Message from '../layout/Message'
import { useLocation } from 'react-router-dom'

function Projects() {
	/* Componente Projects.js para apresentação das mensagens e edição dos projetos criados em newproject.js */
	const location = useLocation()
	let message = ''
	if (location.state) {
		message = location.state.message
	}

	return (
		<div>
			<h1>Projects</h1>
			{ message && <Message type="success" msg={message}/>}
			</div>
			)
}

export default Projects