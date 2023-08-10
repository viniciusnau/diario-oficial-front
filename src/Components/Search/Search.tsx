import React, { useState } from "react";
import styles from "./Search.module.css";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import SelectedList from "../SelectedList/SelectedList";
import { handleKeyPress, optionsType } from "../Helper";
import { useDispatch } from "react-redux";
import { fetchPublic } from "../../Services/Slices/publicSlice";
import { Calendar, DayRange } from "@taak/react-modern-calendar-datepicker";
import "@taak/react-modern-calendar-datepicker/lib/DatePicker.css";
import { ptLocale } from "../Consts";

interface iSearch {
  setBackup?: any;
  setSearch?: any;
}

const Search: React.FC<iSearch> = ({ setBackup, setSearch }) => {
  const [selectedRange, setSelectedRange] = useState({
    start_date: "",
    end_date: "",
    post_type: [],
    post_code: "",
    words: [],
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
    }
  };

  const formatDate = (date: any) => {
    const year = String(date.year).padStart(2, "0");
    const month = String(date.month).padStart(2, "0");
    const day = String(date.day).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = () => {
    if (dayRange.from && dayRange.to) {
      const formattedStartDate = formatDate(dayRange.from);
      const formattedEndDate = formatDate(dayRange.to);
      const updatedRange = {
        ...selectedRange,
        start_date: formattedStartDate,
        end_date: formattedEndDate,
      };
      dispatch<any>(fetchPublic(updatedRange));
      setBackup(updatedRange);
      setSearch(true);
    } else {
      dispatch<any>(fetchPublic(selectedRange));
      setBackup(selectedRange);
      setSearch(true);
    }
    setSelectedRange({
      start_date: "",
      end_date: "",
      post_type: [],
      post_code: "",
      words: [],
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
              >
                Limpar
              </button>
            </div>
          )}
        />
      </div>
      <div className={styles.keyword}>
        <SelectedList
          placeholder="Palavra-chave"
          field="words"
          list={selectedRange}
          setList={setSelectedRange}
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
      <div>
        <Input
          className={styles.code}
          name="post_code"
          value={postCode}
          onChange={handleChange}
          placeholder="Código da edição"
          max={12}
        />
        <div className={styles.info}>
          <label>Palavras exatas?</label>
          <div>
            <Input
              name="exact_words"
              checked={exactWordsChecked}
              onChange={handleChange}
              type="checkbox"
            />
            <label>Sim</label>
          </div>
        </div>
        <Button className={styles.button} onClick={handleSubmit}>
          Pesquisar
        </Button>
      </div>
    </div>
  );
};

export default Search;