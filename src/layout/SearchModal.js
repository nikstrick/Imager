import React,{useState,useRef,useCallback} from 'react'
import useImageSearch from './useImageSearch'
import DisplayModal from './DisplayModal'
import {
    InputGroup,
    InputGroupAddon,
    Input,
    Card,
    CardBody,
    Button,
    Container,
    Row,
    Col,
    CardHeader
}from 'reactstrap'
import {connect} from 'react-redux';
import {getMeme} from '../actions/memeAction';
import PropTypes from 'prop-types';

function SearchModal(props,ref){
    const [modal, setModal] = useState(false);
    const [view,setView]=useState({ id: 51151464928, owner: "163606359@N02", secret: "106f8b0a16", server: 65535, farm: 66, title: "*205*"});
    

    //Parameters for Infinite Search
    const [query,setQuery]=useState();
    const [safe,setSafe]=useState(1);
    const [pageNumber,setPageNumber]=useState(1);

    //React Lifecycle for Infinite Search with states 
    const{
        loading,
        error,
        images,
        more,
        total
    }=useImageSearch(query,pageNumber,safe)

    //Refrencing for Infinite search
    const observer=useRef()
    const lastImageRef=useCallback(lastImage=>{
        if(loading)
        return 
        if(observer.current) observer.current.disconnect()
        observer.current= new IntersectionObserver(enteries=>{
            if(enteries[0].isIntersecting && more){
                setPageNumber(prevPageNumber=>prevPageNumber+1)
            }
        })
        if(lastImage) observer.current.observe(lastImage)
    },[loading,more])

    //Handle the search through Input text
    const handleSearch=(e)=>{
        setQuery(e.target.value)
        setPageNumber(1)
    }
    const toggle = () => {
        setModal(!modal)
    }

        //Defining onClick function for clearing search field
        const onClick=()=>{
            setQuery('')
            setPageNumber(1)
        }
        return (
            <div className="text-light">
            <DisplayModal toggle={toggle} modal={modal} view={view}/>
            <Container>
                <Row style={{justifyContent:"center"}}>
                    {/* <div ref={ref}> */}
                <InputGroup size="sm" style={{maxWidth:'60%',minWidth:'50%',marginBottom:'5vh',marginTop:'10vh'}}>
                    <Input placeholder="Search Images..."
                    type="text"
                    value={query}
                    onChange={handleSearch} />
                    <InputGroupAddon addonType="append">
                        <Button color='danger' sm onClick={onClick}>x</Button>
                    </InputGroupAddon>
                </InputGroup>
                {/* </div> */}
                </Row>
            </Container>
            <Row style={{justifyContent:'space-evenly'}}>
            <span style={{marginLeft:'2rem'}}>
                Pictures Found: {total}
            </span>
            <Button size="sm" color="danger" onClick={()=>setSafe(safe===1?2:safe===2?3:1)}>safe search</Button>
            </Row>
            <Container fluid>
            <Row> 
            {images.map((image,index)=>{
                if(images.length===index+1)
                return (
                <Col lg='4' sm='6' xs ='12' style={{marginTop:'5vh'}}>
                <Container>
                <Card  style={{width:"300px",height:"330px"}}>
                    <CardHeader>
                    <Button size="sm"  value={"ok"} onClick={()=>{setView(image);console.log(image.title);toggle()}} color="primary" key={image.id}>view</Button>
                   
                    </CardHeader>
                        
                    <CardBody>
                        <Container fluid style={{alignItems:"center"}}>
                            <img 
                                style={{maxWidth:"200px",maxHeight:"250px"}}
                                alt={image.title} 
                                ref={lastImageRef} 
                                key={image.id}
                                src={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`}
                                >
                            </img>
                        </Container>
                    </CardBody>
                </Card>
                </Container>
                </Col>)
                else
                return(
                    <Col lg='4' sm='6' xs ='12' style={{marginTop:'5vh'}}>
                    <Container>
                    <Card  style={{width:"300px",height:"330px"}}>
                        <CardHeader backgroundColor="gold">
                        <Button size="sm" value={"ok"} onClick={()=>{setView(image);console.log(image.title);toggle()}} color="primary" key={image.id} >view</Button>
                        
                        </CardHeader>
                            
                        <CardBody>
                            <Container fluid style={{alignItems:"center"}}>
                                <img alt={image.title} 
                                    key={image.id}
                                    style={{maxWidth:"200px",maxHeight:"250px"}}
                                    src={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`}
                                    >
                                </img>
                            </Container>
                        </CardBody>
                    </Card>
                    </Container>
                    </Col>)
            })}
            </Row>
            </Container>
            <div>{loading&& 'Loading...'}</div>
            <div>{error&& 'Error'}</div>
            </div>
        );
}
SearchModal.propTypes={
    getMeme: PropTypes.func.isRequired,
    meme:PropTypes.object.isRequired,
}
const mapStateToProps=(state)=>({
    meme:state.meme,
})
export default connect(mapStateToProps,{getMeme})(SearchModal)