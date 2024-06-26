import React, { useEffect, useState } from "react";
import styles from "./Table.module.css";
import Pagination from "rc-pagination";
import Button from "../Forms/Button";
import { MdContentCopy, MdDelete, MdDownload } from "react-icons/md";
import services from "../../Services/services";
import { fetchDeleteFile } from "../../Services/Slices/deleteFileSlice";
import { useDispatch } from "react-redux";
import Loading from "../Loading/Loading";
import { fetchDeletePublishedFile } from "../../Services/Slices/deletePublishedFileSlice";
import Snackbar from "../Snackbar/Snackbar";
import { handleExtractUrl, returnHandleExtractUrl } from "../Helper";

interface TableProps {
  title?: string;
  columns: any;
  data: any;
  setPage: any;
  page: any;
  downloadButton?: boolean;
  total?: number;
  isEmpty?: boolean;
  isStatus?: boolean;
  loading?: boolean;
  error?: boolean;
}

const Table: React.FC<TableProps> = ({
  title,
  columns,
  data,
  setPage,
  page,
  downloadButton,
  total,
  isEmpty,
  isStatus,
  loading,
  error,
}) => {
  const [currentPage] = useState<number>(1);
  const [isResponsive, setIsResponsive] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const dispatch = useDispatch<any>();

  const handleDeletePublishedFile = (row: any) => {
    const extractedUrl = returnHandleExtractUrl(row.presigned_url);
    dispatch(fetchDeletePublishedFile(extractedUrl ? extractedUrl : ""));
  };

  const handleDownloadFile = (file: string) => {
    const a = document.createElement("a");
    a.href = file;
    a.download = "downloadedFile.pdf";
    a.click();
  };

  const handleDownloadTemplate = async () => {
    const file_name = "DIÁRIO OFICIAL Modelo.docx";
    const file = await services.downloadFiles(file_name);
    const a = document.createElement("a");
    a.href = file?.data?.url;
    a.download = "template.pdf";
    a.click();
  };

  const handleCopyText = (value: any) => {
    const textArea = document.createElement("textarea");
    textArea.value = value;
    document.body.appendChild(textArea);
    textArea.select();

    document.execCommand("copy");
    document.body.removeChild(textArea);
    setShowSnackbar(true);
    setTimeout(() => {
      setShowSnackbar(false);
    }, 4000);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsResponsive(window.innerWidth <= 750);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const liElements = document.querySelectorAll(
      "li[class*='rc-pagination-item']"
    );

    liElements.forEach((li) => {
      li.setAttribute("title", "");
    });

    const prevElement = document.querySelector("li.rc-pagination-prev");
    const nextElement = document.querySelector("li.rc-pagination-next");

    if (prevElement) {
      prevElement.setAttribute("title", "");
    }

    if (nextElement) {
      nextElement.setAttribute("title", "");
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const customItemRender = (current: number, type: string) => {
    if (type === "page") {
      return (
        current === currentPage && (
          <span className={styles.currentPage}>
            {data?.length > 0 ? page : "0"}
          </span>
        )
      );
    }
    if (type === "prev") {
      return (
        <Button className={styles.backButton} title="Voltar">
          Voltar
        </Button>
      );
    }
    if (type === "next") {
      return (
        <Button className={styles.backButton} title="Avançar">
          Avançar
        </Button>
      );
    }
    return null;
  };

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        {title && <div className={styles.headerTable}>{title}</div>}
        {downloadButton && (
          <Button
            className={styles.downloadButton}
            onClick={handleDownloadTemplate}
            alt="Baixar template"
          >
            <MdDownload size={isResponsive ? 18 : 24} />
          </Button>
        )}
      </div>
      <div className={styles.container}>
        <div className={styles.tableHeader}>
          {columns.map((column: any, index: any) => (
            <div key={index} className={styles.columnHeader}>
              <div className={styles.columnTitle}>{column.title}</div>
            </div>
          ))}
        </div>
        <div className={styles.tableBody}>
          {loading ? (
            <div style={{ marginBottom: "3rem" }}>
              <Loading size="5rem" type="spin" />
            </div>
          ) : (
            <>
              {isEmpty || error ? (
                <div className={styles.empty}>
                  {isEmpty
                    ? "Não foi encontrado nenhum conteúdo"
                    : "Não foi possível carregar as informações!"}
                </div>
              ) : (
                <>
                  {data?.map((row: any, rowIndex: any) => (
                    <div key={rowIndex} className={styles.tableRow}>
                      {columns.map((column: any, columnIndex: any) => (
                        <div key={columnIndex} className={styles.row}>
                          {column.property === "presigned_url" ? (
                            <Button
                              onClick={() =>
                                handleDownloadFile(row[column.property])
                              }
                              className={styles.button}
                            >
                              <MdDownload size={isResponsive ? 18 : 24} />
                            </Button>
                          ) : column.property === "url" ? (
                            <div className={styles.tableCell}>
                              <Button
                                onClick={() => {
                                  handleCopyText(row[column.property]);
                                }}
                                className={styles.button}
                              >
                                <MdContentCopy size={isResponsive ? 18 : 24} />
                              </Button>
                            </div>
                          ) : column.property === "delete" ||
                            column.property === "deletePublished" ? (
                            <Button
                              onClick={() =>
                                column.property === "delete"
                                  ? dispatch(fetchDeleteFile(row.delete))
                                  : handleDeletePublishedFile(row)
                              }
                              className={styles.button}
                            >
                              <MdDelete size={isResponsive ? 18 : 24} />
                            </Button>
                          ) : (
                            <div className={styles.tableCell}>
                              {row[column.property]}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>
      <div className={styles.pagination}>
        <Pagination
          current={page}
          onChange={handlePageChange}
          total={total}
          pageSize={5}
          className={styles.customPagination}
          itemRender={customItemRender}
        />
      </div>
      {showSnackbar && <Snackbar type="copySuccess" />}
    </div>
  );
};

export default Table;
