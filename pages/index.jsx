import React from "react";
import Layout from "../components/Layout";
import VoteContract from "../ethereum/vote";
import { useState } from "react";
import { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import styles from "../styles/Home.module.css";
import { Button, Card, Form, Input } from "semantic-ui-react";
import web3 from "../ethereum/web3";

const Home = ({ listIdea }) => {
  const approve = async () => {
    const accounts = await web3.eth.getAccounts();
    const amountWei = web3.utils.toWei('0.0001', 'ether')
    try {
      await VoteContract.methods.approveIdea(0,amountWei).send({
        from: accounts[0],
        value: amountWei
      });
    } catch (error) {
      console.log(error);
    }    
  };
  const RenderIdea = () => {
    const DetailIdea = ({ index }) => {
      const [amount, setAmount] = useState("");
      const onSubmit = async () => {
        const accounts = await web3.eth.getAccounts();
        try {
          await VoteContract.approveIdea(index, amount).send({
            from: accounts[0],
          });
        } catch (error) {
          console.log(error);
        }
      };
      return (
        <Form onSubmit={onSubmit}>
          <Button color="green" style={{ margin: "0 50px" }}>
            Approve
          </Button>
          <Input
            onChange={(event) => setAmount(event.target.value)}
            placeholder="Amount...."
          />
        </Form>
      );
    };
    return (
      <div style={{ border: "1px solid black" }}>
        {listIdea.map((element, i) => (
          <div
            key={i}
            style={{ border: "1px solid black", margin: "10px 50px", radius: '20px' }}
          >
            <ul>
              <ol>Name: {element[0]}</ol>
              <ol>Views: {element[1]}</ol>
              <ol>Total: {element[2]}</ol>
              <ol>Address Recipient: {element[3]} </ol>
              <ol>Percent: {element[4]} %</ol>
            </ul>
            <h3 style={{ textAlign: "center" }}>View to apply this idea</h3>
            <div style={{ textAlign: "center" }}>
              <DetailIdea index={i} />
            </div>
          </div>
        ))}
      </div>
    );
  };

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }
  async function onClick() {
    await requestAccount();
  }
  /* const ListIDEA = () => {
    return(
      listIdea.map((element,i) => <li key={i}>{element.}</li>)
    )
  } */
  return (
    <Layout>
      <Button onClick={approve}>Call Test</Button>
      <div style={{ margin: "100px 0" }}>
        <Button onClick={onClick} floated="right">
          CONNECT METAMASK
        </Button>
        <div>
          <h3>List Customer</h3>
          <div style={{ marginLeft: "0" }}>
            <RenderIdea />
          </div>
        </div>
      </div>
    </Layout>
  );
};
Home.getInitialProps = async () => {
  const lengthIdea = await VoteContract.methods.getListIdea().call();
  const listIdea = await Promise.all(
    Array(parseInt(lengthIdea))
      .fill()
      .map((element, index) => {
        return VoteContract.methods.arIdea(index).call();
      })
  );
  return { listIdea };
};
export default Home;
