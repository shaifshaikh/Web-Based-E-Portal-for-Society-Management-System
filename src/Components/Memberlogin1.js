import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { MDBBtn } from "mdbreact";
import MemComplaintBoxForm from "./MemComplaintBoxForm.js";
import MemVocational from "./MemVocational.js";
import MemPayment1 from "./MemPayment1.js";
import StripeCheckout from "react-stripe-checkout";

const Memberlogin1 = () => {
  const history = useHistory();
  const [amount, setAmount] = useState(2000);
  const logout = () => {
    localStorage.setItem("token", "");
    history.push("/");
    document.getElementById("navDisplay").style.display = "flex";
  };

  useEffect(() => {
    document.getElementById("navDisplay").style.display = "none";
    getAmount();
  }, []);

  const getAmount = async () => {
    const response = await fetch("/api/resident/getuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.token,
      },
    });

    const json = await response.json();
    const { maintenance } = json;
    setAmount(maintenance);
  };

  const onToken = async (token) => {
    try {
      const response = await fetch("/api/maintenance/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.token,
        },
        body: JSON.stringify({ token, amount }),
      });
      const json = await response.json();
      console.log(json);
      alert("Payment done successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div id="logoutbtn">
        {/* <Link to="/"> */}
        <MDBBtn color="primary" size="lg" onClick={logout}>
          Log Out
        </MDBBtn>
        {/* </Link> */}
      </div>
      <StripeCheckout
        amount={amount * 100}
        currency="INR"
        token={onToken}
        stripeKey="pk_test_51JlbVpSChO663qU8vNGvwdxRmUbtk1DJZwKLXZjZgbt3YG0b3mR9FLvpeUqIvsN9t509ftVowYK86BOok0pmL1Ef0062rVYo12"
      />
      <br />
      <br />
      <MemPayment1 />
      <br />
      <br />

      <MemVocational />
      <br />
      <br />

      <MemComplaintBoxForm />
      <br />
    </div>
  );
};

export default Memberlogin1;
