import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Spin,
  Image,
  Avatar,
  Card,
  Typography,
  Form,
  Button,
  Modal,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
// import { loginUser } from "../../services/User/action";
import { useAppDispatch } from "../../hooks/UseAppDispatch";
import { useAppSelector } from "../../hooks/UseAppSelector";
import {
  clearDetailProperties,
  getDetailProperty,
} from "../../services/Properties/action";
// import EditTeamForm from "../../components/EditTeamForm/EditTeamForm";
// import TeamParticipants from "../../components/TeamParticipants/TeamParticipants";

// import { useRootSelector } from "../../hooks/UseRootSelector";
// import { useAppDispatch } from "../../hooks/UseAppDispatch";
import styles from "./PropertyDetailPage.module.css";
import SendRequestForm from "../../components/SendRequestForm/SendRequestForm";
import { postRequest } from "../../services/Requests/action";
import { postNotification } from "../../services/Notification/action";

const { Meta } = Card;
const { Title, Paragraph, Text } = Typography;
const PropertyDetailPage = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [typeModal, setTypeModal] = useState<string | null>(null);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { user, getPropertyRequest, detailProperty }: any = useAppSelector(
    (store) => ({
      user: store.userReducer.user,
      getPropertyRequest: store.propertiesReducer.getPropertyRequest,
      detailProperty: store.propertiesReducer.detailProperty,
    }),
    // @ts-ignore
    shallowEqual
  );
  // console.log("detailProperty", detailProperty);
  useEffect(() => {
    dispatch(getDetailProperty(id));
    return () => {
      dispatch(clearDetailProperties());
    };
  }, []);
  const [viewEmail, setViewEmail] = useState(false);
  // const buttonClick = () => {
  //   setViewEditTeamForm(!viewEditTeamForm);
  // };
  const showModal = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    type: string
  ) => {
    setIsModalOpen(true);
    setTypeModal(type);
  };
  const handleOk = (values: any) => {
    switch (typeModal) {
      case "sendRequest":
        console.log();
        dispatch(
          postRequest({
            ...values,
            buyer_id: user.id,
            seller_id: detailProperty.seller.id,
            property_id: detailProperty.id,
            status: "Submitted",
            date_submitted: new Date()
          })
        );
        setIsModalOpen(false);

        // console.log("createProperty",{...values, seller_id: user.id} );
        break;
      default:
        break;
    }
    // values.ban_dates = values?.ban_dates?.map((x: any) => {
    //   return x.toDate().toLocaleDateString();
    // });

    // setIsModalOpen(false);
  };
  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
    setTypeModal(null);
  };
  const handleSendRequest = () => {};

  const handleRequestEmailSeller = () => {
    const value = {
      recipient_id: detailProperty.seller.id,
      sender_id: user.id,
      notification_type: "view_email",
      message: `Пользователь ${user.email} просмотрел ваш объект недвижимости: ${detailProperty.name}`
    }
    dispatch(postNotification(value))
    setViewEmail(!viewEmail);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <Spin
            className={styles.spin}
            spinning={getPropertyRequest}
            tip="Загрузка"
            size="large"
          >
            {detailProperty && (
              <div className={styles.content__property}>
                <Card>
                  <div className={styles.property__info__content}>
                    <Image
                      preview={false}
                      height={350}
                      width={250}
                      src={detailProperty.image_url}
                    />
                  </div>
                </Card>
                <Card>
                  <Title level={2}>{detailProperty.name}</Title>
                  <Paragraph
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 12,
                      justifyContent: "center",
                    }}
                  >
                    <Title level={4}>{detailProperty.description}</Title>
                  </Paragraph>
                  <Paragraph
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                      justifyContent: "center",
                      alignItems: "flex-start",
                    }}
                  >
                    <Title level={5}>
                      Расположение: {detailProperty.location}
                    </Title>
                    <Title level={4}>Цена: {detailProperty.price} руб.</Title>
                  </Paragraph>
                  {user && (
                    <div className={styles.buttons}>
                      <Button
                        type="primary"
                        shape="round"
                        onClick={(e) => showModal(e, "sendRequest")}
                      >
                        Отправить заявку на ипотеку
                      </Button>
                      <Button
                        type="primary"
                        shape="round"
                        onClick={handleRequestEmailSeller}
                      >
                        Связаться с продавцом
                      </Button>
                      {viewEmail && (
                        <Paragraph
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 12,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text>{detailProperty.seller.email}</Text>
                        </Paragraph>
                      )}
                    </div>
                  )}
                </Card>
              </div>
            )}
          </Spin>
        </div>
      </div>
      <Modal
        title={"Заявка на ипотеку"}
        okText="Отправить"
        cancelText="Закрыть"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              // console.log(values)
              handleOk(values);
              form.resetFields();
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
        style={{ top: 120, minWidth: 450 }}
        width="fit-content"
        destroyOnClose={true}
      >
        <SendRequestForm form={form} property={detailProperty} />
        {/* {contentModal()} */}
      </Modal>
    </>
  );
};

export default PropertyDetailPage;
