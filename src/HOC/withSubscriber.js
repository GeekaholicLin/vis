import React from "react";
import { Subscriber } from "react-broadcast";
import { CHANNEL } from "../constant";
export default (mapStateToProps, channel = CHANNEL) => BasicComponent => (
  <Subscriber channel={channel}>
    {context => {
      return <BasicComponent {...mapStateToProps(context)} />;
    }}
  </Subscriber>
);
