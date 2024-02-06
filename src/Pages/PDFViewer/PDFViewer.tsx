import React, { useEffect, useState } from "react";
import { Worker, Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFileContent } from "../../Services/Slices/fileContentSlice";
import Snackbar from "../../Components/Snackbar/Snackbar";
import Loading from "../../Components/Loading/Loading";
import styles from "./PDFViewer.module.css";
import { MdShare } from "react-icons/md";

const PDFViewer = () => {
  const { fileKey } = useParams<{ fileKey: string }>();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: any) => state.fileContentSlice
  );
  const [redirect, setRedirect] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch<any>(fetchFileContent(fileKey));
  }, [dispatch, fileKey]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (error) {
      timer = setTimeout(() => {
        setRedirect(true);
      }, 4000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [error]);

  useEffect(() => {
    if (redirect) {
      navigate("/");
    }
  }, [redirect, navigate]);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setShowSnackbar(true);
        setTimeout(() => {
          setShowSnackbar(false);
        }, 4000);
      })
      .catch((error) => {
        console.error("Erro ao copiar o URL: ", error);
      });
  };

  return (
    <div className={styles.pdfContainer}>
      {error && <Snackbar type="error" />}
      {loading && <Loading size="5rem" type="spin" label="Carregando PDF..." />}
      {data && (
        <div className={styles.pdfWrapper}>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <Viewer
              fileUrl={`data:application/pdf;base64,${data}`}
              defaultScale={SpecialZoomLevel.PageFit}
            />
          </Worker>
          <button className={styles.button} onClick={handleShare}>
            <MdShare size={24} />
          </button>
        </div>
      )}
      {showSnackbar && <Snackbar type="copySuccess" />}{" "}
    </div>
  );
};

export default PDFViewer;
