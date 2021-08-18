import React, { Component } from "react";
import Loader from "../Loader/Loader";
import DataTable from "react-data-table-component";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import history from "../../history";
import { GeneratePasswordAction } from "../../Actions";
import CustomContentAlert from "../helper";
class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PasswordList: [],
      loader: false,
      searchedPasswordList: [],
      password: "",
      copied: false,
    };

    this.customStyles = {
      rows: {
        style: {
          minHeight: "72px", // override the row height
        },
      },
      headCells: {
        style: {
          paddingLeft: "8px", // override the cell padding for head cells
          paddingRight: "8px",
        },
      },
      cells: {
        style: {
          paddingLeft: "8px", // override the cell padding for data cells
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
                this.handleEdit(row._id, row.website_name);
              }}
            />
            <i
              className="far fa-trash-alt"
              onClick={() => {
                this.handleDelete(row._id);
              }}
            />
          </>
        ),
      },
    ];
  }

  handleEdit = (id) => {
    history.push({
      pathname: "/to-edit-password",
      search: `?${id}`,
    });
  };

  handleDelete = async (_id) => {
    await this.props.handleDelete(_id);
  };

  componentDidMount() {
    this.setState({ loader: true }, async () => {
      await this.props.GetWpmList();
      const password = this.props.GetAllPassword;
      this.setState({ PasswordList: password, loader: false });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.GetAllPassword !== this.props.GetAllPassword) {
      this.setState({ PasswordList: this.props.GetAllPassword });
    }
  }

  dataTableHandle = (searchValue, searchedPasswordList, PasswordList) => {
    return (
      <DataTable
        // data={searchValue.length ? searchedResidentList : residentList}
        data={PasswordList}
        columns={this.columns}
        customStyles={this.customStyles}
        pagination={true}
        responsive={true}
        subHeader
        // subHeaderComponent={
        //   <DatatableHeader
        //     Header={"Passwords"}
        //     searchValue={this.state.searchValue}
        //     HandleChange={this.handleSearchChange}
        //   />
        // }
        defaultSortAsc={true}
        fixedHeader={true}
        fixedHeaderScrollHeight="40vh"
      />
    );
  };

  handlePasswordGenerated = () => {
    history.push("/to-generate-password");
  };

  render() {
    const { loader, searchValue, searchedPasswordList, PasswordList } =
      this.state;
    return (
      <div>
        <Container fluid>
          <Row>
            <Col md="12">
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
                        onClick={() => this.handlePasswordGenerated()}
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
                      {PasswordList && PasswordList.length ? (
                        this.dataTableHandle(
                          searchValue,
                          searchedPasswordList,
                          PasswordList
                        )
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

const mapStateToProps = ({ PasswordGeneraterDetails }) => {
  const { GetAllPassword } = PasswordGeneraterDetails;
  return { GetAllPassword };
};

const mapStateToDispatch = {
  GetWpmList: GeneratePasswordAction.GetWpmList,
  handleEdit: GeneratePasswordAction.handleEdit,
  handleDelete: GeneratePasswordAction.handleDelete,
};

export default connect(mapStateToProps, mapStateToDispatch)(LandingPage);
