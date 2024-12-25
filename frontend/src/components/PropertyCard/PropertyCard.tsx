import React, { Component } from "react";
import { NavLink, useLocation, useMatch } from "react-router-dom";
import classNames from "classnames";
import { Spin, Image, Card, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import styles from "./PropertyCard.module.css";
import { Link } from "react-router-dom";

const { Meta } = Card;
const { Title, Paragraph, Text } = Typography;
// import Navbar from "./Navbar";

export const PropertyCard = ({ property }: any) => {
  const location = useLocation();
  // console.log("propertyCard", property);
  return (
    <>
      {property && (
        <Link
          to={`/properties/${property.id}`}
          state={{ background: location }}
        >
          <Card
            // title={team.title}
            hoverable
            style={{ width: "550px", height: "100%" }}
            bordered={true}
          >
            <div className={styles.card__content}>
              
              <Image preview={false} height={350} width={250} src={property.image_url} />
              <Typography>
                <Title level={3}>{property.name}</Title>
                <Paragraph
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 12,
                    justifyContent: "center",
                  }}
                >
                  <Text type="secondary">Цена: {property?.price} руб.</Text>
                </Paragraph>
              </Typography>
            </div>
          </Card>
        </Link>
      )}
    </>
  );
};

export default PropertyCard;
