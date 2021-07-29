import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { queryCommonData } from "../../services/api/contract";
import { setContractList } from "../../store/modules/contractSlice";
import { useAppDispatch, useAppSelector } from "../..//store/hook";

import Test from "./test";

const Homepage = ({ contractList }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setContractList(contractList));
  }, [dispatch]);

  return (
    <>
      <Test />
    </>
  );
};

export const getStaticProps = async ({ locale }) => {
  let fetchContractList = await queryCommonData();
  let contractList = fetchContractList.data.data.contracts;

  let props = {
    props: {
      ...(await serverSideTranslations(locale, ["common", "home", "code"])),
      contractList,
    },
  };
  return props;
};

export default Homepage;
