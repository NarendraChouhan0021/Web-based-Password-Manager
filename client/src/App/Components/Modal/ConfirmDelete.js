import React, { Component } from 'react';
import { Modal, Button } from "react-bootstrap";

class ConfirmDelete extends Component {

    save = () => {
        this.props.userLogout();
    }

    render() {
        const { showBrowserModal, closeModal } = this.props;
        return (
            <Modal lg={"medium"} show={showBrowserModal} onHide={closeModal} >
                <Modal.Header className="no-border">
                    <h4 className="m-0 font-weight-bold">Confirm Delete</h4>
                    <Button title={"Logout"} type="button" onClick={closeModal} className="close-btn" data-dismiss="modal"><i className="nc-icon nc-simple-remove"></i></Button>
                </Modal.Header>

                <Modal.Body className="modal-data-body">
                    <p className="theme-color">Are you sure you want to Delete this record ?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={closeModal} type="button" className="btn btn-danger">Cancel</Button>
                    <Button onClick={this.save} type="button" className="btn btn-fill btn-info">Delete</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default ConfirmDelete
