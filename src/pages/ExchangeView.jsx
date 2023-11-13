import { Collapse, Avatar, Typography } from "antd";
import { useGetExchangesQuery } from "../services/coinGeckoApi";
import millify from "millify";
import Loader from "../components/Loader";

const { Title } = Typography;

let USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function ExchangeView() {
  const { data: exchanges, isFetching } = useGetExchangesQuery();
  if (isFetching) return <Loader />;

  const items = exchanges.map((exchange) => {
    return {
      key: exchange.id,
      label: (
        <div className="grid items-center gap-6 grid-cols-[auto_2fr_1fr_3fr_3fr]">
          <span># {exchange.trust_score_rank}</span>
          <span className="flex gap-1 items-center">
            <Avatar src={exchange.image} />
            {exchange.name}
          </span>
          <span>{exchange.trust_score}</span>
          <span>{USDollar.format(exchange.trade_volume_24h_btc)}</span>
          <span>
            {USDollar.format(exchange.trade_volume_24h_btc_normalized)}
          </span>
        </div>
      ),
      children: (
        <>
          <div className="grid gap-6 px-8">
            <div className="grid grid-cols-3 max-w-3xl">
              <p>
                <span className="text-gray-500">Established year: </span>
                {exchange.year_established}
              </p>
              <p>
                <span className="text-gray-500">Country: </span>
                {exchange.country}
              </p>
              <p>
                <span className="text-gray-500">URL: </span>
                <a
                  href={exchange.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {exchange.url}
                </a>
              </p>
            </div>
            {exchange.description !== "" && (
              <p className="max-w-3xl">{exchange.description}</p>
            )}
          </div>
        </>
      ),
      showArrow: false,
    };
  });

  return (
    <>
      <Title level={2}>Explore Top 100 Exchanges</Title>
      <Collapse items={items} />
    </>
  );
}
