import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import Search from "../../Components/Search/Search";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../Components/Table/Table";
import {
  handleExtract,
  handleExtractUrl,
  regulation,
} from "../../Components/Helper";
import { fetchAllPosts } from "../../Services/Slices/allPostsSlice";
import { fetchPublic } from "../../Services/Slices/publicSlice";
import Snackbar from "../../Components/Snackbar/Snackbar";

const Home = () => {
  const dispatch = useDispatch();
  const response = useSelector((state: any) => state.publicSlice);
  const allPostsResponse = useSelector((state: any) => state.allPostsSlice);
  const [isDispatched, setIsDispatched] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [backup, setBackup] = useState<any>({});
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [extracted, setExtracted] = useState<any>([]);
  const columns = [
    { title: "Edição", property: "edition" },
    { title: "Publicado", property: "date" },
    { title: "Arquivo", property: "presigned_url" },
  ];

  useEffect(() => {
    setExtracted([]);
    handleExtractUrl(response.data?.results, setExtracted);
  }, [response.data?.results]);

  useEffect(() => {
    if (!isSearched) {
      dispatch<any>(fetchAllPosts(page.toString(), false));
    }
    if (isSearched) dispatch<any>(fetchPublic(backup, page.toString()));
  }, [dispatch, page, isSearched, backup]);

  useEffect(() => {
    if (allPostsResponse.data) {
      setExtracted([]);
      handleExtract(allPostsResponse.data.results, setExtracted);
      setIsDispatched(true);
    }
  }, [dispatch, allPostsResponse.data]);

  return (
    <div className={styles.container}>
      {isSearched && (response.error || allPostsResponse.error) && (
        <Snackbar type="error" />
      )}
      <p className={styles.regulation}>{regulation}</p>
      <Search setBackup={setBackup} setSearch={setIsSearched} />
      <div className={styles.table}>
        <Table
          title={isSearched ? "Edições encontradas" : "Últimas edições"}
          data={extracted}
          columns={columns}
          setPage={setPage}
          page={page}
          backup={backup}
          total={isSearched ? response.data.count : allPostsResponse.data.count}
          isEmpty={
            (isSearched && response?.data?.results?.length === 0) ||
            (isDispatched && allPostsResponse?.data?.results?.length === 0)
          }
        />
      </div>
    </div>
  );
};

export default Home;
