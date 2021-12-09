import "semantic-ui-css/semantic.min.css";
import Layout from "../../components/Layout";
import { Button, Form, Input } from "semantic-ui-react";
import { useState } from "react";
import web3 from "../../ethereum/web3";
import VoteContract from "../../ethereum/vote";
import { Router } from "../../routes";
const Contribute = ({ list }) => {
  const [money, setMoney] = useState("");
  const onSubmit = async (event) => {
    const accounts = await web3.eth.getAccounts();
    event.preventDefault();    
    try {
      await VoteContract.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(money, "ether"),
      });
      Router.pushRoute('/VoteCB');
    } catch (error) {
      console.log(accounts);
    }
  };
  return (
    <Layout>
      <div>
        <h3>List Customer</h3>
        <div>
          <Form onSubmit={onSubmit}>
            <Form.Field>
              <label>Amount to contribute</label>
              <Input
                placeholder="Amount...(Ether)"
                onChange={(event) => setMoney(event.target.value)}
                style = {{ width: '50%'}}
              />
              <Button>CONTRIBUTE</Button>
            </Form.Field>
          </Form>
        </div>
      </div>
      <div>
        <div style={{ textAlign: "center", margin: '50px auto' }}>
          <h3>List customers</h3>
          <ul>
            {list.map((address, i) => (
              <ol key={i}>{address}</ol>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};
Contribute.getInitialProps = async () => {
  const list = await VoteContract.methods.getCustomers().call();
  return { list };
};

export default Contribute;
