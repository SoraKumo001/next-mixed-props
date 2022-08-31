import { AppProps } from "next/app";
import { getInitialProps, initMixed } from "@react-libraries/mixed-props";

const App = (props: AppProps) => {
  const { Component } = props;
  const mixedProps = initMixed(props);
  return <Component {...mixedProps} />;
};
App.getInitialProps = getInitialProps;
export default App;
