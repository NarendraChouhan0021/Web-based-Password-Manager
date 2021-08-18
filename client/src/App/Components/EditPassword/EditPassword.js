import React, { Component } from "react";
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import { connect } from "react-redux";
import history from "../../history";
import { GeneratePasswordAction } from "../../Actions";
class EditPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      GeneratedPassword: "",
      website_name: "",
      isFormValid: false,
    };
  }

  componentDidMount() {
    this.setState(
      {
        _id:
          this.props.location &&
          this.props.location.search &&
          this.props.location.search.split("?")[1]
            ? this.props.location.search.split("?")[1]
            : "",
      },
      async () => {
        await this.props.getEditDetails(this.state._id);
        this.setState(
          {
            website_name: this.props.website_name,
            isFormValid: true, // temp until api
          },
          async () => {}
        );
      }
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.password !== this.props.password) {
      this.setState({ GeneratedPassword: this.props.password });
    }
  }

  handleGeneratePassword = async () => {
    const { _id, website_name } = this.state;
    this.setState({ GeneratedPassword: this.props.password });
    await this.props.handleEdit(_id, website_name);
  };

  handleSubmit = () => {
    history.push("/wbp");
  };

  handleBack = () => {
    history.push("/wbp");
  };

  render() {
    const { website_name, GeneratedPassword, isFormValid } = this.state;
    return (
      <div>
        <Container fluid>
          <Row>
            <Col md="12">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">Generate New Password</Card.Title>
                </Card.Header>

                <Card.Body className="pos-rel-overflow-hide">
                  <h4 className="mt-0 mb-2">website_name Name</h4>
                  <Row>
                    <Col md="3" className="pr-md-1">
                      <Form.Group>
                        <label>
                          website Name
                          <span className="asterisk">*</span>
                        </label>
                        <Form.Control
                          placeholder="linkedin"
                          type="text"
                          name="website_name"
                          value={website_name}
                          disabled
                        />
                      </Form.Group>
                      <Button
                        className="btn-fill"
                        type="button"
                        variant="info"
                        disabled={!isFormValid}
                        onClick={this.handleGeneratePassword}
                      >
                        Generate Password
                      </Button>
                    </Col>
                    <Col md="9">
                      <Form.Group>
                        <label>Generated Password</label>
                        <Form.Control
                          placeholder="Generated Password will be shown here"
                          name="GeneratedPassword"
                          value={GeneratedPassword}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12" className="text-right">
                      <Button
                        className="btn-fill"
                        type="button"
                        variant="info"
                        onClick={this.handleSubmit}
                      >
                        Save
                      </Button>
                      <Button
                        className="btn-fill ml-2"
                        type="button"
                        variant="danger"
                        onClick={this.handleBack}
                      >
                        Cancel
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({ PasswordGeneraterDetails }) => {
  const { password, _id } = PasswordGeneraterDetails.editedPassword;
  const { detailsForEdit } = PasswordGeneraterDetails;
  const { website_name } = detailsForEdit;
  return { password, website_name, _id };
};

const mapStateToDispatch = {
  GeneratePassword: GeneratePasswordAction.GeneratePassword,
  handleEdit: GeneratePasswordAction.handleEdit,
  getEditDetails: GeneratePasswordAction.getEditDetails,
};

export default connect(mapStateToProps, mapStateToDispatch)(EditPassword);
