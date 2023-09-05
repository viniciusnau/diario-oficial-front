import React, { useState } from "react";
import styles from "./Search.module.css";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import SelectedList from "../SelectedList/SelectedList";
import { formatDate, handleKeyPress, optionsType } from "../Helper";
import { useDispatch } from "react-redux";
import { fetchPublic } from "../../Services/Slices/publicSlice";
import { Calendar } from "@taak/react-modern-calendar-datepicker";
import "@taak/react-modern-calendar-datepicker/lib/DatePicker.css";
import { ptLocale } from "../Consts";

interface iSearch {
  setBackup?: any;
  setSearch?: any;
  search?: any;
  setPage?: any;
  page?: number;
}

const Search: React.FC<iSearch> = ({ setBackup, setSearch, setPage }) => {
  const [form, setForm] = useState({
    date: { from: null, to: null },
    post_type: [] as string[],
    post_code: "",
    words: [] as string[],
    exact_words: false,
  });
  const [hasValue, setHasValue] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const { name, value, type, checked } = e.target;

    setForm((prev: any) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "post_code"
          ? value
          : [...prev[name], value],
      ...(name === "words" &&
        value.trim() !== "" && { words: [...prev.words, value.trim()] }),
    }));
  };

  const handleDisable = () => {
    return (
      !form.date.from &&
      !form.date.to &&
      form.post_type.length === 0 &&
      !form.post_code.trim() &&
      form.words.length === 0 &&
      !hasValue
    );
  };

  const handleKeyUp = (e: React.FocusEvent<HTMLInputElement> | any) => {
    const value = e.target.value.trim();
    const key = e.key;
    if (value !== "" && key === " ") {
      setForm((prev) => ({
        ...prev,
        words: [...prev.words, value],
      }));
      e.currentTarget.value = "";
    }
  };

  const handleSubmit = () => {
    const lowercaseWords = form.words.map((word: string) => word.toLowerCase());
    const updatedRange = {
      ...form,
      ...(form.date.from
        ? {
            date: {
              from: formatDate(form.date.from),
              to: form.date.to
                ? formatDate(form.date.to)
                : formatDate(form.date.from),
            },
          }
        : {}),
      words: lowercaseWords,
    };
    dispatch<any>(fetchPublic(updatedRange, "1"));
    setPage(1);
    setBackup(updatedRange);
    setSearch(true);
    setForm({
      date: { from: null, to: null },
      post_type: [] as string[],
      post_code: "",
      words: [] as string[],
      exact_words: false,
    });
  };

  return (
    <div
      className={styles.container}
      onKeyUp={(e) =>
        handleKeyPress(e, handleSubmit, "Enter", ["words", "post_type"])
      }
    >
      <div className={styles.align}>
        <div className={styles.calendarContainer}>
          <Calendar
            value={form.date}
            onChange={(newDateRange) =>
              setForm((prev) => ({
                ...prev,
                date: newDateRange as any,
              }))
            }
            shouldHighlightWeekends
            colorPrimary="#9fc54d"
            colorPrimaryLight="#d7ecbd"
            calendarClassName={styles.calendar}
            locale={ptLocale}
            renderFooter={() => (
              <div className={styles.renderFooter}>
                <button
                  type="button"
                  onClick={() => {
                    setForm((prev) => ({
                      ...prev,
                      date: { from: null, to: null },
                    }));
                  }}
                  className={styles.clearButton}
                  style={{ marginBottom: "1rem" }}
                >
                  Limpar
                </button>
              </div>
            )}
          />
        </div>
        <div className={styles.firstColumn}>
          <div className={styles.keyword}>
            <SelectedList
              placeholder="Palavra-chave"
              field="words"
              list={form}
              setList={setForm}
              onKeyUp={handleKeyUp}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                const value = e.target.value.trim();
                if (value !== "") {
                  setForm((prev) => ({
                    ...prev,
                    words: [...prev.words, value],
                  }));
                  e.currentTarget.value = "";
                }
              }}
              hasValue={setHasValue}
            />
          </div>
          <div className={styles.type}>
            <SelectedList
              placeholder="Tipo"
              field="post_type"
              list={form}
              setList={setForm}
              options={optionsType}
              isType
              readOnly
            />
          </div>
        </div>
        <div className={styles.lastColumn}>
          <Input
            className={styles.code}
            name="post_code"
            value={form.post_code}
            onChange={handleChange}
            placeholder="Código da edição"
            max={12}
          />
          <div className={styles.info}>
            <label className={styles.question}>Palavras exatas?</label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "0 0 0 .5rem",
              }}
            >
              <Input
                name="exact_words"
                checked={form.exact_words}
                onChange={handleChange}
                type="checkbox"
              />
              <label className={styles.yes}>Sim</label>
            </div>
            <Button
              className={styles.button}
              onClick={handleSubmit}
              disabled={handleDisable()}
            >
              Pesquisar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
