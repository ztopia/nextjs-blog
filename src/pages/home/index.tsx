import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "antd";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import SelectLanguage from "../../components/SelectLanguage";
import {
  getContractList,
  selectContractList,
} from "../../store/modules/contractSlice";
import { useAppDispatch, useAppSelector } from "../..//store/hook";

const Homepage = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const contractList = useAppSelector(selectContractList);

  useEffect(() => {
    dispatch(getContractList());
  }, [dispatch, getContractList]);

  return (
    <>
      <Button>
        {t("changei18n")}:<span>{router.locale}</span>
      </Button>
      <SelectLanguage />
      {contractList.map((item: any) => {
        return <div key={item?.contractId}>{item?.symbol}</div>;
      })}
    </>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "home"])),
  },
});

export default Homepage;
