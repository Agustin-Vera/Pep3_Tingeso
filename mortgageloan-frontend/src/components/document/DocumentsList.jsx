import DocumentsView from "./DocumentsView";

const DocumentsList = ({ idApplication, loanType }) => {
  return (
    <>
      <h2>Documentos</h2>
      <DocumentsView idApplication={idApplication} documentType={1} />
      <DocumentsView idApplication={idApplication} documentType={2} />
      <DocumentsView idApplication={idApplication} documentType={3} />
      {loanType === 1 ? (
        <>
          <DocumentsView idApplication={idApplication} documentType={4} />
        </>
      ) : loanType === 2 ? (
        <>
          <DocumentsView idApplication={idApplication} documentType={4} />
          <DocumentsView idApplication={idApplication} documentType={5} />
        </>
      ) : loanType === 3 ? (
        <>
          <DocumentsView idApplication={idApplication} documentType={6} />
          <DocumentsView idApplication={idApplication} documentType={7} />
        </>
      ) : loanType === 4 ? (
        <>
          <DocumentsView idApplication={idApplication} documentType={8} />
        </>
      ) : null}
    </>
  );
};

export default DocumentsList;
