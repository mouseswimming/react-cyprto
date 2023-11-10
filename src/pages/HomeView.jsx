import { Typography, Card, Col, Row, Statistic, Skeleton, Button } from "antd";
import CountUp from "react-countup";
import { useGetCryptosQuery } from "../services/cryptoApi";
import millify from "millify";
import { Link } from "react-router-dom";
import CryptoCurrenciesView from "./CryptoCurrenciesView";
import NewsView from "./NewsView";

const { Title } = Typography;

export default function HomeView() {
  const formatter = (value) => <CountUp end={value} separator="," />;

  const { data, isFetching } = useGetCryptosQuery(12);
  const globalStats = data?.data?.stats;

  const stats = [];
  stats.push(
    {
      title: "Total Market Cap",
      value: millify(globalStats?.totalMarketCap || 0),
      useFormatter: false,
    },
    {
      title: "Total Coins",
      value: globalStats?.totalCoins,
      useFormatter: true,
    },
    {
      title: "Total Exchanges",
      value: globalStats?.totalExchanges,
      useFormatter: true,
    },

    // {
    //   title: "Total 24h Volume",
    //   value: millify(globalStats?.total24hVolume || 0),
    //   useFormatter: false,
    // },
    {
      title: "Total Markets",
      value: globalStats?.totalMarkets,
      useFormatter: true,
    }
  );

  return (
    <>
      <Title level={2}>Global Crypto Stats</Title>
      <Row gutter={[16, 16]}>
        {stats.map((stat) => (
          <Col xs={24} sm={12} lg={6} key={stat.title}>
            <Card bordered={false}>
              {isFetching && <Skeleton active paragraph={{ rows: 1 }} />}
              {!isFetching && (
                <Statistic
                  title={stat.title}
                  value={stat.value}
                  formatter={stat.useFormatter ? formatter : ""}
                />
              )}
            </Card>
          </Col>
        ))}
      </Row>
      {/* top 12 coins */}
      <section className="mt-16">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Top Cryptos In The World</h2>

          <Link to={"/cryptocurrencies"}>
            <Button type="link">show more</Button>
          </Link>
        </header>
        <CryptoCurrenciesView simplified />
      </section>
      {/* top 10 news */}
      <section className="mt-16">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Latest Crypto News</h2>

          <Link to={"/news"}>
            <Button type="link">show more</Button>
          </Link>
        </header>
        <NewsView simplified />
      </section>
    </>
  );
}
