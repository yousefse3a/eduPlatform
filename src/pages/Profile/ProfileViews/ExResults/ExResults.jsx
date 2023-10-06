import React, { useContext, useEffect, useState } from "react";
import Table from "../../../../components/Table/Table";
import { Link } from "react-router-dom";
import { UserContext } from "../../../../context/UserContext";
import { getAllExam } from "../../../../API/StudentServices";

const columns = [
  {
    field: "rowId",
    headerName: "",
    width: 50,
    align: "center",
  },
  {
    field: "exam_name",
    headerName: "الامتحان",
    width: 100,
    renderCell: (params) => (
      <Link to={`/Exam/${params.row.id}`}>{params.row.exam_name}</Link>
    ),
  },
  {
    field: "status",
    headerName: "حالة",
    // description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 100,
    renderCell: (params) => {
      switch (params.row.status) {
        case 'completed':
          return 'انتهي'
        case 'absent':
          return 'غياب'
        case 'entered':
          return 'شغال'
        case 'pending':
          return 'بيتصحح'
        default:
          break;
      }
    }
  },
  {
    field: "result_status",
    headerName: "الدرجة",
    sortable: false,
    width: 100,
    renderCell: (params) => { return params.row.status == "completed" ? params.row.result_status + "/100" : "-" }
  },
  {
    field: "exam_date",
    headerName: "الزمن",
    sortable: false,
    width: 100,
    renderCell: (params) => (
      <span>
        {(new Date(params.row.exam_date_end) -
          new Date(params.row.exam_date_start)) /
          (1000 * 60 * 60)}{" "}
        ساعة
      </span>
    ),
  },
  {
    field: "exam_date_start",
    headerName: "اليوم",
    sortable: false,
    width: 100,
    renderCell: (params) => (
      <span>{params.row.exam_date_start.split(" ")[0]}</span>
    ),
  },
  {
    field: "exam_time_start",
    headerName: "الساعة",
    sortable: false,
    width: 100,
    renderCell: (params) => (
      <span>{(params.row.exam_date_start.split(" ")[1]).slice(0, -3)}</span>
    ),
  },
];

export default function ExResults() {
  const { userToken } = useContext(UserContext);
  const [rows, setrows] = useState([]);
  const [isLoading, setisLoading] = useState(false);


  const getAllExamData = async () => {
    setisLoading(true)
    let res = await getAllExam(userToken);
    setisLoading(false)
    setrows(res);
    console.log("get data", res);
  };
  useEffect(() => {
    getAllExamData();
  }, []);

  return <Table rows={rows} columns={columns} isLodaing={isLoading} />;
}
