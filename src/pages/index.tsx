import React from "react";
import Link from "next/link";
import { GetMixedProps, useMixedReload } from "@react-libraries/mixed-props";
import { WeatherArea } from "../types/weather";

type Props = { area: WeatherArea; date: string };

const Page = ({ area, date }: Props) => {
  const dispatch = useMixedReload();
  return (
    <>
      <div>
        <button onClick={() => dispatch()}>Reload</button>
      </div>
      <div>Update:{new Date(date).toLocaleString()}</div>
      {area &&
        Object.entries(area.offices).map(([code, { name }]) => (
          <div key={code}>
            <Link href={`/weather/${code}`}>
              <a>{name}</a>
            </Link>
          </div>
        ))}
    </>
  );
};
const getMixedProps: GetMixedProps = async () => {
  const area = (await fetch(
    `https://www.jma.go.jp/bosai/common/const/area.json`
  )
    .then((r) => r.json())
    .catch(() => undefined)) as Promise<WeatherArea | undefined>;
  return { props: { area, date: new Date().toISOString() } };
};
Page.getMixedProps = getMixedProps;
export default Page;
