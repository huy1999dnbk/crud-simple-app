import React, {useState} from "react"
import styles from "./styles.module.css"
import {Outlet} from "react-router-dom"
import {MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, VideoCameraOutlined} from "@ant-design/icons"
import {Layout, Menu, theme} from "antd"

const {Header, Sider, Content} = Layout
import {useNavigate} from "react-router-dom"
const ProtectedRoute: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const handleNavigateRoute = (path: string): void => {
    navigate(path)
  }
  const {
    token: {colorBgContainer},
  } = theme.useToken()

  return (
    <Layout className={styles.layoutContainer}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Users",
              onClick: () => handleNavigateRoute("/users"),
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "Products",
              onClick: () => handleNavigateRoute("/products"),
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{padding: 0, background: colorBgContainer}}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: "trigger",
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default ProtectedRoute
