import { useRouter } from "next/router";
import AmazonsApp from "../amazons/index";

const MatchPage = () => {
  const { matchId } = useRouter().query;

  return <AmazonsApp matchID={matchId as string} playerID={"0"} />;
};
export default MatchPage;
