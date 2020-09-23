import React from "react";
import { Table, Row, Col, Button, Container } from "react-bootstrap";
import { useTable, usePagination } from "react-table";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"

const TableFront = (props) => {
  const { columns = [], data = [], extrasComponents } = props;

  const {
    // getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    // pageCount,
    // gotoPage,
    nextPage,
    previousPage,
    // setPageSize,
    state: {
      pageIndex,
      //pageSize
    },
  } = useTable(
    {
      columns,
      data,
    },
    usePagination
  );

  return (
    <Container>
      {extrasComponents && (
        <Row style={{ padding: 5 }}>
          {extrasComponents.map((item, index) => item(index))}
        </Row>
      )}
      <Table striped bordered hover style={{ padding: "5px" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((collumn) => (
                <th {...collumn.getHeaderProps()}>
                  {collumn.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Row>
        <Col>{data.length} linhas</Col>
        <Col as={Row}>
          <Col md={2}>
            <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
              <FaArrowLeft />
            </Button>
          </Col>
          <Col md={8}>
            Pagina {pageIndex + 1} de {pageOptions.length}
          </Col>
          <Col md={2}>
            <Button onClick={() => nextPage()} disabled={!canNextPage}>
              <FaArrowRight />
            </Button>
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default TableFront;
