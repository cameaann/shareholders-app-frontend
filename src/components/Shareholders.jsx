import ShareholdersTable from "./ShareholdersTable";

const Shareholders = ({shareholdersList}) => {
  return (
    <div>
      <ShareholdersTable shareholders={shareholdersList} />
    </div>
  );
};

export default Shareholders;
