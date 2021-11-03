import { NextPage } from "next";
import React from "react";
import styles from "../../../styles/Users.module.css";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import { DeleteOutline, ModeEdit } from "@mui/icons-material";
import Link from "next/link";
import { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { deleteDoc, collection, doc } from "firebase/firestore";
import { db } from "../../../config/firebase";

const Timesheet: NextPage = () => {
  const [value, loading, error] = useCollection(collection(db, "timesheet"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const columns: GridColDef[] = [
    { field: "firstName", headerName: "First Name", width: 200 },
    { field: "lastName", headerName: "Last Name", width: 200 },
    { field: "date", headerName: "Date", width: 200 },
    {
      field: "started",
      headerName: "Started",
      width: 200,
      valueFormatter: (params: GridValueFormatterParams) => {
        var date = new Date((params.value as number) * 1000);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();

        // Will display time in 10:30:23 format
        var formattedTime =
          hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

        console.log(formattedTime);
        return `${formattedTime}`;
      },
    },
    { field: "ended", headerName: "Ended", width: 200 },
    { field: "time", headerName: "Difference", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params: {
        row: {
          id: any;
          firstName: string;
          lastName: string;
          date: any;
          started: any;
          ended: any;
          time: any;
        };
      }) => {
        return (
          <div className="cursor-pointer p-2">
            {/* change id number to be from array */}
            {/*Or below works */}
            {/* <Link href={`/admin/users/${encodeURIComponent("id")}`}> </Link> */}
            <Link
              href={{
                pathname: "timesheet/[id]",
                query: {
                  id: params.row.id,
                  firstName: params.row.firstName,
                  lastName: params.row.lastName,
                  date: params.row.date,
                  started: params.row.started,
                  ended: params.row.ended,
                  time: params.row.time,
                },
              }}
            >
              <ModeEdit />
            </Link>

            <DeleteOutline onClick={() => handleDelete(params.row.id)} />
          </div>
        );
      },
    },
  ];

  const handleDelete = async (id: any) => {
    var r = confirm("Delete this user?");
    if (r) {
      const documentRef = doc(db, "timesheet", id.toString());
      await deleteDoc(documentRef);
      console.log("Document written with ID: ", documentRef.id);
    }
  };

  return (
    <div style={{ height: 300, width: "100%" }}>
      {value && (
        <DataGrid
          rows={value.docs.map((row) => {
            return {
              id: row.id,
              firstName: row.get("firstName"),
              lastName: row.get("lastName"),
              date: row.get("date"),
              started: row.get("started"),
              ended: row.get("ended"),
              time: row.get("time"),
            };
          })}
          columns={columns}
          checkboxSelection
          disableSelectionOnClick
          pageSize={8}
        />
      )}
    </div>
  );
};
export default Timesheet;