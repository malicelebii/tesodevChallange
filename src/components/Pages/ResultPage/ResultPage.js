import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../../../tesodevVector.png";
import orderIcon from "../../../ordericon.svg";
import styles from "./ResultPage.module.css";
import mockData from "../../../mockData.json";

const ResultPage = () => {
  let { searchterm } = useParams();
  const [searchedTerm, setSearchedTerm] = useState(searchterm);
  const [resultData, setResultData] = useState([]);
  const [resultPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  const onSearchChange = (e) => {
    setSearchedTerm(e.target.value);
  };

  const handleSearchButtonClick = () => {
    const result = mockData.data.filter((d) =>
      d[4].toLowerCase().includes(searchedTerm.toLowerCase())
    );
    setResultData(result);
  };

  const handleSorting = (e) => {
    if (e.target.innerText === "Name ascending") {
      setResultData((prevstate) =>
        prevstate.sort(function (a, b) {
          var nameA = a[4].toUpperCase();
          var nameB = b[4].toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          return 0;
        })
      );
    }

    if (e.target.innerText === "Name descending") {
      setResultData((prevstate) =>
        prevstate.sort(function (a, b) {
          var nameA = a[4].toUpperCase();
          var nameB = b[4].toUpperCase();
          if (nameA > nameB) {
            return -1;
          }
          if (nameA < nameB) {
            return 1;
          }

          return 0;
        })
      );
    }
    if (e.target.innerText === "Year descending") {
      setResultData((prevstate) =>
        prevstate.sort(function (a, b) {
          return Number(b[3].split("/")[2]) - Number(a[3].split("/")[2]);
        })
      );
    }
    if (e.target.innerText === "Year ascending") {
      setResultData((prevstate) =>
        prevstate.sort(function (a, b) {
          return Number(a[3].split("/")[2]) - Number(b[3].split("/")[2]);
        })
      );
    }
  };

  useEffect(() => {
    const result = mockData.data.filter((d) =>
      d[4].toLowerCase().includes(searchterm.toLowerCase())
    );
    setResultData(result);
  }, [searchterm]);

  // Get current results
  const indexOfLastResult = currentPage * resultPerPage;
  const indexOfFirstResult = indexOfLastResult - resultPerPage;
  const currentResults = resultData.slice(
    indexOfFirstResult,
    indexOfLastResult
  );

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(resultData.length / resultPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img className={styles.logo} src={logo} alt="logo" />
        <input
          className={styles.searchBar}
          type="text"
          value={searchedTerm}
          onChange={onSearchChange}
        />
        <input
          className={styles.searchButton}
          type="button"
          value="Search"
          onClick={handleSearchButtonClick}
        />
      </div>

      <div className={styles.resultsContainer}>
        <div className={styles.orderBy}>
          <img src={orderIcon} alt="orderlogo" />
          <a href="#/ " className={styles.dropdown}>
            <div className={styles.dropdownContent}>
              <ul>
                <li>
                  <a href="#/ " onClick={handleSorting}>
                    Name ascending
                  </a>
                </li>
                <li>
                  <a href="#/ " onClick={handleSorting}>
                    Name descending
                  </a>
                </li>
                <li>
                  <a href="#/ " onClick={handleSorting}>
                    Year ascending
                  </a>
                </li>
                <li>
                  <a href="#/ " onClick={handleSorting}>
                    Year descending
                  </a>
                </li>
              </ul>
            </div>
            Order by
          </a>
        </div>
        {currentResults.map((item, i) => {
          return (
            <div className={styles.resultItem}>
              <div>
                <h2 className={styles.title}>{item[4]}</h2>
                <p className={styles.author}>
                  {`${item[0]} - ${item[3].split("/")[2]} `}{" "}
                </p>
              </div>
              <p className={styles.email}>Email:{item[2]} </p>
              <p> </p>
            </div>
          );
        })}
        <div>
          <ul className={styles.pagination}>
            <a
              href="# "
              onClick={() =>
                currentPage > 1
                  ? paginate(currentPage - 1)
                  : paginate(currentPage)
              }
              className={styles.pageItem}
            >
              {" "}
              <li>Previous</li>
            </a>
            {pageNumbers.map((number) => (
              <a
                onClick={(e) => {
                  paginate(number);
                }}
                href="# "
                className={styles.pageItem}
              >
                <li key={number}>{number}</li>
              </a>
            ))}

            <a
              href="# "
              onClick={() => paginate(currentPage + 1)}
              className={styles.pageItem}
            >
              {" "}
              <li> Next </li>
            </a>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
