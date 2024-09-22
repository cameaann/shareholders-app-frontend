import ShareholdersTable from "./ShareholdersTable";


const Shareholders = ({shareholdersList}) => {
console.log(shareholdersList);
  return (
    <div>
      <ShareholdersTable shareholders={shareholdersList} />
    </div>
  );
};

export default Shareholders;
