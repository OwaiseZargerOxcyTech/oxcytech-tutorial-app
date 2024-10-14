import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

const CommonTable = ({ data, columns }) => {
  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableHiding: false,
    enableFullScreenToggle: false,
    paginationDisplayMode: "pages",
    initialState: { density: "compact" },
    muiTableContainerProps: { style: { paddingLeft: "10px" } },
  });

  return (
    <>
      <MaterialReactTable table={table} />
      {/* Pass table as props */}
    </>
  );
};

export default CommonTable;
