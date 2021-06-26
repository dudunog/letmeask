import { useHistory, useParams } from "react-router-dom";

import logoImg from "../assets/images/logo.svg";
import deleteImg from "../assets/images/delete.svg";
import checkImg from "../assets/images/check.svg";
import answerImg from "../assets/images/answer.svg";

import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { Question } from "../components/Question";
import { useAuth } from "../Hooks/useAuth";
import { useRoom } from "../Hooks/useRoom";
import { useTheme } from "../Hooks/useTheme";
import { database } from "../services/firebase";

import Switch from "react-switch";

import toast, { Toaster } from "react-hot-toast";

import "./../styles/room.scss";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  // const { user } = useAuth();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const { theme, toggleTheme } = useTheme();
  const roomId = params.id;

  const { title, questions } = useRoom(params.id);

  const successNewQuestion = () =>
    toast.success("Pergunta registrada.", {
      position: "top-center",
    });

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}/`).update({
      endedAt: new Date(),
    });

    history.push("/");
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que você deseja excluir esta pergunta?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighLighted: true,
    });
  }

  return (
    <div id="page-room" className={theme}>
      <header>
        <div className="content">
          <div className="content-left">
            <img src={logoImg} alt="Letmeask" />
            <Switch
              onChange={toggleTheme}
              checked={theme === "dark"}
              checkedIcon={false}
              uncheckedIcon={false}
              handleDiameter={20}
              onColor="#835afd"
            />
          </div>
          <div className="content-right">
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighLighted}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        handleCheckQuestionAsAnswered(question.id);
                      }}
                    >
                      <img
                        src={checkImg}
                        alt="Marcar pergunta como respondida"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        handleHighlightQuestion(question.id);
                      }}
                    >
                      <img src={answerImg} alt="Dar destaque à pergunta" />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => {
                    handleDeleteQuestion(question.id);
                  }}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
            );
          })}
        </div>

        <Toaster
          position="top-center"
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            duration: 5000,
            style: {
              background: "#fff",
              color: "#363636",
            },
            success: {
              duration: 3000,
            },
          }}
        />
      </main>
    </div>
  );
}
