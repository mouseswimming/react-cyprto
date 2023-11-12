import millify from "millify";
import { useGetCoinsQuery } from "../services/coinGeckoApi";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { Card, Col, Row, Avatar, Input, Typography } from "antd";
import {
  SearchOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

export default function CryptoCurrenciesView({ simplified }) {
  const count = simplified ? 12 : 100;
  const { data: coins, isFetching: isCoinsFetching } = useGetCoinsQuery(count);

  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredData = coins?.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setCryptos(filteredData);
  }, [coins, searchTerm]);

  if (isCoinsFetching) return <Loader />;

  return (
    <>
      {!simplified && (
        <div className="mb-8">
          <Title level={2}>Explore Top 100 Cryptocurrencies</Title>
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search for an asset"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-3 rounded-full"
          />
        </div>
      )}
      <Row gutter={[16, 16]}>
        {cryptos?.map((coin) => (
          <Col xs={24} md={12} lg={8} xl={6} xxl={4} key={coin.id}>
            <Link to={`/crypto/${coin.id}`}>
              <Card
                title={`${coin.market_cap_rank}. ${coin.name}`}
                hoverable
                extra={<Avatar src={coin.image} />}
              >
                <p className="text-sm">Price: ${millify(coin.current_price)}</p>
                <p className="text-sm">
                  Market Cap: ${millify(coin.market_cap)}
                </p>
                {coin.price_change_percentage_24h_in_currency > 0 ? (
                  <p className="text-sm ">
                    Daily Change:{" "}
                    <span className="text-green-600">
                      <ArrowUpOutlined />
                      {coin.price_change_percentage_24h_in_currency.toFixed(2)}%
                    </span>
                  </p>
                ) : (
                  <p className="text-sm ">
                    Daily Change:{" "}
                    <span className="text-red-600">
                      <ArrowDownOutlined />
                      {coin.price_change_percentage_24h_in_currency.toFixed(2)}%
                    </span>
                  </p>
                )}
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}
