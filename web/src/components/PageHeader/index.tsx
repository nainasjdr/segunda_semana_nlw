import React from 'react';
import {Link} from 'react-router-dom';
import logoImg from '../../assets/images/logo.svg'
import backIncon from '../../assets/images/icons/back.svg'
import './styles.css';

interface PageHeaderProps{
    title: string; /*obrigatório para não ser obrigatório title:?string; ou valor default*/
    description?:string;// não é obrigatória
}
/*para receber algm parametro*/
const PageHeader:React.FC<PageHeaderProps>=(props)=>(
  
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/">
                    <img src={backIncon} alt="Voltar" />
                </Link>
                <img src={logoImg} alt="Proffy" />
            </div>
            <div className="header-content">
                <strong>{props.title}</strong>
                    {props.description&&<p>{props.description}</p>}
                {props.children}                
            </div>           
        </header>
    
);
export default PageHeader;