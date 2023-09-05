import React, { useState, useEffect } from "react";
import styles from "./Status.module.css";
import Input from "../../Components/Forms/Input";
import Button from "../../Components/Forms/Button";
import SelectedList from "../../Components/SelectedList/SelectedList";
import Table from "../../Components/Table/Table";
import { MdUpload } from "react-icons/md";
import { formatDateFromObject, optionsType } from "../../Components/Helper";
import { fetchPost } from "../../Services/Slices/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetFiles } from "../../Services/Slices/getFilesSlice";
import Snackbar from "../../Components/Snackbar/Snackbar";
import { ptLocale } from "../../Components/Consts";
import DatePicker from "@taak/react-modern-calendar-datepicker";

const Status = () => {
  const dispatch = useDispatch();
  const post = useSelector((state: any) => state.postSlice);
  const getFiles = useSelector((state: any) => state.getFilesSlice);
  const deleteFile = useSelector((state: any) => state.deleteFileSlice);
  const [page, setPage] = useState<number>(1);
  const [isDispatched, setIsDispatched] = useState<boolean>(false);
  const [snackbarType, setSnackbarType] = useState<string | null>(null);
  const [form, setForm] = useState<any>({
    file: File,
    date: {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      day: 0,
    },
    type: [],
    code: "",
    time: "",
  });

  const columns = [
    { title: "Nome", property: "name" },
    { title: "Data", property: "date" },
    { title: "Arquivo", property: "presigned_url" },
    { title: "Excluir", property: "delete" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const { name, value } = e.target;
    if (name === "date") {
      setForm((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setForm((prev: any) => {
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

    if (
      numericValue.length > 0 &&
      (parseInt(numericValue[0], 10) > 2 || parseInt(numericValue[0], 10) > 2)
    ) {
      return;
    }

    if (numericValue === "") {
      setForm((prev: any) => ({
        ...prev,
        time: "",
      }));
    }

    let formattedValue = numericValue;
    if (numericValue.length > 2 && !numericValue.includes(":")) {
      formattedValue = numericValue.slice(0, 2) + ":" + numericValue.slice(2);
    }

    if (formattedValue.length > 5) {
      formattedValue = formattedValue.substring(0, 5);
    }

    setForm((prev: any) => ({
      ...prev,
      time: formattedValue,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    const fileExtension = file?.name.split(".").pop();
    if (fileExtension === "docx") {
      setForm((prev: any) => ({
        ...prev,
        file: file,
      }));
    } else if (fileExtension !== "docx") {
      setForm((prev: any) => ({
        ...prev,
        file: File,
      }));
      setSnackbarType("fileInvalid");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !form.file.size ||
      form.date.day === 0 ||
      form.type.length === 0 ||
      !form.code
    ) {
      setSnackbarType("postInvalid");
      return;
    }

    const formData = new FormData();
    formData.append("file", form.file);
    formData.append("post_type", form.type.join(","));
    formData.append("date", formatDateFromObject(form.date));
    formData.append("hour", form.time);
    formData.append("number", form.code);
    dispatch<any>(fetchPost(formData));
    setForm({
      file: File,
      date: {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: 0,
      },
      type: [],
      code: "",
      time: "",
    });
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
  console.log("getFiles.error:", getFiles.error);
  return (
    <div className={styles.container}>
      {getFiles.error && (
        <Snackbar type="scheduleError" setSnackbarType={setSnackbarType} />
      )}
      {post.error && (
        <Snackbar type="postError" setSnackbarType={setSnackbarType} />
      )}
      {snackbarType === "fileInvalid" && (
        <Snackbar type="fileInvalid" setSnackbarType={setSnackbarType} />
      )}
      {snackbarType === "postInvalid" && (
        <Snackbar type="postInvalid" setSnackbarType={setSnackbarType} />
      )}
      <div className={styles.postContainer}>
        <div className={`${form.file ? styles.fileContainer : ""}`}>
          <label className={styles.fakeInput} htmlFor="file">
            <MdUpload size={24} />
          </label>
          <Input
            className={styles.file}
            name="file"
            type="file"
            id="file"
            onChange={handleFileChange}
          />
          {form.file.size && (
            <div className={styles.fileText}>Arquivo: {form.file.name}</div>
          )}
        </div>
        <div className={styles.calendarContainer}>
          <DatePicker
            value={form.date}
            onChange={(newDay) =>
              setForm((prev: any) => ({
                ...prev,
                date: newDay,
              }))
            }
            shouldHighlightWeekends
            inputPlaceholder="Data*"
            colorPrimary="#9fc54d"
            colorPrimaryLight="#d7ecbd"
            locale={ptLocale}
          />
        </div>
        <div className={styles.type}>
          <SelectedList
            placeholder="Tipo*"
            field="type"
            list={form}
            setList={setForm}
            options={optionsType}
            isType
            readOnly
          />
        </div>
        <div className={styles.lastColumn}>
          <Input
            className={styles.input}
            placeholder="Número*"
            name="code"
            value={form.code}
            onChange={handleChange}
            max={10}
          />
          <Input
            className={styles.time}
            placeholder="Horário"
            name="time"
            value={form.time}
            onChange={handleTime}
          />
        </div>
        <Button
          className={`${styles.button} ${styles.schedule}`}
          onClick={handleSubmit}
        >
          Agendar
        </Button>
      </div>
      <div className={styles.table}>
        <Table
          title="Edições Agendadas"
          columns={columns}
          data={transformedData}
          setPage={setPage}
          page={page}
          total={getFiles.data.count}
          downloadButton
          isEmpty={isDispatched && getFiles?.data?.results?.length === 0}
          isStatus
          loading={post.loading || getFiles.loading}
          error={post.error || getFiles.error}
        />
      </div>
    </div>
  );
};

export default Status;
