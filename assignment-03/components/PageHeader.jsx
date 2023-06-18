"use strict";
import React from "react";
import { Card } from "react-bootstrap";

const PageHeader = (props) => {
  return (
    /**
     * Cards
     */

    <Card className="bg-light">
      <br />
      <Card.Body>
        <h3>{props.title}</h3>
        {props.text}
        <div className="float-end">
          {props.showSubscriber && (
            <button className={"Subscriber"} variant="info">
              Subscriber
            </button>
          )}{" "}
          {props.showCustomer && (
            <button className={"Customer btn-primary"}>Customer</button>
          )}
          {props.usertype && (
            <button className={props.usertype}>{props.usertype}</button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default PageHeader;
