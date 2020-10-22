

import React,{useState,useEffect} from 'react';
import {StyleSheet,ScrollView,View,Text,StatusBar,Button,TouchableHighlight,TextInput} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
const App= () => {
  const [inputTexto,guardarTexto]=useState('')
  const [nombreStorage,guardarNombreStorage]=useState('')
  useEffect(()=>{
    obtenerDatosStorage()
  },[])
  const guardarDatos =async () => {
    try {
      await AsyncStorage.setItem('nombre',inputTexto)
      guardarNombreStorage(inputTexto)
    } catch (error) {
      console.log(error)
    }
  }
  const obtenerDatosStorage =async () => {
    try {
      const nombre = await AsyncStorage.getItem('nombre')
      guardarNombreStorage(nombre)
    } catch (error) {
      console.log(error)
    }
  }
  const eliminarStorage = async() => {
    try {
      await AsyncStorage.removeItem('nombre')
      guardarNombreStorage('')
    } catch (error) {
      
    }
    
  }
  
  
  return (
    <>
    <View style={styles.contenedor}>
    {
        nombreStorage ? 
  <Text>Hola: {nombreStorage}</Text>
  :null
    }
      <TextInput style={styles.input}
      onChangeText={texto=>guardarTexto(texto)}
      />
      <Button
        title="Guardar"
        color="#333"
        onPress={()=>guardarDatos()}
      />
      {
        nombreStorage ? 
        <TouchableHighlight style={styles.btnEliminar}
      onPress={()=>eliminarStorage()}
      >
        <Text style={styles.txtEliminar}>Eliminar Nombre &times;</Text>
      </TouchableHighlight>
      :
      null
      }
      
    </View>
     
    </>
  );
};

const styles = StyleSheet.create({
  contenedor:{
flex:1,
backgroundColor:'#fff',
alignItems:'center',
justifyContent:'center'
  },
  input:{
    borderColor:'#666',
    borderBottomWidth:1,
    width:300,
    height:40
  },
  btnEliminar:{
    backgroundColor:'red',
    marginTop:20,
    padding:10
  },
  txtEliminar:{
    color:'#fff',
    fontWeight:'bold',
    textAlign:'center',
    textTransform:'uppercase'
  }
});

export default App;
