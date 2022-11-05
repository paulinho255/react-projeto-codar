import React from 'react';
import styles from '../Projects/ProjectCard.module.css'
import {BsFillTrashFill} from 'react-icons/bs'

const ServiceCard = ({id, name, cost, description, handleRemove}) => {
	function remove() {
		
	}
  return (
    <div className={styles.project_card} >
    	<h4>{name}</h4>
    	<p>
    		<span>Custo total:</span> R${cost}
    	</p>
    	<p>{description}</p>
    	<div className={styles.project_card_actions}>
    		<button onClick={remove}>
    			<BsFillTrashFill />
    			Excluir		
    		</button>
    	</div>
    </div>
  )
}

export default ServiceCard;