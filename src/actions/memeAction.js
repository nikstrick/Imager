import {GET_MEMES,GET_MEME,ADD_MEME,UPDATE_MEME} from './types'
import axios from 'axios';

//@desc : To get the atmost 100 recent memes
export const getMemes=()=>(dispatch)=>{
    // console.log("OK");
    axios.get('/memes').then((res)=>{
        // console.log(res.data)
        dispatch({
            type:GET_MEMES,
            payload:res.data
        })    
    });
};
//@desc : To get the meme searched by id
export const getMeme=(id)=>(dispatch)=>{
    axios.get(`/memes/${id}`).then((res) =>{
        // console.log(res);
        dispatch({
        type: GET_MEME,
        payload: res.data,
        })}
    ).catch((err)=>{
        console.log(err)
        dispatch({
            type:GET_MEME,
            payload:{
                id:0,
                owner:'Not Found',
                caption:'Not Available',
                url:'https://image.shutterstock.com/image-vector/house-not-available-icon-flat-260nw-1030785001.jpg'
            }
        })
    })
}
//@desc : To add a meme
export const addMeme=(formDATA)=>(dispatch)=>{
    const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
    //   console.log(formDATA);
    axios.post('/memes',formDATA,config).then((res)=>{
        // console.log(res.data);
        dispatch({
            type:ADD_MEME,
            payload:res.data
        });
        alert("Meme Added Succesfully!")
    }).catch((err)=>{
        alert("Meme Already Present!")
    })
    // return{
    //     type:ADD_MEME,
    //     payload:formDATA
    // }
}
//@desc: To update Meme
export const updateMeme=(id,editDATA)=>(dispatch)=>{
    const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
    //   console.log(id)
    //   console.log(editDATA);
    axios.patch(`/memes/${id}`,editDATA,config).then((res)=>{
        // console.log(res.data);
    dispatch({
        type:UPDATE_MEME,
        payload:res.data
    });
    axios.get('/memes').then((res)=>{
        // console.log(res.data)
        dispatch({
            type:GET_MEMES,
            payload:res.data
        })    
    });
    alert("Meme Edited Succesfully!")
    });
}