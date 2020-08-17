import React, {useState, FormEvent} from 'react';
import PageHeader from '../../components/PageHeader';
import './styles.css';
import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../routes';
import{useHistory}from 'react-router-dom';
function TeacherForm(){
    const history=useHistory();
    const [name,setName]=useState('');
    const [avatar,setAvatar]=useState('');
    const [whatsapp,setWhatsapp]=useState('');
    const [bio,setBio]=useState('');
    const [subject,setSubject]=useState('');
    const [cost,setCost]=useState('');
    const [sheduleItems,setSheduleItems]= useState([
        {week_day:0, from:'', to: ''},      
    ]);
    

    function addNewSheduleItem(){
        setSheduleItems([
            ...sheduleItems,
            {
                week_day: 0,
                from:'',
                to:''
            }
        ]);        
    }
    function setSheduleItemValue(position:number,field:string,value:string){
        const newArray= sheduleItems.map((sheduleItem,index)=>{
            if(index===position){
                return{...sheduleItem,[field]:value};
            }
            return sheduleItem;           
        });
        setSheduleItems(newArray);

    }
    function handleCreateClass(e:FormEvent){
        e.preventDefault();
        api.post('classes',{
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost:Number(cost),
            schedule:sheduleItems
        }).then(()=>{
            alert('Cadastro realizado com sucesso');
            history.push('/');
        }).catch(()=>{
            alert('Erro no cadastro')
        })
    }
    
    
    return(
        <div id="page-teacher-form" className="container">
            <PageHeader title="Que incrível que você quer dar aulas."
            description='O primeiro passo é preencher esse formulario de inscrição'
            />
            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input 
                            name="name" label="Nome Completo" value={name}
                            onChange={(e)=>{setName(e.target.value)}}
                        />
                        <Input 
                            name="avatar" label="Avatar" value={avatar}
                            onChange={(e)=>{setAvatar(e.target.value)}}
                        />
                        <Input
                            name="whatsapp" label="Whatsapp" value={whatsapp}
                            onChange={(e)=>{setWhatsapp(e.target.value)}}
                        />  
                        <Textarea
                            name="bio" label="Biográfia" value={bio}
                            onChange={(e)=>{setBio(e.target.value)}}
                        />                
                    </fieldset>
                    <fieldset>
                        <legend>Sobre a Aula</legend>
                            <Select name="subject" 
                            label="Matéria"
                            
                            options={[
                                {value:'Artes', label:'Artes'},
                                {value:'Biológia', label:'Biológia'},
                                {value:'Matemática', label:'Matemática'},
                                {value:'Química', label:'Química'},
                                {value:'Física', label:'Física'},
                                {value:'História', label:'História'},
                                {value:'Geográfia', label:'Geográfia'},
                                {value:'Filosófia', label:'Filósofia'}
                            ]}
                            value={subject}
                            onChange={(e)=>{setSubject(e.target.value)}}
                            />
                            
                            <Input 
                                name="cost" label="Custo da sua hora por aula"
                                value={cost}
                                onChange={(e)=>{setCost(e.target.value)}}
                            />                        
                    </fieldset>
                    <fieldset>
                        <legend>Horários Disponíveis
                            <button type="button" onClick={addNewSheduleItem}>
                                + Novo horário
                            </button>
                        </legend>
                        {sheduleItems.map((sheduleItem,index)=>{

                            return(
                                <div key={sheduleItem.week_day} className="schedule-item">
                                    <Select name="week_day" 
                                        label="Dia da Semana"
                                        onChange={e=>setSheduleItemValue(index,'week_day',e.target.value)}
                                        options={[
                                            { value: '0', label: 'Domingo' },
                                            { value: '1', label: 'Segunda-feira' },
                                            { value: '2', label: 'Terça-feira' },
                                            { value: '3', label: 'Quarta-feira' },
                                            { value: '4', label: 'Quinta-feira' },
                                            { value: '5', label: 'Sexta-feira' },
                                            { value: '6', label: 'Sábado' }
                                                        
                                        ]}
                                        value={sheduleItem.week_day}
                                        />  
                                    <Input 
                                        name="from" label="Das" type="time"
                                        onChange={e=>setSheduleItemValue(index,'from',e.target.value)}
                                        value={sheduleItem.from}
                                    /> 
                                    <Input 
                                        name="to" label="até" type="time"
                                        onChange={e=>setSheduleItemValue(index,'to',e.target.value)}
                                        value={sheduleItem.to}
                                    />
                                </div>
                            );
                        })}
                        
                        
                    </fieldset>
                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso Importante"/>
                            Importante<br/>
                            Preencha todos os dados
                        </p>
                        <button type="submit">
                            Salvar cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    );
}
export default TeacherForm