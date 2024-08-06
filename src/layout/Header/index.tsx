import React from "react";
import "./index.css";
import {
  FacebookOutlined,
  GithubOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  MailOutlined,
} from "@ant-design/icons";

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <nav className="header-nav">
          <ul className="header-nav-list">
            {" "}
            <li className="header-title">
              
                My Wather App
             
            </li>
          </ul>
          <ul className="header-nav-list">
            <li className="header-nav-item">
            <a
                href="mailto:renaquliyevva@gmail.com"
                className="header-nav-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MailOutlined />
              </a>
            </li>
            <li className="header-nav-item">
              <a
                href="https://www.linkedin.com/in/rənaquliyeva"
                className="header-nav-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedinOutlined />
              </a>
            </li>
            <li className="header-nav-item">
              <a
                href="https://github.com/Quliyeva1o"
                className="header-nav-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubOutlined />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
