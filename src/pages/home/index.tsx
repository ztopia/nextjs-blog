import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "antd";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { queryCommonData } from "../../services/api/contract";

import SelectLanguage from "../../components/SelectLanguage";
import {
  getContractList,
  selectContractList,
} from "../../store/modules/contractSlice";
import { useAppDispatch, useAppSelector } from "../..//store/hook";
// import wrapper from "../../store/store";

const Homepage = ({ contractList }) => {
  const router = useRouter();
  const { t } = useTranslation("common");

  // const dispatch = useAppDispatch();

  // const contractList = useAppSelector(selectContractList);

  // useEffect(() => {
  //   dispatch(getContractList());
  // }, [dispatch, getContractList]);

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

// export const getStaticProps = wrapper.getStaticProps(
//   (store) =>
//     async ({ locale }) => {
//       store.dispatch(getContractList());

//       let props = {
//         props: {
//           ...(await serverSideTranslations(locale, ["common", "home"])),
//         },
//       };
//       return props;
//     }
// );
export const getStaticProps = async ({ locale }) => {
  let fetchContractList = await queryCommonData();
  let contractList = fetchContractList.data.data.contracts;

  let props = {
    props: {
      ...(await serverSideTranslations(locale, ["common", "home"])),
      contractList,
    },
  };
  return props;
};

export default Homepage;
