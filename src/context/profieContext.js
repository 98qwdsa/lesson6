import React from "react";

const profile = {
  name: "zijian.xie",
  email: "zijian.xie@accenture.com"
};
export default profile;
export const NameContext = React.createContext({
  name: profile.name,
  changeName: () => {}
});
export const EmailContext = React.createContext(profile.email);
