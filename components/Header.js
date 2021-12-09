import head from "next/head";
import React from "react";
import { Button, Menu } from "semantic-ui-react";
import { Link } from "../routes.js";

const header = () => {
  return (
    <Menu>
      <Menu.Menu>
        <Link href="/">
          <Button color='purple'>Home</Button>
        </Link>
      </Menu.Menu>
      <Menu.Menu style={{ margin: "0 auto" }}>
        <Link href="/CreateIdea">
          <Button color='purple'>Create Idea for HOST</Button>
        </Link>
      </Menu.Menu>
      <Menu.Menu>
        <Link href="/VoteCB">
          <Button style={{ marginRight: "0" }} color='purple'>Page Contribute</Button>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};

export default header;
