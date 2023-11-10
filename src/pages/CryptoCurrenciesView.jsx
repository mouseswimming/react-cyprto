import millify from "millify";
import { useGetCryptosQuery } from "../services/cryptoApi";
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
  const { data, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredData = data?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setCryptos(filteredData);
  }, [data, searchTerm]);

  if (isFetching) return <Loader />;

  return (
    <>
      {!simplified && (
        <div className="mb-4">
          <Title level={2}>Explore the cryptoeconomy</Title>
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
          <Col xs={24} md={12} lg={8} xl={6} xxl={4} key={coin.uuid}>
            <Link to={`/crypto/${coin.uuid}`}>
              <Card
                title={`${coin.rank}. ${coin.name}`}
                hoverable
                extra={<Avatar src={coin.iconUrl} />}
              >
                <p className="text-sm">Price: ${millify(coin.price)}</p>
                <p className="text-sm">
                  Market Cap: ${millify(coin.marketCap)}
                </p>
                {coin.change > 0 ? (
                  <p className="text-sm ">
                    Daily Change:{" "}
                    <span className="text-green-600">
                      <ArrowUpOutlined />
                      {coin.change}%
                    </span>
                  </p>
                ) : (
                  <p className="text-sm ">
                    Daily Change:{" "}
                    <span className="text-red-600">
                      <ArrowDownOutlined />
                      {coin.change}%
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
