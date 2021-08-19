import React, { Component } from "react";
import Loader from "../Loader/Loader";
import DataTable from "react-data-table-component";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import history from "../../history";
import { WpmAction } from "../../Actions";
import CustomContentAlert from "../helper";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordList: [],
      loader: false,
      password: "",
      copied: false,
    };

    this.customStyles = {
      rows: {
        style: {
          minHeight: "72px",
        },
      },
      headCells: {
        style: {
          paddingLeft: "8px",
          paddingRight: "8px",
        },
      },
      cells: {
        style: {
          paddingLeft: "8px",
          paddingRight: "8px",
        },
      },
    };
    let i = 0;
    this.columns = [
      {
        name: "Sr.no",
        sortable: true,
        cell: (row) => {
          i++;
          return i;
        },
      },
      {
        name: "web Site Name",
        sortable: true,
        cell: (row) => <div>{row.website_name}</div>,
        selector: (row) => row.website_name,
      },
      {
        name: "Password",
        sortable: true,
        cell: (row) => <div>{row.password}</div>,
        selector: (row) => row.password,
      },
      {
        name: "Actions",
        sortable: false,
        cell: (row) => (
          <>
            <CopyToClipboard
              text={row.password}
              onCopy={() => {
                this.setState({ copied: true }, () => {
                  setTimeout(() => {
                    this.setState({ copied: false });
                  }, 1000);
                });
              }}
            >
              <i className="far fa-copy" />
            </CopyToClipboard>
            <i
              className="far fa-edit"
              onClick={() => {
                this.editWpm(row._id, row.website_name);
              }}
            />
            <i
              className="far fa-trash-alt"
              onClick={() => {
                this.delWpm(row._id);
              }}
            />
          </>
        ),
      },
    ];
  }

  editWpm = (id) => {
    history.push({
      pathname: "/edit-password",
      search: `?${id}`,
    });
  };

  delWpm = async (_id) => {
    await this.props.delWpm(_id);
  };

  componentDidMount() {
    this.setState({ loader: true }, async () => {
      await this.props.getWpmList();
      const password = this.props.wpmList;
      this.setState({ passwordList: password, loader: false });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.wpmList !== this.props.wpmList) {
      this.setState({ passwordList: this.props.wpmList });
    }
  }

  dataTableHandle = (passwordList) => {
    return (
      <DataTable
        data={passwordList}
        columns={this.columns}
        customStyles={this.customStyles}
        pagination={true}
        responsive={true}
        subHeader
        defaultSortAsc={true}
        fixedHeader={true}
        fixedHeaderScrollHeight="40vh"
      />
    );
  };

  createPassword = () => {
    history.push("/generate-password");
  };

  render() {
    const { loader, passwordList } = this.state;
    return (
      <div>
        <Container fluid className="mt-5">
          <Row>
            <Col md="10" className="offset-md-1">
              <Card>
                <Card.Header>
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <Card.Title as="h4">
                        Web based Password Manager
                      </Card.Title>
                    </div>
                    <div>
                      <Button
                        onClick={() => this.createPassword()}
                        type="button"
                        variant="primary"
                      >
                        Generate New Password
                      </Button>
                    </div>
                  </div>
                </Card.Header>
                <Card.Body className="pos-rel-overflow-hide">
                  {loader ? (
                    <Loader />
                  ) : (
                    <>
                      {passwordList && passwordList.length ? (
                        this.dataTableHandle(passwordList)
                      ) : (
                        <div className="help-block">No data found</div>
                      )}
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        {this.state.copied && (
          <CustomContentAlert
            delay={2000}
            message={"copied"}
            className="toast-success"
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ wpm }) => {
  const { wpmList } = wpm;
  return { wpmList };
};

const mapStateToDispatch = {
  getWpmList: WpmAction.getWpmList,
  editWpm: WpmAction.editWpm,
  delWpm: WpmAction.delWpm,
};

export default connect(mapStateToProps, mapStateToDispatch)(LandingPage);
