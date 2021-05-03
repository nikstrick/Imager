import React,{useRef,useLayoutEffect} from 'react'
import ImagerNavbar from'./ImagerNavbar'
import SearchModal from './SearchModal';
import './landing.css'
import {
    Container,
    Row,
} from 'reactstrap';
import {connect} from 'react-redux';

//It is the Landing Component of the Imager project
function Landing(){
    const refFeatures=useRef(null);
    const onClickSearch = (e) => {
        console.log("oK")
        //.current is verification that your element has rendered
        if(e){
            refFeatures.current.scrollIntoView({behavior: "smooth", block: "start"})
        }
    }
    return(
        <div className="bg-gradient-darker">
            {/* @desc: Brings the Navbar Component  */}
            <ImagerNavbar onClick={onClickSearch}/>
            <Container style={{marginTop:"1rem"}}>
            <Row style={{justifyContent:"center",paddingInline:"5rem"}}>
            {/* @desc: Brings the SearchModal Component */}
            <SearchModal ref={refFeatures} />
            </Row>
            
            </Container>
        </div>
    )
};


//Maping the state to props
const mapStateToProps=(state)=>({
    
})
export default connect(mapStateToProps,{})(Landing);