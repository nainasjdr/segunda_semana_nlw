import React, { useState, useEffect } from 'react';
import { View,ScrollView } from 'react-native';
import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem,{Teacher} from '../../components/TeacherItem';
import AsyncStorage from '@react-native-community/async-storage';
import {useFocusEffect} from '@react-navigation/native';
function Favorites(){
    const [favorite,setFavorites]=useState([]);
    function loadFavorites(){
        AsyncStorage.getItem('favorites').then(response=>{
            if(response){
                const favoritedTeachers=JSON.parse(response);
               
                setFavorites(favoritedTeachers);
            }    
            });
    }
    useFocusEffect(
        React.useCallback(() => {
          loadFavorites();
        }, [])
      )
    return(
        <View style={styles.containter}>
              <PageHeader title="Meus proffs favoritos"/>
              
            <ScrollView style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal:16,
                    paddingBottom:16,
                }}
            >
                 {favorite.map((teacher:Teacher)=>{
                     return(
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                            favorited
                        />
                     )
                 })}
                 
                
            </ScrollView>
        </View>
    );
}
export default Favorites;