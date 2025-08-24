import React from "react";
import { BoxNavigation } from "../../shared/components/BoxNavigation";
import { DefaultHeader } from "../../shared/components";

export class Principal extends React.Component {
  render() {
      return (
        <>
          <DefaultHeader />
          <BoxNavigation />
        </>
      );
  }
}