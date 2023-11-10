import { useGetCryptoNewsQuery } from "../services/crypotNewsApi";
import { useEffect, useState } from "react";
import moment from "moment";

import Loader from "../components/Loader";

import { Card, Col, Row, Select, Typography, Form } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
const { Title } = Typography;
const { Meta } = Card;

const IMAGE_PLACEHOLDER =
  "https://investorplace.com/wp-content/uploads/2022/05/cryptos-1600-1.png";

export default function NewsView({ simplified }) {
  const [news, setNews] = useState([]);
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");

  const count = simplified ? 6 : 20;
  const { data, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
  });

  const { data: coinsData } = useGetCryptosQuery(100);

  useEffect(() => {
    const filteredData = data?.filter((feed) => feed.body);
    if (filteredData?.length > count) {
      setNews(filteredData?.slice(0, count));
    } else {
      setNews(filteredData);
    }
  }, [data]);

  const [searchTerm, setSearchTerm] = useState("");

  if (isFetching) return <Loader />;

  return (
    <>
      {!simplified && (
        <div className="mb-8 grid">
          <Title level={2}>Latest Crypto News</Title>
          <div>
            <label>Search news for crypto: </label>
            <Select
              showSearch
              placeholder="search news for crypto"
              optionFilterProp="children"
              value={newsCategory}
              onChange={(value) => setNewsCategory(value)}
              filterOption={(input, option) =>
                option.children
                  .toLowerCase()
                  .includes(input.toLocaleLowerCase())
              }
              size="large"
              className="w-1/3"
            >
              <Option value="Cryptocurrency">Cryptocurrency</Option>
              {coinsData?.data?.coins?.map((coin) => (
                <Option key={coin.name} value={coin.name}>
                  {coin.name}
                </Option>
              ))}
            </Select>
          </div>
        </div>
      )}

      <Row
        gutter={[16, 16]}
        className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
      >
        {news?.map((coinNew) => (
          <Col key={coinNew.id}>
            <Card
              hoverable
              cover={
                <img
                  className="aspect-[16/9] object-cover"
                  alt=""
                  src={coinNew.img?.s || IMAGE_PLACEHOLDER}
                />
              }
            >
              <a href={coinNew.url} target="_blank" rel="noreferrer">
                <Meta title={coinNew.title} />
              </a>
              <p className="text-xs text-gray-500 my-2">
                {moment(news.datePublished).startOf("ss").fromNow()}
              </p>
              <p className="line-clamp-3 text-slate-600 my-4">{coinNew.body}</p>
              <div className="text-sm text-blue-800">
                source:
                <a
                  href={`https://${coinNew.domain}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {coinNew.domain}
                </a>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}
