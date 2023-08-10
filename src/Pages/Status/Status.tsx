import React, { useState, useEffect } from "react";
import styles from "./Status.module.css";
import Input from "../../Components/Forms/Input";
import Button from "../../Components/Forms/Button";
import SelectedList from "../../Components/SelectedList/SelectedList";
import Table from "../../Components/Table/Table";
import Loading from "../../Components/Loading/Loading";
import { MdUpload } from "react-icons/md";
import { optionsType } from "../../Components/Helper";
import { fetchPost } from "../../Services/Slices/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetFiles } from "../../Services/Slices/getFilesSlice";
import Snackbar from "../../Components/Snackbar/Snackbar";
import { DayValue } from "@taak/react-modern-calendar-datepicker";
import { ptLocale } from "../../Components/Consts";
import DatePicker from "@taak/react-modern-calendar-datepicker";

const Status = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState<number>(1);
  const [selectedRange, setSelectedRange] = useState<any>({
    file: File,
    type: [],
    time: "",
    code: "",
  });
  const [isDispatched, setIsDispatched] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const post = useSelector((state: any) => state.postSlice);
  const getFiles = useSelector((state: any) => state.getFilesSlice);
  const deleteFile = useSelector((state: any) => state.deleteFileSlice);
  const [day, setDay] = React.useState<DayValue>(null);
  const columns = [
    { title: "Nome", property: "name" },
    { title: "Data", property: "date" },
    { title: "Arquivo", property: "presigned_url" },
    { title: "Excluir", property: "delete" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const { name, value } = e.target;
    if (name === "date") {
      setSelectedRange((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setSelectedRange((prev: any) => {
        if (Array.isArray(prev[name])) {
          return {
            ...prev,
            [name]: [...prev[name], value],
          };
        }
        return {
          ...prev,
          [name]: value,
        };
      });
    }
  };

  const handleTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const numericValue = value.replace(/\D/g, "").toString();

    if (numericValue.length > 0 && parseInt(numericValue[0], 10) > 2) {
      return;
    }

    if (numericValue.length > 0 && parseInt(numericValue[2], 10) > 5) {
      return;
    }

    if (numericValue === "") {
      setSelectedRange((prev: any) => ({
        ...prev,
        time: "",
      }));
      return;
    }

    let formattedValue = numericValue;
    if (numericValue.length > 2 && !numericValue.includes(":")) {
      formattedValue = numericValue.slice(0, 2) + ":" + numericValue.slice(2);
    }

    if (formattedValue.length > 5) {
      formattedValue = formattedValue.substring(0, 5);
    }

    setSelectedRange((prev: any) => ({
      ...prev,
      time: formattedValue,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setSelectedFile(file);
  };

  const formatDate = (date: any) => {
    const day = date.day < 10 ? `0${date.day}` : date.day;
    const month = date.month < 10 ? `0${date.month}` : date.month;
    return `${day}-${month}-${date.year}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    const postType = selectedRange.type.join(",");
    formData.append("post_type", postType);
    formData.append("date", formatDate(day));
    formData.append("hour", selectedRange.time);
    formData.append("number", selectedRange.code);
    dispatch<any>(fetchPost(formData));
  };

  const transformedData = getFiles?.data?.results?.map((item: any) => {
    const fileNameMatch = item.file_name.match(/name=(.*?)\./);
    const fileName = fileNameMatch ? fileNameMatch[1] : "Unknown File";

    const dateMatch = fileName.match(/date=(.*?)---/);
    const date = dateMatch ? dateMatch[1].replace(/-/g, "/") : "Unknown Date";

    const newFileNameMatch = item.file_name.match(/file=(.*?)\./);
    const newFileName = newFileNameMatch
      ? newFileNameMatch[1].replace("_", " ")
      : "Unknown File";

    return {
      name: newFileName,
      date: date,
      presigned_url: item.presigned_url,
      delete: item.file_name.replace("files/", ""),
    };
  });

  useEffect(() => {
    dispatch<any>(fetchGetFiles(page.toString()));
    setIsDispatched(true);
  }, [dispatch, page, deleteFile?.data?.response]);

  if (post.loading || getFiles.loading)
    return (
      <div
        style={{
          display: "flex",
          height: "50vw",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loading size="5rem" type="spin" />
      </div>
    );
  if (post.error || getFiles.error) {
    setTimeout(() => {
      window.location.reload();
    }, 0.000001);
  }

  return (
    <div className={styles.container}>
      {post.error && <Snackbar type="postError" />}
      <div className={styles.postContainer}>
        <div className={`${selectedFile ? styles.fileContainer : ""}`}>
          <label
            style={{ cursor: "pointer" }}
            className={styles.fakeInput}
            htmlFor="file"
          >
            <MdUpload size={24} />
          </label>
          <Input
            className={styles.file}
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
          />
          {selectedFile && (
            <div className={styles.fileText}>Arquivo: {selectedFile.name}</div>
          )}
        </div>
        <div className={styles.calendarContainer}>
          <DatePicker
            value={day}
            onChange={setDay}
            shouldHighlightWeekends
            colorPrimary="#9fc54d"
            colorPrimaryLight="#d7ecbd"
            locale={ptLocale}
            calendarClassName={styles.calendar}
          />
        </div>
        <SelectedList
          placeholder="Tipo"
          field="type"
          list={selectedRange}
          setList={setSelectedRange}
          options={optionsType}
          isType
          readOnly
        />
        <div>
          <Input
            className={styles.time}
            name="time"
            value={selectedRange.time}
            onChange={handleTime}
            placeholder="Horário"
          />
        </div>

        <div className={styles.lastColumn}>
          <Input
            className={`${styles.input} ${styles.code}`}
            placeholder="Número"
            value={selectedRange.code}
            onChange={handleChange}
            name="code"
            max={5}
          />
          <Button
            className={`${styles.button} ${styles.schedule}`}
            onClick={handleSubmit}
          >
            Agendar
          </Button>
        </div>
      </div>
      {transformedData && (
        <div className={styles.table}>
          <Table
            title="Edições Agendadas"
            columns={columns}
            data={transformedData}
            setPage={setPage}
            page={page}
            total={getFiles.data.count}
            downloadButton
            isEmpty={isDispatched && getFiles.data.length === 0}
            isStatus
          />
        </div>
      )}
    </div>
  );
};

export default Status;
