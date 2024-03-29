import React, { useContext, useEffect, useState } from "react";
import {
  HomeWorkQuestion,
  HomeWorkQuestionAnswers,
} from "../../../../components/Question/Question";
import { useOutletContext } from "react-router-dom";
import { Box, CircularProgress, Grid } from "@mui/material";
import { UserContext } from "../../../../context/UserContext";
import { getHomework, submitHomeWork } from "../../../../API/subjects";

export default function Exam() {
  const { homework } = useOutletContext();
  const { userToken } = useContext(UserContext);
  const [homeWorkDetails, sethomeWorkDetails] = useState({});
  const [homeWorkStatus, sethomeWorkStatus] = useState(null);
  const [queAnsObj, setqueAnsObj] = useState({});
  const [examQues, setexamQues] = useState([]);
  const [examCount, setexamCount] = useState(null);

  const submitHomeworkFun = async () => {
    let studentAnswersHW = { answers: queAnsObj, homework_id: homework.id };
    let res = await submitHomeWork(userToken, studentAnswersHW);

    console.log("after submit=>", res);

    if (res.status == 200) {
      localStorage.removeItem(`userAnswerHW_${homework.id}`);
      getHomeworkData(homework.id, userToken);
    }
  };
  const getHomeworkData = async (homeworkID, userToken) => {
    let res = await getHomework(homeworkID, userToken);
    console.log("homework=>", res);
    if (res.status == 200) {
      sethomeWorkDetails(res.data.body);
      sethomeWorkStatus(res.data.body.status);
      setexamQues(res.data.body.questions);
      setexamCount(res.data.body.question_count);
    }
  };

  useEffect(() => {
    if (homeWorkStatus == "pending") {
      setqueAnsObj(() => {
        if (localStorage.getItem(`userAnswerHW_${homework.id}`)) {
          console.log(
            "answers from local storage set to obj",
            JSON.parse(localStorage.getItem(`userAnswerHW_${homework.id}`))
              ?.answers
          );
          return JSON.parse(localStorage.getItem(`userAnswerHW_${homework.id}`))
            ?.answers;
        } else {
          let answers = {};
          console.log("examQues in ques", typeof examQues);
          examQues.map((que) => {
            let a = {};
            a[`${que.id}`] = "-1";
            answers = { ...answers, ...a };
          });
          localStorage.setItem(
            `userAnswerHW_${homework.id}`,
            JSON.stringify({ homeWorkID: homework.id, answers: answers })
          );
          console.log(
            "answers from local storage set to obj if not found",
            answers
          );
          return answers;
        }
      });
    }
    if (homeWorkStatus == "submitted") {
      console.log("submitted hw");
    }
  }, [examQues]);

  useEffect(() => {
    getHomeworkData(homework.id, userToken);
  }, [homework]);

  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "column",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: ".5rem",
        boxSizing: "border-box",
      }}
    >
      {examQues.length > 0 && examCount > 0 ? (
        <RenderQuestions
          questions={examQues}
          setqueAnsObj={setqueAnsObj}
          homework={homework}
          homeWorkStatus={homeWorkStatus}
          submitHomeworkFun={submitHomeworkFun}
        />
      ) : (
        ""
      )}
      {examQues.length == 0 && examCount == 0 ? (
        <div>مفيش واجب للدرس ده</div>
      ) : (
        ""
      )}
      {examQues.length == 0 && examCount == null ? (
        <CircularProgress color="secondary" />
      ) : (
        ""
      )}
    </Box>
  );
}

function RenderQuestions({
  questions,
  setqueAnsObj,
  homework,
  homeWorkStatus,
  submitHomeworkFun,
}) {
  console.log(questions);
  return homeWorkStatus == "pending" ? (
    <>
      {questions.map((que) => {
        return (
          <HomeWorkQuestion
            key={que.id}
            id={que.id}
            imgPath={que.image_path}
            setqueAnsObj={setqueAnsObj}
            homeworkID={homework.id}
          />
        );
      })}
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#d1354f",
          color: "white",
          padding: "10px 30px",
          marginTop: "15px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => {
          submitHomeworkFun();
        }}
      >
        <span>صحح</span>
      </Grid>
    </>
  ) : (
    questions.map((que) => {
      return (
        <HomeWorkQuestionAnswers
          key={que.id}
          id={que.id}
          imgPath={que.image_path}
          answer={que.answer}
          student_answer={que.student_answer}
        />
      );
    })
  );
}
{
  /* <Grid
sx={{
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#d1354f",
  color: "white",
  padding: "10px 30px",
  marginTop: "15px",
  borderRadius: "5px",
  cursor: "pointer",
}}
onClick={() => {
  submitHomeworkFun();
}}
>
<span>صحح</span>
</Grid> */
}
