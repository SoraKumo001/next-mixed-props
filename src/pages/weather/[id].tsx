import { GetMixedProps, useMixedReload } from "@react-libraries/mixed-props";
import Link from "next/link";
import React from "react";
import { Weather } from "../../types/weather";

type Props = {
  weather?: Weather;
  date: string;
};

const Page = ({ weather, date }: Props) => {
  const dispatch = useMixedReload();
  return (
    <>
      <div>
        <button onClick={() => dispatch()}>Reload</button>{" "}
        <Link href="/">
          <a>Return</a>
        </Link>
      </div>
      <div>Update:{new Date(date).toLocaleString()}</div>
      {weather && (
        <>
          <h1>{weather.targetArea}</h1>
          <div>{new Date(weather.reportDatetime).toLocaleString()}</div>
          <div>{weather.headlineText}</div>
          <pre>{weather.text}</pre>
        </>
      )}
    </>
  );
};
const getMixedProps: GetMixedProps<Props> = async ({ query }) => {
  const weather = (await fetch(
    `https://www.jma.go.jp/bosai/forecast/data/overview_forecast/${query.id}.json`
  )
    .then((r) => r.json())
    .catch(() => undefined)) as Weather | undefined;
  return { props: { weather, date: new Date().toISOString() } };
};
Page.getMixedProps = getMixedProps;
export default Page;
