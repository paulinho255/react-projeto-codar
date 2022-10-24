import React from 'react';
import styles from './Message.module.css'
import { useState, useEffect } from 'react'

const Message = ({ type, msg }) => {
	const [visible, setVisible] = useState(false)
	/* Componente Message.js generico para exibir mensagens de retorno das operações de crud da aplicação */

	useEffect(() => {
		if(!msg) {
			setVisible(false)
			return
		}
		setVisible(true)
		const timer = setTimeout(() => {
			setVisible(false)			
		}, 3000)

		return () => clearTimeout(timer)
	},[msg])

	return (
		<>
			{ visible && (
				<div className={`${styles.message} ${styles[type]}`}>{msg}</div> 
				)}
			</>
			)
}

export default Message;