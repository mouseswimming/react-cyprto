import { Route, useNavigate, Routes, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { RiLineChartLine, RiHome3Line, RiNewspaperLine } from "react-icons/ri";
import { TbArrowsExchange } from "react-icons/tb";
import { SiHiveBlockchain } from "react-icons/si";

import { Divider, Layout, Menu } from "antd";
const { Content, Footer, Sider } = Layout;

import "./App.css";

import HomeView from "./pages/HomeView";
import ExchangeView from "./pages/ExchangeView";
import CryptoCurrenciesView from "./pages/CryptoCurrenciesView";
import CryptoDetailView from "./pages/CryptoDetailView";
import NewsView from "./pages/NewsView";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Home", "/", <RiHome3Line />),
  { type: "divider" },
  getItem("Crptocurrencies", "/cryptocurrencies", <RiLineChartLine />),
  { type: "divider" },
  getItem("Exchanges", "/exchanges", <TbArrowsExchange />),
  { type: "divider" },
  getItem("News", "/news", <RiNewspaperLine />),
];

function App() {
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();

  const selectMenu = (e) => {
    navigate(e.key);
  };

  return (
    <>
      <Layout className="h-screen overflow-clip">
        <Sider
          collapsible
          breakpoint="md"
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          {!collapsed && (
            <Link
              to={"/"}
              className="text-3xl font-medium text-white p-4 flex items-center gap-1"
            >
              <SiHiveBlockchain /> Crypto
            </Link>
          )}
          {collapsed && (
            <Link
              to={"/"}
              className="text-3xl font-bold text-white p-4 flex items-center justify-center"
            >
              <SiHiveBlockchain />
            </Link>
          )}
          <Divider className="bg-slate-50/30 mt-2" />
          <Menu
            theme="dark"
            selectedKeys={[window.location.pathname]}
            items={items}
            onClick={(e) => navigate(e.key)}
          />
        </Sider>
        <Layout className="overflow-y-auto block">
          <Content className="clear-both max-w-[1503px] mx-auto my-12 px-8">
            <Routes>
              <Route path="/" element={<HomeView />} />
              <Route path="/exchanges" element={<ExchangeView />} />
              <Route
                path="/cryptocurrencies"
                element={<CryptoCurrenciesView />}
              />
              <Route path="/crypto/:coinId" element={<CryptoDetailView />} />
              <Route path="/news" element={<NewsView />} />
            </Routes>
          </Content>
          <Footer className="text-center">
            <p>Crypto Site ©2023 Created by Vivian</p>
            <div className="flex gap-x-4 justify-center">
              <p>
                API:{" "}
                <a href="https://www.coingecko.com/" target="_blank">
                  CoinGecko
                </a>
              </p>
              <p>
                Component Library:{" "}
                <a href="https://ant.design/" target="_blank">
                  Ant.Design
                </a>
              </p>
              <p>
                CSS Frameworkd:{" "}
                <a href="https://tailwindcss.com/" target="_blank">
                  TailWind
                </a>
              </p>
              <p>
                Framework: <a href="https://react.dev/">React</a>
              </p>
            </div>
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}

export default App;
