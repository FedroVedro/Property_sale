import React, { Component } from "react";
import { NavLink, useMatch } from "react-router-dom";

import classNames from "classnames";

import { useState } from "react";
// import {Navbar} from "./Navbar";

import styles from "./AppHeader.module.css";
import { useAppSelector } from "../../hooks/UseAppSelector";
import { shallowEqual } from "react-redux";
import { Button } from "antd";
import { useAppDispatch } from "../../hooks/UseAppDispatch";
import { logoutUser } from "../../services/User/action";
import logo from './logo.png'
import { NavItem } from "./NavItem";

export const AppHeader = () => {
  const isHome = !!useMatch({ path: "/" });
  const isFeed = !!useMatch("/feed");
  const isProfile = !!useMatch("/profile/*");
  const dispatch = useAppDispatch()
  const [active, setActive] = React.useState("home");
  const { user } = useAppSelector(
    (store) => ({
      user: store.userReducer.user,
    }),
    // @ts-ignore
    shallowEqual
  );
  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <header className={styles.header}>
      <nav className={styles.container}>
        <section className={styles.logo}>
          {/* <Logo /> */}
          <img className={styles.logo_image} src={logo} alt="" />
          
            Дом мечты
        </section>
        <section
          className={classNames(styles.navbar, styles["topBotomBordersOut"])}
        >
          <NavItem route_to="/">Недвижимость</NavItem>
        </section>

        <section className={classNames(styles.navbar, styles["topBotomBordersOut"])}>
          {user ? (
            <>
              <NavItem route_to="/profile">Личный кабинет</NavItem>
              {/* <NavItem route_to="/logout">Выход</NavItem> */}
              <Button type="primary" onClick={handleLogout}>
                Выход
              </Button>
              
            </>
          ) : (
            <>
              <NavItem route_to="/register">Регистрация</NavItem>
              <NavItem route_to="/login">Вход</NavItem>
            </>
          )}
        </section>
      </nav>
    </header>
  );
};

export default AppHeader;
