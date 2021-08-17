import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'

class ErrorShowModal extends Component {
  render () {
    const { showBrowserModal, closeModal, details } = this.props
    return (
            <Modal lg={'medium'} show={showBrowserModal} onHide={closeModal} >
                <Modal.Header className="no-border">
                    <h4 className="m-0 font-weight-bold">Warning</h4>
                    <Button title={'Warninig'} type="button" onClick={closeModal} className="close-btn" data-dismiss="modal"><i className="nc-icon nc-simple-remove"></i></Button>
                </Modal.Header>

                <Modal.Body className="modal-data-body">
                    {/* <p className="theme-color">This API has failed.</p> */}
                    <p className="theme-color">{details}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={closeModal} type="button" className="btn btn-fill btn-info">Got it</Button>
                    {/* <Button onClick={this.save} type="button" className="btn btn-fill btn-info">Done</Button> */}
                </Modal.Footer>
            </Modal>
    )
  }
}

export default ErrorShowModal
