import React from 'react'
import{
    Modal,
    ModalBody,
    ModalHeader,
    Container
} from 'reactstrap'

export default function DisplayModal({view,toggle,modal}) {
    return (
        <Modal isOpen={modal} toggle={toggle}style={{justifyContent:"space-evenly"}}>
        <ModalHeader style={{backgroundColor:'gold'}} toggle={toggle}>
        {view.title}
        </ModalHeader>
        <ModalBody>
            {/* {view.title} */}
            <Container fluid style={{padding:"1%",maxWidth:"22rem",maxHeight:"40rem"}}>
            <img 
            style={{maxWidth:"20rem",maxHeight:"30rem",padding:'1%'}}
            src={`https://farm${view.farm}.staticflickr.com/${view.server}/${view.id}_${view.secret}.jpg`}
            alt={view.title} />
            </Container>
        </ModalBody>    
        </Modal>
    )
}
