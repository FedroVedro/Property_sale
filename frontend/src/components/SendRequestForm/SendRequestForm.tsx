import React, { useState, useRef, useEffect } from "react";
import {
  Form,
  Button,
  Card,
  Input,
  Typography,
  Select,
  InputNumber,
} from "antd";
import styles from "./CreatePropertyForm.module.css";
import { useAppDispatch } from "../../hooks/UseAppDispatch";
import { getBanks } from "../../services/Banks/action";
import { useAppSelector } from "../../hooks/UseAppSelector";
import { shallowEqual } from "react-redux";
const { Title, Paragraph, Text, Link } = Typography;

const SendRequestForm = ({ form, property }: any): JSX.Element => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getBanks());
    
  }, []);
  // useEffect(()=>{

  // }, [])
  const { banksOptions }: any = useAppSelector(
    (store) => ({
      banksOptions: store.banksReducer.banksOptions,
    }),
    // @ts-ignore
    shallowEqual
  );
  console.log("form", form.getFieldsValue())
  return (
    <Form
      form={form}
      name="createProperty"
      autoComplete="off"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 19 }}
      style={{ width: 650 }}
    >
      <Form.Item
        name="bank_id"
        label="Выберите банк"
        rules={[
          {
            required: true,
            message: "Пожалуйста введите название недвижимости",
          }
        ]}
        hasFeedback
      >
        <Select
          showSearch
          placeholder="Выберите банк"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={[
            ...banksOptions
          ]}
        />
      </Form.Item>
    </Form>
  );
};

export default SendRequestForm;
