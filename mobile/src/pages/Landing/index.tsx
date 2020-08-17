import React, { useEffect, useState } from 'react';
import { View, Image,Text, TouchableOpacity} from 'react-native';
import syles from './syles';
import landingImg from '../../assets/images/landing.png';
import styles from './syles';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';
import {useNavigation, NavigationHelpersContext} from '@react-navigation/native';
import {RectButton} from 'react-native-gesture-handler'
import api from '../../services/api';
function Landing(){
    const[totalConnections,setTotalConnections] =useState(0);
    useEffect(()=>{
        api.get('connections').then(respose=>{
            const {total}=respose.data;
            setTotalConnections(total);
        })
    },[]); 
    const {navigate}= useNavigation();
    function handleNavigateToGiveClassesPage(){
       navigate('GiveClasses');
    }
    function handleNavigateToStudyPages(){
        navigate('Study');
    }

    return (
        <View style={syles.container}>
            <Image source={landingImg} style={syles.banner}/>
            <Text style={syles.title}>
                Seja bem-vindo,{'\n'}
                <Text style={styles.titleBold}> O que deseja fazer?</Text>
            </Text>
            <View style={syles.buttonsContainer}>
                <RectButton  
                 onPress={handleNavigateToStudyPages}
                 style={[syles.button,syles.buttonPrimary]}>
                    <Image source={studyIcon} />
                    <Text style={syles.buttonText}>Estudar</Text>
                </RectButton>

                <RectButton  onPress={handleNavigateToGiveClassesPage} style={[syles.button,syles.buttonSecondary]}>
                    <Image source={giveClassesIcon} />
                    <Text style={syles.buttonText}>Dar Aulas</Text>
                </RectButton>
              
 

            </View>
            <Text style={syles.totalConnections}>Total de {totalConnections} conexões já realizadas{' '}
            <Image source={heartIcon} />
                
            </Text>
        </View>


    );
    

}
export default Landing;
