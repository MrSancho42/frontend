import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Form, FormGroup } from "react-bootstrap";
import { Cookies } from "react-cookie";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import "moment/locale/uk";

moment.locale("uk");

const cookies = new Cookies();

function BusinessRecordSubKinds(props) {
  if (props.kind === "INCOME") {
    return (
      <Form.Group className="mb-3">
        <Form.Label>Вид доходу</Form.Label>
        <Form.Select
          value={props.subKind}
          onChange={(event) => props.setSubKind(event.target.value)}
        >
          <option key="CASH" value="CASH">
            Готівковий розрахунок
          </option>
          <option key="NON_CASH" value="NON_CASH">
            Безготівковий розрахунок
          </option>
          <option key="FREE_RECEIVED" value="FREE_RECEIVED">
            Безоплатно отриманий дохід
          </option>
          <option key="GRANTS" value="GRANTS">
            Грантові кошти
          </option>
        </Form.Select>
      </Form.Group>
    );
  }
  return (
    <Form.Group className="mb-3">
      <Form.Label>Вид витрати</Form.Label>
      <Form.Select
        value={props.subKind}
        onChange={(event) => props.setSubKind(event.target.value)}
      >
        <option key="REGULAR_SPENDING" value="REGULAR_SPENDING">
          Витрата
        </option>
        <option key="REFUND" value="REFUND">
          Повернення коштів
        </option>
      </Form.Select>
    </Form.Group>
  );
}

function AddRecordModal(props) {
  const [show, setShow] = useState(true);

  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [kind, setKind] = useState("INCOME");
  const [subKind, setSubKind] = useState("NON_CASH");
  const [currency, setCurrency] = useState("UAH");
  const [selectedDate, setSelectedDate] = useState();

  const kindOption = [
    { value: "INCOME", label: "Дохід", variant: "outline-success" },
    { value: "SPENDING", label: "Витрата", variant: "outline-danger" },
    // { value: 'TRANSFER', label: 'Переказ', variant: 'outline-danger'},
  ];

  function FetchBills() {
    const params = {
      params: {
        pk_user: cookies.get("current-user"),
        for_business: props.forBusiness,
      },
    };
    axios.get("/bill-services/get-bills", params).then((response) => {
      setBills(response.data);
    });
  }

  function FetchCategories() {
    const params = {
      params: {
        pk_user: cookies.get("current-user"),
      },
    };
    axios
      .get("/user-category-services/get-user-categories", params)
      .then((response) => {
        setCategories(response.data);
      });
  }

  function createRecord() {
    var requestBody = {};
    var resource = "";
    if (props.forBusiness) {
      requestBody = {
        pk_bill: selectedBill,
        pk_category: 0,
        pk_business: cookies.get("current-business"),
        business_record: {
          amount: amount,
          description: description,
          currency: currency,
          kind: kind,
          sub_kind: subKind,
          creation_time: selectedDate.format("YYYY-MM-DDTHH:mm:ss.SSSSSS"),
        },
      };
      resource = "/business-record-services/create";
    } else {
      requestBody = {
        pk_bill: selectedBill,
        pk_category: selectedCategory,
        record: {
          amount: amount,
          description: description,
          currency: currency,
          kind: kind,
          creation_time: selectedDate.format("YYYY-MM-DDTHH:mm:ss.SSSSSS"),
        },
      };
      resource = "/record-services/create";
    }
    axios.post(resource, requestBody).then((response) => {
      if (response.status === 201) {
        setShow(false);
      }
    });
  }

  useEffect(() => {
    FetchBills();
    FetchCategories();
    setSelectedDate(moment(Date.now()));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (bills.length > 0) setSelectedBill(bills[0].pk_bill);
  }, [bills]);
  useEffect(() => {
    if (categories.length > 0) setSelectedCategory(categories[0].pk_category);
  }, [categories]);
  useEffect(() => {
    if (props.forBusiness) {
      if (kind === "INCOME") setSubKind("NON_CASH");
      if (kind === "SPENDING") setSubKind("REGULAR_SPENDING");
    }
  }, [kind]);

  return (
    <Modal
      show={props.show && show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Новий запис
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={createRecord}>
          <ButtonGroup toggle className="w-100 mb-3">
            {kindOption.map((option) => (
              <ToggleButton
                key={option.value}
                id={`radio-${option.value}`}
                type="radio"
                variant={option.variant}
                name="options"
                value={option.value}
                checked={kind === option.value}
                onChange={(event) => setKind(event.target.value)}
              >
                {option.label}
              </ToggleButton>
            ))}
          </ButtonGroup>

          {props.forBusiness ? (
            <BusinessRecordSubKinds
              kind={kind}
              subKind={subKind}
              setSubKind={setSubKind}
            />
          ) : null}

          <Form.Group className="mb-3">
            <Form.Label>Рахунок</Form.Label>
            <Form.Select
              value={selectedBill}
              onChange={(event) => setSelectedBill(event.target.value)}
            >
              {bills.map((bill) => (
                <option key={bill.pk_bill} value={bill.pk_bill}>
                  {bill.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <FormGroup className="mb-3">
            <Form.Label>Категорія</Form.Label>
            <Form.Select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
            >
              {categories.map((category) => (
                <>
                  <option
                    key={category.pk_user_category}
                    value={category.pk_user_category}
                  >
                    {category.name}
                  </option>
                  {category.child_categories ? (
                    <>
                      {category.child_categories.map((child_category) => (
                        <option
                          key={child_category.pk_user_category}
                          value={child_category.pk_user_category}
                        >
                          {"-  " + child_category.name}
                        </option>
                      ))}
                    </>
                  ) : null}
                </>
              ))}
            </Form.Select>
          </FormGroup>

          <Form.Group className="mb-3">
            <Form.Label>Сума</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Сума"
              min="0"
              step="0.01"
              oninput="validity.valid||(value='');"
              onKeyPress={(event) => {
                if (event.key === "-") event.preventDefault();
              }}
              onChange={(event) => {
                setAmount(Number(event.target.value));
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Коментар</Form.Label>
            <Form.Control
              type="text"
              placeholder="Коментар"
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Валюта</Form.Label>
            <Form.Select
              value={currency}
              onChange={(event) => setCurrency(event.target.value)}
            >
              <option key="UAH" value="UAH">
                UAH
              </option>
              <option key="USD" value="USD">
                USD
              </option>
            </Form.Select>
          </Form.Group>

          <Datetime
            className="mb-3"
            value={selectedDate}
            onChange={(event) => {
              return setSelectedDate(event);
            }}
            dateFormat="D MMM Y р.,"
            locale="uk"
          />
          <Button type="submit" className="w-100">
            Створити
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddRecordModal;
