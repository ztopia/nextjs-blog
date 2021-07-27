import { useRouter } from "next/router";

import Image from "next/image";

function ContractTrade({ data }: any) {
  const router = useRouter();

  return <Image src={"/images/test.png"} width={300} height={300} />;
}

export default ContractTrade;
