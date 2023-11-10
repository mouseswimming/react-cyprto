import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCryptoDetailQuery } from "../services/cryptoApi";
import Loader from "../components/Loader";
import millify from "millify";
import { Tooltip, Avatar, Statistic, Divider, Badge } from "antd";

import { InfoCircleOutlined } from "@ant-design/icons";

import { BiLinkExternal } from "react-icons/bi";

export default function CryptoDetailView() {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");

  const { data, isFetching } = useGetCryptoDetailQuery(coinId);

  if (isFetching) return <Loader />;

  const cryptoDetails = data.data.coin;
  console.log({ cryptoDetails });

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: (
        <div className="flex items-center gap-2">
          <span>MARKET CAP</span>
          <Tooltip title="Market cap is calculated by multiplying the asset's circulating supply with its current price.">
            <Badge count={<InfoCircleOutlined />} />
          </Tooltip>
        </div>
      ),
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
    },
    {
      title: (
        <div className="flex items-center gap-2">
          <span>VOLUME (24H)</span>
          <Tooltip title="The total dollar value of all transactions for this asset over the past 24 hours. We also show the percent change in volume compared to the previous 24 hours.">
            <Badge count={<InfoCircleOutlined />} />
          </Tooltip>
        </div>
      ),
      value: `$ ${
        cryptoDetails?.["24hVolume"] && millify(cryptoDetails?.["24hVolume"])
      }`,
    },
    {
      title: (
        <div className="flex items-center gap-2">
          <span>CIRCULATING SUPPLY</span>
          <Tooltip title="Circulating supply shows the number of coins or tokens that have been issued so far. We also show the percent of the maximum supply that has already been issued, if applicable.">
            <Badge count={<InfoCircleOutlined />} />
          </Tooltip>
        </div>
      ),
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
    },
    {
      title: (
        <div className="flex items-center gap-2">
          <span>POPULARITY</span>
          <Tooltip title="Popularity is based on the relative market cap of tradable assets on coinranking.com.">
            <Badge count={<InfoCircleOutlined />} />
          </Tooltip>
        </div>
      ),
      value: `# ${cryptoDetails?.rank}`,
    },
    {
      title: (
        <div className="flex items-center gap-2">
          <span>ALL TIME HIGH</span>
          <Tooltip title="The highest price paid for this asset since it was launched or listed.">
            <Badge count={<InfoCircleOutlined />} />
          </Tooltip>
        </div>
      ),
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
    },
    {
      title: "PRICE CHANGE",
      title: (
        <div className="flex items-center gap-2">
          <span>PRICE CHANGE</span>
          <Tooltip title="The percent change in trading volume for this asset compared to 7 days ago.">
            <Badge count={<InfoCircleOutlined />} />
          </Tooltip>
        </div>
      ),
      value: cryptoDetails?.change,
    },
  ];

  return (
    <>
      <div className="text-3xl flex gap-1 items-center font-medium mb-8">
        <Avatar src={cryptoDetails.iconUrl} size={"large"} />
        {cryptoDetails.name}{" "}
        <span
          style={{
            color: cryptoDetails.color ? cryptoDetails.color : "black",
          }}
        >
          ({cryptoDetails.symbol})
        </span>
      </div>

      <section className="m-1 border border-gray-200 bg-white">
        <div className="px-8 my-8">
          <h2 className="mb-6 text-2xl">Market stats</h2>
          {/* <Divider className="bg-gray-200" /> */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            {stats.map((stat, index) => (
              <Statistic key={index} title={stat.title} value={stat.value} />
            ))}
          </div>
        </div>

        <Divider className="bg-slate-200 h-[2px] " />
        <div className="px-8 py-8">
          <h2 className="mb-6 text-2xl">About {cryptoDetails?.name}</h2>
          {/* <Divider className="bg-gray-200" /> */}
          <div>{cryptoDetails?.description}</div>
        </div>

        <Divider className="bg-slate-200 h-[2px] " />
        <div className="px-8 py-8">
          <h2 className="mb-6 text-2xl">Resouce</h2>
          {/* <Divider className="bg-gray-200" /> */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            {cryptoDetails?.links?.map((link) => (
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1"
              >
                {link.name} <BiLinkExternal />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
