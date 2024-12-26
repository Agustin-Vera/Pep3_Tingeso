import { useEffect, useState } from "react";
import userService from "../services/userService";
import creditApplicationService from "../services/creditApplicationService";
import { useNavigate } from "react-router-dom";
import documentService from "../services/documentService";
import FirstHome from "./formsCreditApplication/FirstHome";
import SecondHome from "./formsCreditApplication/SecondHome";
import CommercialProperty from "./formsCreditApplication/CommercialProperty";
import Remodeling from "./formsCreditApplication/Remodeling";

const AddCreditApplication = () => {
  const [rutUser, setRutUser] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");

  // Documentos (todos los tipo de credito)
  const [identificationDoc, setIdentificationDoc] = useState("");
  const [appraisalCertificateDoc, setAppraisalCertificateDoc] = useState("");
  const [proofIncomeDoc, setProofIncomeDoc] = useState("");

  // Documentos (tipo de credito 1 y 2)
  const [creditHistoryDoc, setCreditHistoryDoc] = useState("");

  // Documentos (tipo de credito 2)
  const [firstHomeDeedDoc, setFirstHomeDeedDoc] = useState("");

  // Documentos (tipo de credito 3)
  const [financialStatusBusinessDoc, setFinancialStatusBusinessDoc] =
    useState("");
  const [businessPlanDoc, setBusinessPlanDoc] = useState("");

  // Documentos (tipo de credito 4)
  const [renovationBudgetDoc, setRenovationBudgetDoc] = useState("");

  const navigate = useNavigate();

  const saveCreditApplication = (e) => {
    e.preventDefault();

    const creditApplication = {
      rutUser,
      type,
      amount,
      term,
    };
    if (
      rutUser &&
      type &&
      amount &&
      term &&
      appraisalCertificateDoc &&
      proofIncomeDoc
    ) {
      creditApplicationService
        .create(creditApplication)
        .then((response) => {
          console.log("Solicitud Crediticia creada", response.data);
          const formData = new FormData();
          formData.append("idApplication", response.data.id_application);
          formData.append("documents", identificationDoc);
          formData.append("documentType", 1);
          formData.append("documents", proofIncomeDoc);
          formData.append("documentType", 2);
          formData.append("documents", appraisalCertificateDoc);
          formData.append("documentType", 3);
          if (type === "1") {
            formData.append("documents", creditHistoryDoc);
            formData.append("documentType", 4);
          } else if (type === "2") {
            formData.append("documents", creditHistoryDoc);
            formData.append("documentType", 4);
            formData.append("documents", firstHomeDeedDoc);
            formData.append("documentType", 5);
          } else if (type === "3") {
            formData.append("documents", financialStatusBusinessDoc);
            formData.append("documentType", 6);
            formData.append("documents", businessPlanDoc);
            formData.append("documentType", 7);
          } else if (type === "4") {
            formData.append("documents", renovationBudgetDoc);
            formData.append("documentType", 8);
          }
          console.log("Documentos a subir", formData);
          console.log("Documentos a subir", formData.getAll("documents"));
          documentService
            .create(formData)
            .then((response) => {
              console.log("Documento subido", response.data);
              navigate("/creditApplication/list");
            })
            .catch((error) => {
              console.log("Error al intentar subir los documentos", error);
            });
        })
        .catch((error) => {
          console.log(
            "Error al intentar crear una solicitud crediticia",
            error
          );
          alert(error.response.data);
        });
    }
    console.log("Ingresar los campos faltantes");
  };

  useEffect(() => {}, []);
  return (
    <>
      <h1>Solicitud de Crédito</h1>
      <form>
        <h2>Información Personal</h2>
        <div>
          <label>Ingrese su rut:</label>
          <input
            type="text"
            value={rutUser}
            onChange={(e) => setRutUser(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="archivo">
            Ingrese Documento de Identificación Personal:
          </label>
          <input
            type="file"
            id="archivo"
            name="identificationDoc"
            accept="application/pdf"
            onChange={(e) => {
              setIdentificationDoc(e.target.files[0]);
            }}
          />
        </div>
        <div>
          <label>Ingrese el monto a solicitar:</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="archivo">Ingrese Comprobante de Ingresos:</label>
          <input
            type="file"
            id="archivo"
            name="proofIncomeDoc"
            accept="application/pdf"
            onChange={(e) => {
              setProofIncomeDoc(e.target.files[0]);
            }}
          />
        </div>
        <br />
        <h2>Información Financiera Personal</h2>
        <div>
          <label htmlFor="archivo">Ingresar Certificado de Avalúo:</label>
          <input
            type="file"
            id="archivo"
            name="appraisalCertificateDoc"
            accept="application/pdf"
            onChange={(e) => {
              setAppraisalCertificateDoc(e.target.files[0]);
            }}
          />
        </div>
        <div>
          <label>Ingrese el Plazo (en años):</label>
          <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>
        <br />
        <h2>Información Crediticia</h2>
        <div>
          <label>Tipo de Crédito:</label>
          <select
            id="dropdown"
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <option value="">Selecciona el Tipo de Crédito</option>
            <option value={1}>Primera Vivienda</option>
            <option value={2}>Segunda Vivienda</option>
            <option value={3}>Propiedades Comerciales</option>
            <option value={4}>Remodelación</option>
          </select>
        </div>
        <br />
        {type === "1" && (
          <>
            <FirstHome setCreditHistoryDoc={setCreditHistoryDoc} />
          </>
        )}
        {type === "2" && (
          <>
            <SecondHome
              setCreditHistoryDoc={setCreditHistoryDoc}
              setFirstHomeDeedDoc={setFirstHomeDeedDoc}
            />
          </>
        )}
        {type === "3" && (
          <>
            <CommercialProperty
              setFinancialStatusBusinessDoc={setFinancialStatusBusinessDoc}
              setBusinessPlanDoc={setBusinessPlanDoc}
            />
          </>
        )}
        {type === "4" && (
          <>
            <Remodeling setRenovationBudgetDoc={setRenovationBudgetDoc} />
          </>
        )}
      </form>
      <br />
      <div className="col-12">
        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => saveCreditApplication(e)}
        >
          Enviar Solicitud
        </button>
      </div>
    </>
  );
};

export default AddCreditApplication;
