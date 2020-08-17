import React, { useState, useEffect } from 'react';
import { View,ScrollView,Text,TextInput } from 'react-native';
import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem,{Teacher} from '../../components/TeacherItem';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons';
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';


function TeacherList(){
    const [isFilterVisible,setsIsFilterVisible]=useState(false);
    const [week_day,setWeek_day]=useState('');
    const [subject,setSubject]=useState('');
    const [time,setTime]=useState('');
    const [teachers, setTeachers] = useState([]);
    const [favorite,setFavorites]=useState<number[]>([]);
    function loadFavorites(){
        AsyncStorage.getItem('favorites').then(response=>{
            if(response){
                const favoritedTeachers=JSON.parse(response);
                const favoritedTeachersIds=favoritedTeachers.map((teacher:Teacher)=>{
                    return teacher.id;
                })
                setFavorites(favoritedTeachersIds);
            }    
            });
    }
    useFocusEffect(
        React.useCallback(() => {
          loadFavorites();
        }, [])
      )
    function handleToggleFiltersVisible(){
        setsIsFilterVisible(!isFilterVisible);
    }
    async function handleFilterSubmit(){
        loadFavorites()
        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        });

        setTeachers(response.data);
        setsIsFilterVisible(!isFilterVisible);
    }
    return(
        <View style={styles.containter}>
            <PageHeader 
                title="Proffs disponíveis"
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name='filter' size={20} color='#FFF'/>

                    </BorderlessButton>
                )}
            >
             {isFilterVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput 
                            placeholderTextColor='#c1bccc'
                            style={styles.input}
                            placeholder='Qual a matéria?'
                            value={subject}
                            onChangeText={text=>setSubject(text)}
                        />                    
                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da Semana</Text>
                                <TextInput 
                                    placeholderTextColor='#c1bccc'
                                    style={styles.input}
                                    placeholder='Qual a dia'
                                    value={week_day}
                                    onChangeText={text=>setWeek_day(text)}
                                />
                            </View>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput 
                                    placeholderTextColor='#c1bccc'
                                    style={styles.input}
                                    placeholder='Qual o horário?'
                                    value={time}
                                    onChangeText={text=>setTime(text)}
                                />
                            </View>
                        </View>
                        <RectButton onPress={handleFilterSubmit} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>
                    </View>
                )}    
            </PageHeader>
            <ScrollView style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal:16,
                    paddingBottom:16,
                }}
            >
                 {teachers.map((teacher:Teacher)=>{
                    return(<TeacherItem 
                        key={teacher.id} 
                        favorited={favorite.includes(teacher.id)}
                        teacher={teacher}/>);
                 })}
                 
            </ScrollView>
            
        </View>
    );
}
export default TeacherList;