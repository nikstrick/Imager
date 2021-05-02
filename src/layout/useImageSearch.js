import {useEffect,useState} from 'react'
import axios from 'axios'

//Custom React hook to produce infinite scroll
export default function useImageSearch(query,pageNumber,safe) {
    const api_key='a12fcb8f1bf45ea1626eda3353f8077a';

    //React states for search
    const[loading,setLoading]=useState(true)
    const[error,setError]=useState(false)
    const[images,setImages]=useState([])
    const[more,setMore]=useState(false)
    const[total,setTotal]=useState(0);

    //React Lifecycle to remove initial serch result
    useEffect(()=>{
        setImages([])
        setTotal(0)
    },[query,safe]) 

    useEffect(()=>{
        let cancel
        //Loading
        setLoading(true)
        //if error
        setError(false)
        if(!query){
            axios({
                method: 'GET',
                url: 'https://www.flickr.com/services/rest/',
                params:{
                    method:'flickr.photos.getRecent',
                    api_key:api_key,
                    page:pageNumber,
                    per_page:15,
                    safe_search:safe,
                    format: 'json',
                    nojsoncallback: 1,
                },
                cancelToken:new axios.CancelToken(c=>cancel=c)
            }).then((res)=>{
                console.log(res.data)
                if(res.data.stat==='ok'){
                setTotal(res.data.photos.total)
                setImages(prevImage=>{
                    return [...prevImage,...res.data.photos.photo.map(i=>i)]
                })
                setMore(res.data.photos.photo.length>0)
                setLoading(false)
            }
            }).catch(e=>{
                if(axios.isCancel(e)) return
                setError(true)
            })
            return ()=>cancel()
        }
        else{
            axios({
                method: 'GET',
                url: 'https://www.flickr.com/services/rest/',
                params:{
                    method:'flickr.photos.search',
                    api_key:api_key,
                    tags:query,
                    page:pageNumber,
                    per_page:15,
                    safe_search:safe,
                    format: 'json',
                    nojsoncallback: 1,
                },
                cancelToken:new axios.CancelToken(c=>cancel=c)
            }).then((res)=>{
                console.log(res.data)
                if(res.data.stat==='ok'){
                setImages(prevImage=>{
                    return [...prevImage,...res.data.photos.photo.map(i=>i)]
                })
                setTotal(res.data.photos.total)
                setMore(res.data.photos.photo.length>0)
                setLoading(false)
            }
            }).catch(e=>{
                if(axios.isCancel(e)) return
                setError(true)
            })
            return ()=>cancel()
        }
    },[query,pageNumber,safe]);
    return {loading,error,images,more,total}
}
