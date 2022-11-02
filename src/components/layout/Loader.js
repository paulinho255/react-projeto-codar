import React from 'react';
import styles from './Loader.module.css'
import loading from '../../img/loading.svg'

const Loader = (props) => {
  return (
    <div className={styles.loader_container}>
    	<img className={styles.loader} src={loading} alt="Loading"/>
    </div>
  )
}

export default Loader;