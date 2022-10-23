import React, {useState, useEffect} from 'react';
import styles from './NewProject.module.css'
import Input from '../Forms/Input'
import Select from '../Forms/Select'
import SubmitButton from '../Forms/SubmitButton'

const ProjectForms = ({ btnText }) => {

    /* Usando o hook useState para obter os dados da api json via fetch*/
    const [categories, setCategories] = useState([])

    /* Usando o hook useEffect para fazer a requisição via fetch, e preencher o hook setCategories com o retorno da api */
    useEffect(()=> {

        /* requisição via fetch, informando o endereço da api e o metodo do tipo GET e seu cabeçalho */
        fetch("http://localhost:5000/categories",{
        method: "GET",
        headers: {
            'Content-type': 'application/json'
        }
    }).then((resp)=> resp.json()) /* metodo .then() retorna o json buscado da api */
      .then((data)=> { /* segundo metodo then que retorna os valores consultados na api, e preenche o hook setCategories */
          setCategories(data)
      })  
      .catch((err) => console.log(err)) /*Tratamento de erros, retornado da api. */
  }, [])  

  return (
    <div>
    	<form className={styles.form} >
    		<Input 
                type="text" 
                text="Nome do Projeto"
                name="name"
                placeholder="insira o nome do projeto"
            />
    		<Input 
                type="number" 
                text="Orçamento do projeto"
                name="budjet"
                placeholder="Insira o orçamento total"
            />
    		<Select name="category_id" text="Selecione a categoria" options={categories} /> 
            <SubmitButton text={btnText} />
    	</form>
    	
    </div>
  )
}

export default ProjectForms;