import React, { useEffect, useState } from "react";
import { Avatar, Typography, Button, Card, Modal, Form, Spin } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styles from "./ProfilePage.module.css";
import { useAppDispatch } from "../../hooks/UseAppDispatch";
import { useAppSelector } from "../../hooks/UseAppSelector";
import { shallowEqual } from "react-redux";
import { getUserProfile, getUser } from "../../services/User/action";
import EditProfileForm from "../../components/EditProfileForm/EditProfileForm";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import CreatePropertyForm from "../../components/CreatePropertyForm/CreatePropertyForm";
import { postProperty } from "../../services/Properties/action";
import RequestCard from "../../components/RequestCard/RequestCard";
const { Title, Paragraph, Text, Link } = Typography;

const getNameRole = (role: string | null) => {
  switch (role) {
    case "seller":
      return "Продавец";
    case "buyer":
      return "Покупатель";
    default:
      return "Нет роли";
  }
};

const ProfilePage = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [userRole, setUserRole] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [typeModal, setTypeModal] = useState<string | null>(null);

  const { user, userProfile, userProfileRequest }: any = useAppSelector(
    (store) => ({
      user: store.userReducer.user,
      userProfile: store.userReducer.userProfile,
      userProfileRequest: store.userReducer.userProfileRequest,
    }),
    // @ts-ignore
    shallowEqual
  );

  useEffect(() => {
    dispatch(getUserProfile(user.id));
  }, []);

  useEffect(() => {
    if (userProfile) {
      setUserRole(userProfile.role?.name);
    }
  }, [userProfile]);

  const showModal = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    type: string
  ) => {
    setIsModalOpen(true);
    setTypeModal(type);
  };
  const handleOk = (values: any) => {
    switch (typeModal) {
      case "createProperty":
        dispatch(postProperty({ ...values, seller_id: user.id }));
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

  // console.log(user, userProfile[0]);
  // const navigate = useNavigate();
  // const { user }: any = useAppSelector(
  //   (store) => ({
  //     user: store.userReducer.user,
  //   }),
  //   // @ts-ignore
  //   shallowEqual
  // );
  const [viewEditProfileForm, setViewEditProfileForm] = useState(false);
  const buttonClick = () => {
    setViewEditProfileForm(!viewEditProfileForm);
  };

  // const titleModal = () => {
  //   switch (typeModal) {
  //     case "createTeam":
  //       return "Создание команды";
  //     case "createTournament":
  //       return "Создание турнира";
  //     default:
  //       return "Заголовок";
  //   }
  // };

  // const contentModal = () => {
  //   switch (typeModal) {
  //     case "createTeam":
  //       return <CreateTeamForm form={form} />;
  //     case "createTournament":
  //       return <CreateTournamentForm form={form} />;
  //     default:
  //       return "Заголовок";
  //   }
  // };
  // console.log(userProfile);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.profile__info}>
            <Card>
              <Spin
                className={styles.spin}
                spinning={userProfileRequest}
                tip="Загрузка"
                size="large"
              >
                {userProfile && (
                  <div className={styles.profile__info__content}>
                    <UserOutlined />

                    {!viewEditProfileForm ? (
                      <>
                        <Title level={2}>{userProfile.username}</Title>
                        <Text>
                          {userProfile?.email
                            ? userProfile.email
                            : "Email не указан"}
                        </Text>
                        <Paragraph>{getNameRole(userRole)}</Paragraph>
                        <Button
                          type="primary"
                          shape="round"
                          onClick={buttonClick}
                        >
                          Изменить профиль
                        </Button>
                      </>
                    ) : (
                      <EditProfileForm viewEditForm={buttonClick} />
                    )}
                  </div>
                )}
              </Spin>
            </Card>
          </div>
          <div className={styles.profile__main}>
            <Card>
              <Spin
                className={styles.spin}
                spinning={userProfileRequest}
                tip="Загрузка"
                size="large"
              >
                {userRole && userRole === "seller" && (
                  <div className={styles.profile__main__content}>
                    <Button
                      type="primary"
                      onClick={(e) => showModal(e, "createProperty")}
                    >
                      Добавить недвижимость на продажу
                    </Button>
                    <Card type="inner">
                      <Title level={2}>Мои уведомления:</Title>
                      <div className={styles.content__notification}>
                        {userProfile.notifications &&
                          userProfile.notifications.map(
                            (notification: any, key: number) => (
                              <Card>
                                <Title level={4}>{notification.message}</Title>
                              </Card>
                              // <>{</>
                              // <PropertyCard key={key} property={notification} type={"created"}/>
                            )
                          )}
                      </div>
                    </Card>
                    <Card type="inner">
                      <Title level={2}>Моя недвижимость:</Title>
                      <div className={styles.content__properties}>
                        {userProfile.created_properties &&
                          userProfile.created_properties.map(
                            (property: any, key: number) => (
                              <PropertyCard
                                key={key}
                                property={property}
                                type={"created"}
                              />
                            )
                          )}
                      </div>
                    </Card>
                    <Card type="inner">
                      <Title level={2}>Заявки на рассмотрении</Title>
                      <div className={styles.content__properties}>
                        {userProfile.accepted_requests &&
                          userProfile.accepted_requests.map(
                            (request: any, key: number) => (
                              <RequestCard
                                key={key}
                                request={request}
                                type={"accepted"}
                              />
                            )
                          )}
                      </div>
                    </Card>
                    
                  </div>
                )}
                {userRole && userRole === "buyer" && (
                  <div className={styles.profile__main__content}>
                    {/* <Button
                      type="primary"
                      onClick={(e) => showModal(e, "createProperty")}
                    >
                      Добавить недвижимость на продажу
                    </Button> */}
                    <Card type="inner">
                      <Title level={2}>Мои заявки</Title>
                      <div className={styles.content__properties}>
                        {userProfile.created_requests &&
                          userProfile.created_requests.map(
                            (request: any, key: number) => (
                              <RequestCard key={key} request={request} />
                            )
                          )}
                      </div>
                    </Card>
                  </div>
                )}
              </Spin>
            </Card>
          </div>
        </div>
      </div>
      <Modal
        title={"Добавление недвижимости на продажу"}
        okText="Создать"
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
        <CreatePropertyForm form={form} />
        {/* {contentModal()} */}
      </Modal>
    </>
  );
};

export default ProfilePage;
