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
import { Upload } from "antd";
import styles from "./CreatePropertyForm.module.css";

import { beforeUpload, convertToBase64 } from "../../utils/uploadImage";
const CreatePropertyForm = ({ form }: any): JSX.Element => {
  const [imageBase, setBaseImage] = useState<string | null | undefined>(null);
  // const [fileList, setFileList] = useState<[string | RcFile | Blob]>();
  // const handleChange = async () => {
  //   const base64: any = await convertToBase64(form.getFieldValue('image_url')[0].originFileObj  );
  //   form.setFieldValue("image_url", base64)
  //   console.log("base64base64base64",    )
  //   // form.setFieldsValue("image_url", base64)
  //   // setBaseImage(base64);
  // };
  return (
    <Form
      form={form}
      name="createProperty"
      autoComplete="off"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 19 }}
      style={{ width: 880 }}
    >
      <Form.Item
        name="name"
        label="Название недвижимости"
        rules={[
          {
            required: true,
            message: "Пожалуйста введите название недвижимости",
          },
          {
            whitespace: true,
            message: "Название недвижимости не может быть пустым",
          },
          {
            min: 3,
            message: "Название недвижимости должно быть больше 3 символов",
          },
        ]}
        hasFeedback
      >
        <Input placeholder="Введите название недвижимости" />
      </Form.Item>
      <Form.Item
        name="location"
        label="Расположение"
        rules={[
          {
            required: true,
            message: "Пожалуйста введите расположение",
          },
          {
            whitespace: true,
            message: "Расположение не может быть пустым",
          },
          {
            min: 3,
            message: "Расположение должно быть больше 3 символов",
          },
        ]}
        hasFeedback
      >
        <Input placeholder="Введите расположение" />
      </Form.Item>
      <Form.Item
        name="description"
        label="Описание"
        rules={[
          {
            required: true,
            message: "Пожалуйста введите описание",
          },
          {
            whitespace: true,
            message: "Описание не может быть пустым",
          },
        ]}
        hasFeedback
      >
        <Input.TextArea
          placeholder="Введите описание"
          autoSize={{ minRows: 2, maxRows: 6 }}
        />
      </Form.Item>
      <Form.Item
        name="price"
        label="Цена"
        rules={[
          {
            required: true,
            message: "Пожалуйста введите цену",
          },
        ]}
        hasFeedback
      >
        <InputNumber min={0} defaultValue={0} />
      </Form.Item>
      <Form.Item
        name="image_url"
        label="Фото недвижимости"
        rules={[
          {
            required: true,
            message: "Пожалуйста, загрузите изображение",
          },
        ]}
        hasFeedback
      >
        <Upload
          name="image_url"
          listType="picture-card"
          maxCount={1}
          showUploadList={false}
          customRequest={async (info) => {
            const base64: any = await convertToBase64(info.file);
            form.setFieldValue("image_url", base64); // Устанавливаем значение Base64
            setBaseImage(base64);
          }}
        >
          {imageBase ? (
            <img style={{ width: "100%" }} src={`${imageBase}`} />
          ) : (
            "Загрузить"
          )}
        </Upload>
      </Form.Item>
    </Form>
  );
};

export default CreatePropertyForm;
