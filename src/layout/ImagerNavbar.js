
import{
    Navbar,
    NavbarBrand,
    Button
}from 'reactstrap'

function ImagerNavbar({onClickRef}){
return(
    <Navbar color="warning" light expand="xl" fixed='top'>
        {/* <Row> */}
        {/* <Col xs="12" sm='6'> */}
        <NavbarBrand href="/"><b>Imager</b></NavbarBrand>
        <Button color="warning" onClick={()=>onClickRef()}>Search</Button>
        {/* </Col> */}
        {/* // </Row> */}
    </Navbar>
)
}
export default ImagerNavbar;