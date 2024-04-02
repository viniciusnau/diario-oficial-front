import React, { useEffect, useRef, useState } from 'react';
import styles from './Home.module.css';
import Search from '../../Components/Search/Search';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../../Components/Table/Table';
import {
<<<<<<< HEAD
  handleExtract,
  handleExtractUrl,
  regulation,
} from "../../Components/Helper";
import { fetchAllPosts } from "../../Services/Slices/allPostsSlice";
import Snackbar from "../../Components/Snackbar/Snackbar";
import { fetchPublic } from "../../Services/Slices/publicSlice";
import { isLoggedIn } from "../../Auth/auth";
=======
    handleExtract,
    handleExtractUrl,
    regulation,
} from '../../Components/Helper';
import { fetchAllPosts } from '../../Services/Slices/allPostsSlice';
import Snackbar from '../../Components/Snackbar/Snackbar';
import { fetchPublic } from '../../Services/Slices/publicSlice';
>>>>>>> f147beecbedf4fb1abc674fe8abb4f33401b9e74

const Home = () => {
    const dispatch = useDispatch();
    const response = useSelector((state: any) => state.publicSlice);
    const allPostsResponse = useSelector((state: any) => state.allPostsSlice);
    const [extracted, setExtracted] = useState<any>([]);
    const [backup, setBackup] = useState<any>({});
    const [page, setPage] = useState<number>(1);
    const [isSearched, setIsSearched] = useState<boolean>(false);
    const [tempPage, setTempPage] = useState<number | null>(null);
    let ref = useRef<boolean>();

<<<<<<< HEAD
  const columns = [
    { title: "Edição", property: "edition" },
    { title: "Publicado", property: "date" },
    { title: "Arquivo", property: "presigned_url" },
    ...(isLoggedIn()
      ? [{ title: "Excluir", property: "deletePublished" }]
      : []),
  ];
=======
    const columns = [
        { title: 'Edição', property: 'edition' },
        { title: 'Publicado', property: 'date' },
        { title: 'Arquivo', property: 'presigned_url' },
        { title: 'Copiar', property: 'url' },
    ];
>>>>>>> f147beecbedf4fb1abc674fe8abb4f33401b9e74

    useEffect(() => {
        if (isSearched) {
            ref.current = true;
        }
    }, [isSearched]);

    useEffect(() => {
        if (!ref.current && !response.data.length && page !== tempPage) {
            dispatch<any>(fetchAllPosts(page.toString(), false));
            setTempPage(page);
        }
    }, [dispatch, ref, page, tempPage, response.data.length]);

    useEffect(() => {
        if (ref.current && page !== tempPage) {
            dispatch<any>(fetchPublic(backup, page.toString()));
            setTempPage(page);
        }
    }, [dispatch, ref, backup, page, tempPage]);

    useEffect(() => {
        setExtracted([]);
        if (!ref.current && !response.data.length) {
            handleExtract(allPostsResponse.data.results, setExtracted);
        } else {
            handleExtractUrl(response.data.results, setExtracted);
        }
    }, [dispatch, isSearched, response.data, allPostsResponse.data]);

    return (
        <div className={styles.container}>
            {isSearched && response.error && response.error.status === 503 && (
                <Snackbar type="searchError" setSnackbarType={setIsSearched} />
            )}

            {isSearched && response.error && response.error.status !== 503 && allPostsResponse.error && (
                <Snackbar type="error" setSnackbarType={setIsSearched} />
            )}

            <p className={styles.regulation}>{regulation}</p>
            <Search
                setBackup={setBackup}
                setSearch={setIsSearched}
                search={isSearched}
                setPage={setPage}
                setTempPage={setTempPage}
            />
            <div className={styles.table}>
                <Table
                    title={
                        ref.current
                            ? `Edições encontradas: ${
                                  response.data.count ? response.data.count : ''
                              }`
                            : 'Últimas edições'
                    }
                    data={extracted}
                    columns={columns}
                    setPage={setPage}
                    page={page}
                    total={
                        ref.current
                            ? response.data.count
                            : allPostsResponse.data.count
                    }
                    isEmpty={
                        (ref.current &&
                            response?.data?.results?.length === 0) ||
                        (!ref.current &&
                            allPostsResponse?.data?.results?.length === 0)
                    }
                    loading={
                        ref.current
                            ? response.loading
                            : allPostsResponse.loading
                    }
                    error={
                        ref.current ? response.error : allPostsResponse.error
                    }
                />
            </div>
        </div>
    );
};

export default Home;
