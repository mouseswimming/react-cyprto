import { useGetCryptoNewsQuery } from "../services/crypotNewsApi";
import { useEffect, useState } from "react";
import moment from "moment";

import Loader from "../components/Loader";

import { Card, Col, Row, Select, Typography, Form } from "antd";
import { useGetCoinsQuery } from "../services/coinGeckoApi";

const { Title } = Typography;
const { Meta } = Card;

const IMAGE_PLACEHOLDER =
  "https://investorplace.com/wp-content/uploads/2022/05/cryptos-1600-1.png";

export default function NewsView({ simplified }) {
  const [news, setNews] = useState([]);
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");

  const count = simplified ? 8 : 20;
  const { data, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
  });

  const { data: coinsData, isFetching: isCoinsFetching } =
    useGetCoinsQuery(count);

  useEffect(() => {
    const filteredData = data?.filter((feed) => feed.body);
    if (filteredData?.length > count) {
      setNews(filteredData?.slice(0, count));
    } else {
      setNews(filteredData);
    }
  }, [data]);

  if (isFetching || isCoinsFetching) return <Loader />;

  const options = [{ label: "Cryptocurrency", value: "Cryptocurrency" }];
  coinsData.forEach((coin) => {
    options.push({ label: coin.name, value: coin.name });
  });

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

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
              defaultValue={newsCategory}
              onChange={(value) => setNewsCategory(value)}
              filterOption={filterOption}
              options={options}
              size="large"
              className="w-1/3"
            />
          </div>
        </div>
      )}

      <Row
        gutter={[16, 16]}
        className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
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
              <a href={coinNew.url} target="_blank" rel="noopener noreferrer">
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
                  rel="noopener noreferrer"
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
