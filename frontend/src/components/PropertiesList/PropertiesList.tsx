import React, { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Spin, Card, Typography, Input, Slider } from "antd";
import { useAppDispatch } from "../../hooks/UseAppDispatch";
import { getPropeties } from "../../services/Properties/action";
import { useAppSelector } from "../../hooks/UseAppSelector";
// import TeamCard from "../../components/TeamCard/TeamCard";

import styles from "./PropertiesList.module.css";
import PropertyCard from "../PropertyCard/PropertyCard";

const PropertiesList = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [filterProperties, setFilterProperties] = useState([])
  useEffect(() => {
    dispatch(getPropeties());
  }, []);
  
  const { properties, getPropertiesRequest }: any = useAppSelector(
    (store) => ({
      properties: store.propertiesReducer.properties,
      getPropertiesRequest: store.propertiesReducer.getPropertiesRequest,
    }),
    // @ts-ignore
    shallowEqual
  );

  useEffect(()=> {
    setFilterProperties(properties)
  }, [properties])

  const handleFilter = (e: any, filter: string) => {
    let items = properties
    if(filter === "name"){
      items = items.filter((item: any) => item.name.includes(e.target.value))
    }
    if(filter === "price"){
      items = items.filter((item: any) => Number(item.price) > e[0] && Number(item.price) < e[1] )
    }
    setFilterProperties(items)
  }
  // console.log("properties", properties)
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Spin
          className={styles.spin}
          spinning={getPropertiesRequest}
          tip="Загрузка"
          size="large"
        >
          <Card style={{ margin: "20px 0 20px 0" }}>
            <div>
              <Input placeholder="Поиск по названию" onChange={(e) =>  handleFilter(e, "name")}/>
              <Slider range min={0} max={20000000} defaultValue={[0, 20000000]} onChange={(e) =>  handleFilter(e, "price")}/>
            </div>
            <div className={styles.content__properties}>
              {filterProperties &&
                filterProperties.map((property: any, key: number) => (
                  <PropertyCard key={key} property={property} />
                ))}
            </div>
          </Card>
        </Spin>
      </div>
    </div>
  );
};

export default PropertiesList;
