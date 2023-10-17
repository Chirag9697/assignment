import logo from './logo.svg';
import './App.css';
import {db} from './firebase';
import {uid} from 'uid';
import {set,getDatabase} from 'firebase/database';
import {ref as sRef} from 'firebase/storage';
import {useState,useEffect} from 'react';
import {doc,collection,addDoc,updateDoc,deleteDoc,getDocs,Timestamp} from 'firebase/firestore';
import Tabledata from './Tabledata';
function App() {
  const[newuser,setNewUser]=useState({name:'',age:0,gender:"",email:"",city:""});
  const [data,setData]=useState();
  const collectionref=collection(db,"users");
  const adduser=async(user)=>{
    try{
      const data=await addDoc(collectionref,user);
      console.log(data);
    }catch(err){
      console.log(err);
    }
  }
  const updateuser=async(id,updateduser)=>{
    try{
      const user=doc(db,"users",id);
      const data=await updateDoc(user,updateduser);
      console.log(data);
    }catch(err){
      console.log(err);
    }
  }
  const deletebook=async(id)=>{
    try{
      const user=doc(db,"users",id);
      const data=await deleteDoc(user);
      console.log(data);
    }catch(err){
      console.log(err);
    }
    
  }
  const getallusers=async()=>{
    try{
      const data=await getDocs(collectionref);
      const alldata=data.docs.map((item)=>{
        return {...item.data(),id:item.id};
      })
      setData(alldata);
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    getallusers();
  },[])
  return (
    <>
      <div>
        <Tabledata/>
      </div>
    </>
  );
}

export default App;
