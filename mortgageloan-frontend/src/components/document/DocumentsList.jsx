import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import DocumentsView from "./DocumentsView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const DocumentsList = ({ idApplication, loanType }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <h2>Documentos</h2>
      <Accordion
        sx={{
          width: "fit-content",
          backgroundColor: "#e0e0e0",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Ver Documentos</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default DocumentsList;
