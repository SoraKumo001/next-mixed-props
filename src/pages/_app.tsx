import { getInitialProps, initMixed } from "@react-libraries/mixed-props";
import { AppProps } from "next/app";

const App = (props: AppProps) => {
  const { Component } = props;
  const mixedProps = initMixed(props);
  return <Component {...mixedProps} />;
};
App.getInitialProps = getInitialProps;
export default App;
