import { Typography, Card, Col, Row, Statistic, Skeleton, Button } from "antd";
import CountUp from "react-countup";
import millify from "millify";
import { Link } from "react-router-dom";
import CryptoCurrenciesView from "./CryptoCurrenciesView";
import NewsView from "./NewsView";
import { useGetCoinsQuery, useGetGlobalQuery } from "../services/coinGeckoApi";

const { Title } = Typography;

export default function HomeView() {
  const formatter = (value) => <CountUp end={value} separator="," />;

  const { data: globalStats, isFetching: isStatsFetching } =
    useGetGlobalQuery();

  const stats = [];
  if (!isStatsFetching) {
    stats.push(
      {
        title: "Total Market Cap",
        value: millify(globalStats?.data.total_market_cap.usd),
        useFormatter: false,
      },
      {
        title: "Total Volume",
        value: millify(globalStats?.data.total_volume.usd),
        useFormatter: false,
      },
      {
        title: "Total Markets",
        value: globalStats?.data.markets,
        useFormatter: true,
      },
      {
        title: "Total Coins",
        value: globalStats?.data.active_cryptocurrencies,
        useFormatter: true,
      }
    );
  }

  return (
    <>
      <Title level={2}>Global Crypto Stats</Title>
      <Row gutter={[16, 16]}>
        {stats.map((stat) => (
          <Col xs={24} sm={12} lg={6} key={stat.title}>
            <Card bordered={false}>
              {isStatsFetching && <Skeleton active paragraph={{ rows: 1 }} />}
              {!isStatsFetching && (
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
