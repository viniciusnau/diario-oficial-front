import React, { useEffect, useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFileContent } from '../../Services/Slices/fileContentSlice';
import Snackbar from '../../Components/Snackbar/Snackbar';
import styles from './PDFViewer.module.css';

const PDFViewer = () => {
    const { fileKey } = useParams<{ fileKey: string }>();
    const dispatch = useDispatch();
    const {data, loading, error} = useSelector((state: any) => state.fileContentSlice);
    const [pdfContent, setPdfContent] = useState<string | null>(null);

    useEffect(() => {
      if (fileKey) {
        dispatch<any>(fetchFileContent(fileKey));
      }
    }, [dispatch, fileKey]);

    return (
        <div className={styles.pdfContainer}>
            {error && (
                <Snackbar type="error" setSnackbarType={setPdfContent} />
            )}
            {data ? (
                <div className={styles.pdfWrapper}>
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                        <Viewer fileUrl={`data:application/pdf;base64,${data}`} />
                    </Worker>
                </div>
            ) : (
                <div>Loading PDF...</div>
            )}
        </div>
    );
};

export default PDFViewer;
