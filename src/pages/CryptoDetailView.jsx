import { useState } from "react";
import { useParams } from "react-router-dom";
import millify from "millify";
import HTMLReactParser from "html-react-parser";

import Loader from "../components/Loader";
import { Tooltip, Avatar, Statistic, Divider, Badge, Segmented } from "antd";
import { BiLinkExternal } from "react-icons/bi";
import { IoInformationCircleOutline } from "react-icons/io5";

import LineChart from "../components/LineChart";
import {
  useGetCoinQuery,
  useGetCoinHistoryQuery,
} from "../services/coinGeckoApi";

export default function CryptoDetailView() {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7");

  const { data: cryptoDetails, isFetching: isDetailFetching } =
    useGetCoinQuery(coinId);
  const { data: coinHistory, isFetching: isHistoryFetching } =
    useGetCoinHistoryQuery({
      coinId,
      timePeriod,
    });

  if (isDetailFetching) return <Loader />;

  const links = cryptoDetails.links.homepage
    .concat(cryptoDetails.links.blockchain_site)
    .filter((link) => link !== "");

  const periodOptions = [
    { label: "24h", value: "1" },
    { label: "7d", value: "7" },
    { label: "30d", value: "30" },
    { label: "3m", value: "90" },
    { label: "1y", value: "365" },
  ];

  const stats = [
    {
      title: (
        <div className="flex items-center gap-2">
          <span>POPULARITY</span>
          <Tooltip title="Popularity is based on the relative market cap of tradable assets on coinranking.com.">
            <Badge count={<IoInformationCircleOutline />} />
          </Tooltip>
        </div>
      ),
      value: `# ${cryptoDetails?.market_cap_rank}`,
    },
    {
      title: (
        <div className="flex items-center gap-2">
          <span>MARKET CAP</span>
          <Tooltip title="Market cap is calculated by multiplying the asset's circulating supply with its current price.">
            <Badge count={<IoInformationCircleOutline />} size="default" />
          </Tooltip>
        </div>
      ),
      value: millify(cryptoDetails?.market_data.market_cap.usd),
      perfix: "USD$",
    },
    {
      title: (
        <div className="flex items-center gap-2">
          <span>VOLUME (24H)</span>
          <Tooltip title="The total dollar value of all transactions for this asset over the past 24 hours. We also show the percent change in volume compared to the previous 24 hours.">
            <Badge count={<IoInformationCircleOutline />} />
          </Tooltip>
        </div>
      ),
      value: millify(cryptoDetails?.market_data.total_volume.usd),
      perfix: "USD$",
    },
    {
      title: (
        <div className="flex items-center gap-2">
          <span>CIRCULATING SUPPLY</span>
          <Tooltip title="Circulating supply shows the number of coins or tokens that have been issued so far. We also show the percent of the maximum supply that has already been issued, if applicable.">
            <Badge count={<IoInformationCircleOutline />} />
          </Tooltip>
        </div>
      ),
      value: millify(cryptoDetails?.market_data.circulating_supply),
    },
    {
      title: (
        <div className="flex items-center gap-2">
          <span>ALL TIME HIGH</span>
          <Tooltip title="The highest price paid for this asset since it was launched or listed.">
            <Badge count={<IoInformationCircleOutline />} />
          </Tooltip>
        </div>
      ),
      value: millify(cryptoDetails?.market_data.ath.usd),
      perfix: "USD$",
    },
    {
      title: (
        <div className="flex items-center gap-2">
          <span>ALL TIME LOW</span>
          <Tooltip title="The lowest price paid for this asset since it was launched or listed.">
            <Badge count={<IoInformationCircleOutline />} />
          </Tooltip>
        </div>
      ),
      value: `$ ${millify(cryptoDetails?.market_data.atl.usd)}`,
    },
    {
      title: (
        <div className="flex items-center gap-2">
          <span>PRICE CHANGE (1D)</span>
          <Tooltip title="The percent change in trading volume for this asset compared to 24 hours ago.">
            <Badge count={<IoInformationCircleOutline />} />
          </Tooltip>
        </div>
      ),
      value: cryptoDetails?.market_data.price_change_percentage_24h,
    },
    {
      title: (
        <div className="flex items-center gap-2">
          <span>PRICE CHANGE (7D)</span>
          <Tooltip title="The percent change in trading volume for this asset compared to 7 days ago.">
            <Badge count={<IoInformationCircleOutline />} />
          </Tooltip>
        </div>
      ),
      value: cryptoDetails?.market_data.price_change_percentage_7d,
    },
  ];

  return (
    <>
      <div className="text-4xl flex gap-1 items-center font-medium mb-8">
        <Avatar src={cryptoDetails.image.large} size={"large"} />
        {cryptoDetails.name} ({cryptoDetails.symbol})
      </div>

      <section className="m-1 border border-gray-200 bg-white">
        {!isHistoryFetching && (
          <>
            <div className="px-8  py-8 relative">
              <Segmented
                options={periodOptions}
                value={timePeriod}
                onChange={(value) => setTimePeriod(value)}
                size="large"
                className="absolute right-8 top-12"
              />
              <LineChart
                currentPrice={parseFloat(
                  cryptoDetails.market_data.current_price.usd
                )}
                coinHistory={coinHistory?.prices}
                periodOption={timePeriod}
              />
            </div>
            <Divider className="bg-slate-200 h-[2px] " />
          </>
        )}

        <div className="px-8 py-8">
          <h2 className="mb-6 text-3xl text-blue-800">Market stats</h2>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Statistic
                key={index}
                title={stat.title}
                value={stat.value}
                precision={2}
              />
            ))}
          </div>
        </div>

        <Divider className="bg-slate-200 h-[2px] " />
        <div className="px-8 py-8">
          <h2 className="mb-6 text-3xl text-blue-800">
            About {cryptoDetails?.name}
          </h2>
          {HTMLReactParser(cryptoDetails?.description.en)}
        </div>

        <Divider className="bg-slate-200 h-[2px] " />
        <div className="px-8 py-8">
          <h2 className="mb-6 text-3xl text-blue-800">Resouce</h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            {links.map((link) => (
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1"
                key={link}
              >
                {link} <BiLinkExternal />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
