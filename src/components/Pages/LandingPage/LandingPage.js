import { useState, useEffect } from "react";
import logo from "../../../tesodevVector.png";
import styles from "./LandingPage.module.css";
import mockData from "../../../mockData.json";

const LandingPage = () => {
  const [data, setData] = useState("");
  const [dataCount, setDataCount] = useState(3);
  const [filteredData, setFilteredData] = useState([]);
  const [searchInput, setsearchInput] = useState("");

  const onSearch = () => {
    window.location.assign(`search/${searchInput}`);
  };

  const onSearchChange = (e) => {
    const result = data.data.filter((d) =>
      d[4].toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredData(result);
    setsearchInput(e.target.value);
  };

  const handleShowMoreClick = () => {
    setDataCount((prevState) => prevState + 3);
  };

  useEffect(() => {
    setFilteredData(mockData.data);
    setData(mockData);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img className={styles.logo} src={logo} alt="asd" />
        <div className={styles.searchText}>Search web app</div>
      </div>
      <div className={styles.search}>
        <input
          className={styles.searchBar}
          type="text"
          onChange={onSearchChange}
          value={searchInput}
        />
        <input
          className={styles.searchButton}
          type="button"
          value="Search"
          onClick={onSearch}
        />
      </div>
      <div className={styles.resultsContainer}>
        {filteredData.map((item, i) => {
          if (i < dataCount) {
            return (
              <div className={styles.resultItem}>
                <div>
                  <h2 className={styles.title}>{item[4]}</h2>
                  <p className={styles.author}>{`${item[0]} - ${item[3]} `} </p>
                </div>
                <p className={styles.email}>Email:abc@gmail.com</p>
              </div>
            );
          }
          return null;
        })}
        <div className={styles.showMore}>
          <a href="#/" onClick={handleShowMoreClick}>
            {" "}
            Show more ...{" "}
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
