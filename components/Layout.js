import React from "react";
import { Container } from "semantic-ui-react";
import Header from "./Header";

const Layout = (props) => {
    return(
        <Container>
            <Header style={{ margin: '60px'}}/>
            {props.children}
        </Container>
    )
};

export default Layout;