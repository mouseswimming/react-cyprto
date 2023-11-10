import { Route, useNavigate, Routes, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { RiLineChartLine, RiHome3Line, RiNewspaperLine } from "react-icons/ri";
import { TbArrowsExchange } from "react-icons/tb";

import { Layout, Menu } from "antd";
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
  // getItem("Home", "/", <RiHome3Line />),
  // getItem("Crptocurrencies", "/cryptocurrencies", <RiLineChartLine />),
  // getItem("Exchanges", "/exchanges", <TbArrowsExchange />),
  // getItem("News", "/news", <RiNewspaperLine />),
  { label: "Home", key: "/", icon: <RiHome3Line /> },
  {
    label: "Crptocurrencies",
    key: "/cryptocurrencies",
    icon: <RiLineChartLine />,
  },
  { label: "Exchanges", key: "/exchanges", icon: <TbArrowsExchange /> },
  { label: "News", key: "/news", icon: <RiNewspaperLine /> },
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
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="text-3xl font-bold text-white p-4">crypto</div>
          <Menu
            theme="dark"
            selectedKeys={[window.location.pathname]}
            items={items}
            onClick={(e) => navigate(e.key)}
          />
        </Sider>
        <Layout className="overflow-y-auto block">
          <Content className="m-8 clear-both ">
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
            React Crypto Site ©2023 Created by Vivian
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}

export default App;
