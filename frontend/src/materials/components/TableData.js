import { useEffect, useState } from "react";
import ViewModal from "./ViewModal";
import { Table, Button, Pagination } from "react-bootstrap";
import axios from "axios";
import { URLs } from "../constants/urlConstants";

const TableData = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [tableValue, setTableValue] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit] = useState(5);
  const [search, setSearch] = useState("");
  const user = localStorage.getItem("user");
  const obj = JSON.parse(user);

  /**
   * Function to fetch Records
   */
  const getRecordHandle = async (page, limit, search = "") => {
    try {
      // const token = localStorage.getItem("token");
      const result = await axios.get(`${URLs.AXIOS_SUB_GET}/${obj._id}`, data, {
        params: { page, limit, search },
      });
      console.log("Data ---->", result);

      // Set data in your state management
      setData(result.data.info);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  useEffect(() => {
    getRecordHandle(page, limit, search);
  }, [page, limit, search]);

  // For Modal View Handler
  const handleShow = (ele) => {
    setShow(true);
    setTableValue(ele);
  };

  const handleClose = () => {
    setShow(false);
  };

  // Pagination Handlers for Next Record
  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  // Pagination Handlers for Previous Record
  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  // For Searching
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to the first page when searching
  };

  return (
    <>
      <div>
        <input
          type="search"
          placeholder=" Search"
          value={search}
          onChange={handleSearch}
        />
        <ViewModal
          show={show}
          tableValue={tableValue}
          handleClose={handleClose}
        />
        <Table striped bordered hover variant="light">
          <thead>
            <tr>
              <th>Training Name</th>
              <th>Topics</th>
              <th>Trainer Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) &&
              data.map((ele) => {
                return (
                  <tr key={ele._id}>
                    <td>{ele.firstName}</td>
                    <td>{ele.lastName}</td>
                    <td>{ele.email}</td>
                    <td>
                      <Button variant="info" onClick={() => handleShow(ele)}>
                        View
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>

      <div>
        <Pagination>
          <Pagination.Prev onClick={handlePrevious} disabled={page === 1} />
          <Pagination.Item active>{page}</Pagination.Item>
          <Pagination.Next
            onClick={handleNext}
            disabled={page === totalPages}
          />
        </Pagination>
      </div>
    </>
  );
};

export default TableData;
