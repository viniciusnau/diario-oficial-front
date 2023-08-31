import React, { useState } from "react";
import styles from "./Search.module.css";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import SelectedList from "../SelectedList/SelectedList";
import { formatDate, handleKeyPress, optionsType } from "../Helper";
import { useDispatch } from "react-redux";
import { fetchPublic } from "../../Services/Slices/publicSlice";
import { Calendar, DayRange } from "@taak/react-modern-calendar-datepicker";
import "@taak/react-modern-calendar-datepicker/lib/DatePicker.css";
import { ptLocale } from "../Consts";

interface iSearch {
  setBackup?: any;
  setSearch?: any;
  search?: any;
  setPage?: any;
  page?: number;
}

const Search: React.FC<iSearch> = ({
  setBackup,
  setSearch,
  search,
  setPage,
  page,
}) => {
  const [selectedRange, setSelectedRange] = useState({
    start_date: "",
    end_date: "",
    post_type: [] as string[],
    post_code: "",
    words: [] as string[],
    exact_words: false,
  });

  const [postCode, setPostCode] = useState<string | undefined>(
    selectedRange.post_code
  );
  const [exactWordsChecked, setExactWordsChecked] = useState<boolean>(false);

  const [dayRange, setDayRange] = useState<DayRange>({
    from: null,
    to: null,
  });

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setSelectedRange((prev) => ({
        ...prev,
        [name]: checked,
      }));
      if (name === "exact_words") {
        setExactWordsChecked(checked);
      }
    } else {
      setSelectedRange((prev) => ({
        ...prev,
        [name]: value,
      }));

      if (name === "post_code") {
        setPostCode(value);
      }

      if (name === "words" && value.trim() !== "") {
        setSelectedRange((prev) => ({
          ...prev,
          words: [...prev.words, value.trim()],
        }));
      }
    }
  };

  const handleKeyUp = (e: React.FocusEvent<HTMLInputElement> | any) => {
    const value = e.target.value.trim();
    const key = e.key;
    if (value !== "" && key === " ") {
      setSelectedRange((prev) => ({
        ...prev,
        words: [...prev.words, value],
      }));
      e.currentTarget.value = "";
    }
  };

  const handleSubmit = () => {
    const lowercaseWords = selectedRange.words.map((word: string) =>
      word.toLowerCase()
    );

    if (dayRange.from && dayRange.to) {
      const formattedStartDate = formatDate(dayRange.from);
      const formattedEndDate = formatDate(dayRange.to);
      const updatedRange = {
        ...selectedRange,
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        words: lowercaseWords,
      };
      dispatch<any>(fetchPublic(updatedRange, "1"));
      setPage(1);
      setBackup(updatedRange);
      setSearch(true);
    } else if (dayRange.from && !dayRange.to) {
      const formattedStartDate = formatDate(dayRange.from);
      const updatedRange = {
        ...selectedRange,
        start_date: formattedStartDate,
        end_date: formattedStartDate,
        words: lowercaseWords,
      };
      dispatch<any>(fetchPublic(updatedRange, "1"));
      setPage(1);
      setBackup(updatedRange);
      setSearch(true);
    } else {
      const updatedRange = {
        ...selectedRange,
        words: lowercaseWords,
      };
      dispatch<any>(fetchPublic(updatedRange, "1"));
      setPage(1);
      setBackup(updatedRange);
      setSearch(true);
    }
    setSelectedRange({
      start_date: "",
      end_date: "",
      post_type: [] as string[],
      post_code: "",
      words: [] as string[],
      exact_words: false,
    });
    setPostCode("");
    setExactWordsChecked(false);
    setDayRange({ from: null, to: null });
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
            value={dayRange}
            onChange={setDayRange}
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
                    setDayRange({ from: null, to: null });
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
              list={selectedRange}
              setList={setSelectedRange}
              onKeyUp={handleKeyUp}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                const value = e.target.value.trim();
                if (value !== "") {
                  setSelectedRange((prev) => ({
                    ...prev,
                    words: [...prev.words, value],
                  }));
                  e.currentTarget.value = "";
                }
              }}
            />
          </div>
          <div className={styles.type}>
            <SelectedList
              placeholder="Tipo"
              field="post_type"
              list={selectedRange}
              setList={setSelectedRange}
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
            value={postCode}
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
                checked={exactWordsChecked}
                onChange={handleChange}
                type="checkbox"
              />
              <label className={styles.yes}>Sim</label>
            </div>
            <Button className={styles.button} onClick={handleSubmit}>
              Pesquisar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
