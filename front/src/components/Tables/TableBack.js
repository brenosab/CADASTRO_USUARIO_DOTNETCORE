import React, { Fragment } from "react";
import { Table, Row, Col, Button, Container } from "react-bootstrap";
import {
  useTable,
  usePagination,
  useExpanded,
  useFlexLayout,
} from "react-table";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const TableBack = (props) => {
  const {
    columns = [],
    data = [],
    tableState = {},
    extrasComponents,
    pageChangeHandler,
    expandedChildren = () => <>Not Defined</>,
  } = props;

  const {
    hasNextPage,
    hasPreviousPage,
    //isFirstPage,
    //isLastPage,
    pageCount,
    pageNumber,
    //pageSize,
    totalItemCount,
  } = tableState;

  const {
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
  } = useTable(
    {
      columns,
      data,
    },
    useExpanded,
    useFlexLayout,
    usePagination
  );

  return (
    <Container
      style={{ padding:"5px"}}
    >
       {extrasComponents && (
        <Row style={{ padding: 5 }}>
          {extrasComponents.map((item, index) => item(index))}
        </Row>
      )}
      <Table
        striped
        hover
        responsive="xl"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr 
            {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <th 
                  {...column.getHeaderProps()}
                  style={column.render("minWidth") ? { width: column.render("minWidth") } : { minWidth: column.render("minWidth") }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody 
          {...getTableBodyProps()}
        >
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <Fragment key={i}>
                <tr 
                  {...row.getRowProps()}
                  >
                  {row.cells.map((cell, j) => {
                    return (
                      <td 
                        {...cell.getCellProps()}
                        style={headerGroups[0].headers[j].render("minWidth") ? { width: headerGroups[0].headers[j].render("minWidth") } : { minWidth: headerGroups[0].headers[j].render("minWidth") }}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
                {row.isExpanded && (
                  <tr>
                    <td style={{ paddingLeft: "7.5%", paddingRight: "2.5%" }}>
                      {expandedChildren(row.original)}
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </Table>


      <Row>
        <Col></Col>
        <Col>
          <Row>
            <Col md={{ span: 2, offset: 4 }}>
              <Button
                onClick={() => pageChangeHandler(pageNumber - 1)}
                disabled={!hasPreviousPage}
              >
                <FaArrowLeft />
              </Button>
            </Col>
            <Col md={4}>
              {pageNumber} Pagina de {pageCount}
            </Col>
            <Col md={2}>
              <Button
                onClick={() => pageChangeHandler(pageNumber + 1)}
                disabled={!hasNextPage}
              >
                <FaArrowRight />
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      </Container>
  );
};

export default TableBack;