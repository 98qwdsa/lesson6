import React from "react";

const profile = {
  name: "wenzhuang.yan",
  email: "wenzhuang.yan@accenture.com"
};
export default profile;
export const NameContext = React.createContext({
  name: profile.name,
  changeName: () => {}
});
export const EmailContext = React.createContext(profile.email);
