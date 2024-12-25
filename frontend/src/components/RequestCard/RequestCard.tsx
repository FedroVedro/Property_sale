import React, { Component } from "react";
import { NavLink, useLocation, useMatch } from "react-router-dom";
import classNames from "classnames";
import { Spin, Image, Card, Typography, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import styles from "./RequestCard.module.css";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/UseAppDispatch";
import { updateRequest } from "../../services/Requests/action";
import { getUserProfile } from "../../services/User/action";
import { useAppSelector } from "../../hooks/UseAppSelector";
import { shallowEqual } from "react-redux";

const { Meta } = Card;
const { Title, Paragraph, Text } = Typography;
// import Navbar from "./Navbar";

export const RequestCard = ({ request, type }: any) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user, userProfile }: any = useAppSelector(
    (store) => ({
      user: store.userReducer.user,
      userProfile: store.userReducer.userProfile,
    }),
    // @ts-ignore
    shallowEqual
  );
  const buttonClick = async (e: any, status: any) => {
    console.log(status, status === "Submitted" ? "Approved" : "Submitted");
    const value = {
      buyer_id: request.buyer.id,
      seller_id: request.seller.id,
      property_id: request.property.id,
      bank_id: request.bank.id,
      date_submitted: request.date_submitted,
      status: status === "Submitted" ? "Approved" : "Submitted",
    };
    console.log(value);

    await dispatch(updateRequest(request.id, value));
    await dispatch(getUserProfile(user.id));

    // setViewEditProfileForm(!viewEditProfileForm);
  };
  const getStatusRu = (status: string) => {
    switch (status) {
      case "Submitted":
        return "Отправлено";
      case "Approved":
        return "Одобрено";
      default:
        return "Нет статуса";
    }
  };
  // console.log("propertyCard", property);
  return (
    <>
      {request && (
        <Card
          // title={team.title}
          hoverable
          style={{ width: "550px", height: "100%", cursor: "default" }}
          bordered={true}
        >
          <div className={styles.card__content}>
            <Typography>
              <Image
                preview={false}
                height={350}
                width={250}
                src={request.property.image_url}
              />
              {type === "accepted" && (
                <Title level={3}>Покупатель: {request.seller.email}</Title>
              )}
              {type === "created" && (
                <Title level={3}>Продавец: {request.seller.email}</Title>
              )}

              <Title level={3}>Недвижимость: {request.property.name}</Title>
              <Title level={3}>Расположение: {request.property.location}</Title>
              <Title level={3}>Банк: {request.bank.name}</Title>
              <Title level={3}>Статус: {getStatusRu(request.status)}</Title>
              {userProfile.role.name === "seller" && (
                <>
                  {request.status === "Submitted" && (
                    <Button
                      type="primary"
                      shape="round"
                      onClick={(e) => buttonClick(e, request.status)}
                    >
                      Одобрить
                    </Button>
                  )}
                  {request.status === "Approved" && (
                    <Button
                      type="primary"
                      shape="round"
                      danger
                      onClick={(e) => buttonClick(e, request.status)}
                    >
                      Отклонить
                    </Button>
                  )}
                </>
              )}
            </Typography>
          </div>
        </Card>
      )}
    </>
  );
};

export default RequestCard;
