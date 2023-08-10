import React, { useState } from "react";
import styles from "./Table.module.css";
import Pagination from "rc-pagination";
import Button from "../Forms/Button";
import { MdDelete, MdDownload } from "react-icons/md";
import services from "../../Services/services";
import { fetchDeleteFile } from "../../Services/Slices/deleteFileSlice";
import { useDispatch } from "react-redux";

interface TableProps {
  title?: string;
  columns: any;
  data: any;
  setPage: any;
  page: any;
  downloadButton?: boolean;
  total?: number;
  backup?: any;
  isEmpty?: boolean;
  isStatus?: boolean;
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
}) => {
  const [currentPage] = useState<number>(1);
  const dispatch = useDispatch();

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
    a.href = file.data.url;
    a.download = "template.pdf";
    a.click();
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const customItemRender = (current: number, type: string) => {
    if (type === "page") {
      return current === currentPage && <span>{page}</span>;
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
        <Button
          className={`${styles.backButton} ${styles.status}`}
          title="Avançar"
        >
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
            <MdDownload size={24} />
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
          {isEmpty ? (
            <div className={styles.empty}>
              Não foi encontrado nenhum conteúdo
            </div>
          ) : (
            <>
              {data.map((row: any, rowIndex: any) => (
                <div key={rowIndex} className={styles.tableRow}>
                  {columns.map((column: any, columnIndex: any) => (
                    <div key={columnIndex} className={styles.row}>
                      {column.property === "presigned_url" ? (
                        <Button
                          onClick={() =>
                            handleDownloadFile(row[column.property])
                          }
                          className={`${styles.button} ${styles.download}`}
                        >
                          <MdDownload size={24} />
                        </Button>
                      ) : column.property === "delete" ? (
                        <Button
                          onClick={() =>
                            dispatch<any>(fetchDeleteFile(row.delete))
                          }
                          className={`${styles.button} ${styles.download}`}
                        >
                          <MdDelete size={24} />
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
    </div>
  );
};

export default Table;
