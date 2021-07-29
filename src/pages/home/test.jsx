import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "antd";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { queryActiveOrder } from "../../services/api/contract";

import SelectLanguage from "../../components/SelectLanguage";
import {
  getContractList,
  selectContractList,
} from "../../store/modules/contractSlice";
import { selectIsLogin } from "../../store/modules/appSlice";
import { useAppDispatch, useAppSelector } from "../..//store/hook";

const Test = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const contractList = useAppSelector(selectContractList);

  useEffect(() => {
    dispatch(getContractList());
  }, [dispatch, getContractList]);

  const isLogin = useAppSelector(selectIsLogin);
  const getLogin = async () => {
    let data = await queryActiveOrder();
  };

  return (
    <>
      {contractList.map((item) => {
        return <div key={item?.contractId}>{item?.symbol}</div>;
      })}
      
      <Button>
        {t("changei18n")}:<span>{router.locale}</span>
      </Button>
      <SelectLanguage />

      <Button onClick={getLogin}>{isLogin ? "登陆了" : "没登录"}</Button>
    </>
  );
};

export const getStaticProps = async ({ locale }) => {
  let props = {
    props: {
      ...(await serverSideTranslations(locale, ["common", "home", "code"])),
    },
  };
  return props;
};

export default Test;
