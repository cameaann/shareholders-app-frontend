import { useContext } from "react";
// import { getShareholders } from "../services/shareholdersService";
import ShareholdersTable from "./ShareholdersTable";
import { ShareholdersContext } from "./ShareholdersProvider";


const Shareholders = () => {
  const shareholdersList = useContext(ShareholdersContext)

  return (
    <div>
      <ShareholdersTable shareholders={shareholdersList} />
    </div>
  );
};

export default Shareholders;
