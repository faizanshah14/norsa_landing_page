import React from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import addClient from "../services/client";
import _uniqueId from 'lodash/uniqueId';
import { getActiveClientList } from "../services/client";
import { getNextId } from "../services/client";
import addClientImage from "../services/client";
import "../components/Register.css"


function ClientForm() {
  const history = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const [ClientID, setClientID] = React.useState();
  const [validated, setValidated] = React.useState(false);
  const [uniqueID] = React.useState(_uniqueId("prefix-"))
  const [dealers, setDealers] = React.useState([])
  const [file, setFile] = React.useState()

  const [formData, setFormData] = React.useState({
    id: null,
    Date: "2021-01-01",
    Code: "",
    FirstName: "",
    LastName: "",
    address  :"",
    idCard: "",
    WorkNo: "+5999 ",
    ContactNo: "+5999 ",
    WorksAt: "",
    Email: "",
    FaxNumber: "",
    Status: 2,
    MaxBorrowAmount: "",
    Dealer_id: "",
    SourceOfIncome: "",
    ExpiryDate: "",
    RecievedCreditInPast: false
  });
  const {
    id,
    Code,
    FirstName,
    LastName,
    idCard,
    WorkNo,
    ContactNo,
    WorksAt,
    Email,
    address,
    FaxNumber,
    Status,
    MaxBorrowAmount,
    Dealer_id,
    SourceOfIncome,
    RecievedCreditInPast,
    Date,
    ExpiryDate
  } = formData;
  const [fileForm, setFileForm] = React.useState({
    id: _uniqueId("prefix-"),
    filePath: "",
    Client_id: ""
  })
  useEffect(() => {

    getNextId().then(function (response) {
      console.log(response)
      setFormData({ ...formData, ["id"]: response.data.id, ["Code"]: response.data.id })
    }).catch(function (error) {
      console.log(error)
    })
    getActiveClientList().
      then(function (response) {
        console.log(response.data)
        response.data.unshift({})
        setDealers(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }, []);



  const validateInput = (name, value) => {
    if (name === "Code" || name === "WorksAt") {
      let pattern = new RegExp("^[a-zA-Z 0-9_.-]*$");
      if (pattern.test(value)) {
        return true;
      }
      return "No special characters";
    }
    if (name === "FirstName" || name === "LastName") {
      let pattern = new RegExp("^[a-zA-Z ]*$");
      if (pattern.test(value)) {
        return true;
      }
      return "only alphabets and spaces";
    }
    if (name === "WorkNo" || name === "FaxNumber" || name === "ContactNo" || name == "idCard") {
      let pattern = new RegExp("^[0-9 +]*$");
      if (pattern.test(value)) {
        return true;
      }
      return "only numbers or spaces";
    }

    return true;
  };

  const handleInputChange = (e) => {
    if (e.target.name == "Status") {
      setFormData({ ...formData, [e.target.name]: !Status });
      return
    }
    if (e.target.name == "RecievedCreditInPast") {
      setFormData({ ...formData, [e.target.name]: !RecievedCreditInPast });
      return
    }
    if (e.target.name == "WorkNo" || e.target.name == "ContactNo") {
      if (e.target.value.length < 6) return
    }

    const valid = validateInput(e.target.name, e.target.value);
    if (valid != true) {
      alert(valid);
      return;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    if (email.length < 1) return true
    let pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (pattern.test(email)) {
      return true;
    }
    return "not a valid email";
  };

  const handleFileSubmit = () => {
    console.log(file)
    const data = new FormData();
    data.append("file", file);
    data.append("id", uniqueID);
    data.append('Client_id', formData.id);
    return addClientImage(data)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const valid = validateEmail(Email);
    if (valid != true) {
      alert(valid);
      return;
    }
    addClient(formData)
      .then(function (response) {
        console.log(response)
        handleFileSubmit()
          .then(function (response) {
            
          }).catch(function (error) {
            console.log(error)
          })
        alert("Danki! bo formulario a wordu entrega. \n Nos lo tuma kontakto kubo si nos nester di mas informashon")
      })
      .catch(function (error) {
        alert("Server Error Try Again later")
        console.log(error)
      })


    history.push("/");

  };
  const handleFileChange = (event) => {
    if (event.target.files.length !== 0) {
      setFile(event.target.files[0])
    }
  }
  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col md="9" className="main-container">
            <Card className="form-wrapper mt-4" style={{ border: "none" }}>
              <Card.Header
                style={{ backgroundColor: "#ffffff", border: "none" }}
              >
                <Card.Title className="text-center mb-5 heading">
                  Formulario di Registrashon
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit} style={{ border: "none" }}>
                  {/*<Row>
                    <Col  md="12">
                      <Form.Group>
                        <label>Date</label>
                        <Form.Control
                          required
                          placeholder="123"
                          type="date"
                          value={Date}
                          name="Date"
                          onChange={(e) => handleInputChange(e)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row> */}
                  <Row className="padding-class">
                    <Col sm="12" md="2">
                      <Form.Group>
                        <label>Code</label>
                        <Form.Control
                          required
                          placeholder="123"
                          type="text"
                          value={Code}
                          disabled
                          name="Code"
                          style={{ padding: "20px 10px" }}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col sm="12" md="5">
                      <Form.Group>
                        <label>Nomber</label>
                        <Form.Control
                          required
                          placeholder="Frank"
                          type="text"
                          value={FirstName}
                          name="FirstName"
                          onChange={(e) => handleInputChange(e)}
                          style={{ padding: "20px 10px" }}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col sm="12" md="5">
                      <Form.Group>
                        <label htmlFor="exampleLastName">Fam</label>
                        <Form.Control
                          required
                          placeholder="Semper"
                          type="text"
                          value={LastName}
                          name="LastName"
                          onChange={(e) => handleInputChange(e)}
                          style={{ padding: "20px 10px" }}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="padding-class">
                    <Col sm="12" md="6">
                      <Form.Group>
                        <label>Sédula</label>
                        <Form.Control
                          required
                          placeholder=""
                          type="text"
                          value={idCard}
                          name="idCard"
                          onChange={(e) => handleInputChange(e)}
                          style={{ padding: "20px 10px" }}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col sm="12" md="6">
                      <Form.Group>
                        <label>Fecha di Vensementu</label>
                        <Form.Control
                          required
                          placeholder="123"
                          type="date"
                          value={ExpiryDate}
                          name="ExpiryDate"
                          onChange={(e) => handleInputChange(e)}
                          style={{ fontSize: "14px", padding: "20px 10px" }}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="padding-class">
                    <Col sm="12" md="6">
                      <Form.Group>
                        <label>Tel Trabou</label>
                        <Form.Control
                          required
                          placeholder="+5999"
                          type="text"
                          value={WorkNo}
                          name="WorkNo"
                          onChange={(e) => handleInputChange(e)}
                          style={{ fontSize: "14px", padding: "20px 10px" }}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col sm="12" md="6">
                      <Form.Group>
                        <label> Celullar</label>
                        <Form.Control
                          required
                          placeholder="+5999"
                          type="text"
                          value={ContactNo}
                          name="ContactNo"
                          onChange={(e) => handleInputChange(e)}
                          style={{ fontSize: "14px", padding: "20px 10px" }}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="padding-class">
                    <Col sm="12" md="6">
                      <Form.Group>
                        <label>Ta Empleá Na</label>
                        <Form.Control
                          required
                          placeholder="Ta taraha na"
                          type="text"
                          value={WorksAt}
                          name="WorksAt"
                          onChange={(e) => handleInputChange(e)}
                          style={{ padding: "20px 10px" }}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col sm="12" md="6">
                      <Form.Group>
                        <label>Email</label>
                        <Form.Control
                          placeholder="Email"
                          type="text"
                          value={Email}
                          name="Email"
                          onChange={(e) => handleInputChange(e)}
                          style={{ padding: "20px 10px" }}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Adrès</label>
                        <Form.Control
                          required
                          placeholder="address"
                          type="text"
                          value={address}
                          name="address"
                          onChange={(e) => handleInputChange(e)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="padding-class">
                    <Col sm="12" md="12">
                      <Form.Group>
                        <label>
                          Si bo no ta empleá, kiko ta bo medio di entrada ?
                        </label>
                        <Form.Control
                          as="textarea"
                          required
                          placeholder=""
                          value={SourceOfIncome}
                          name="SourceOfIncome"
                          onChange={(e) => handleInputChange(e)}
                          style={{ padding: "20px 10px", fontSize: "14px" }}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="12" md="12">
                      <div className="radio-btn-div">
                        <label className="mr-5">
                          A yega di tuma bon den pasado kaba?{" "}
                        </label>

                        <Form.Check
                          inline
                          label="Si"
                          name="group1"
                          type="Radio"
                          className="radio-btn"
                          name="RecievedCreditInPast"
                          checked={RecievedCreditInPast}
                          onClick={(e) => {
                            handleInputChange(e);
                          }}
                        />
                        <Form.Check
                          inline
                          label="No"
                          name="group1"
                          type="Radio"
                          className="radio-btn"
                          name="RecievedCreditInPast"
                          checked={!RecievedCreditInPast}
                          onClick={(e) => {
                            handleInputChange(e);
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row className="padding-class">
                    <Col sm="12" md="12">
                      <Form.Group>
                        <label>Si e Kontesta si, serka ken?</label>
                        <Form.Control
                          as="select"
                          defaultValue=""
                          placeHolder="select dealer"
                          value={Dealer_id}
                          name="Dealer_id"
                          style={{ fontSize: "14px", padding: "20px 10px" }}
                          onChange={(e) => {
                            console.log(e);
                            console.log("e.target.value", e.target.value);
                            handleInputChange(e);
                          }}
                        >
                          {dealers.map((item, index) => {
                            if (index == 0) {
                              return (
                                <option value={item.id}>
                                  Dealers : {item.Code}
                                </option>
                              );
                            }
                            return (
                              <option value={item.id}> {item.Code}</option>
                            );
                          })}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Porfabor agrega un potrét di bo Sédula</label>
                        <Form.Control
                          required
                          type="file"
                          name="profilePicture"
                          onChange={(e) => { handleFileChange(e) }}
                        //onChange={(e) => handleInputChange(e)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  {file && <Row>
                    <Col md="12">
                      <img src={URL.createObjectURL(file)}  style={{width : "100%", maxWidth : "150px"}}/>
                    </Col>
                  </Row>}

                  {/* <Row  className="padding-class">
                    <Col sm="12"  md="12">
                      <Form.Check
                        inline
                        label="Active"
                        name="group1"
                        type="Radio"
                        className="mr-5"
                        name="Status"
                        checked={Status}
                        onClick={(e) => {
                          handleInputChange(e);
                        }}
                      />
                    </Col>
                  </Row> */}
                  <Row className="text-center mt-2">
                    <Col md="12">
                      <div className="button-wrapper">
                        <Button className="add-btn res-size" type="submit">
                          Save
                        </Button>
                        {/* <Link to="#">
                          <Button className="delete-btn res-size">Back</Button>
                        </Link> */}
                      </div>
                    </Col>
                  </Row>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ClientForm;
