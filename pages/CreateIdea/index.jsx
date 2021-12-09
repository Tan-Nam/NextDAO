import web3 from "../../ethereum/web3";
import Layout from "../../components/Layout";
import "semantic-ui-css/semantic.min.css";
import { useState } from "react";
import { Button, Form, Input } from "semantic-ui-react";
import VoteContract from "../../ethereum/vote";
import { Router } from "../../routes";

const Create = () => {
  const [idea, setIdea] = useState("");

  const [address, setAddress] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    await VoteContract.methods.createIdea(idea, address).send({
      from: accounts[0],
    });
    Router.pushRoute('/');
    console.log(VoteContract);
  };
  return (
    <Layout>
      <div>
        <h3>Create IDEA for OWNER</h3>
        <Form onSubmit={onSubmit}>
          <Form.Field>
            <label>Name Idea</label>
            <Input
              placeholder="Name...."
              onChange={(event) => setIdea(event.target.value)}
            />
            <h3>{idea}</h3>
          </Form.Field>
          <Form.Field>
            <label>Address Recipient</label>
            <input
              placeholder="Address...."
              onChange={(event) => setAddress(event.target.value)}
            />
          </Form.Field>
          <Button>SUBMIT</Button>
        </Form>
      </div>
    </Layout>
  );
};

export default Create;
