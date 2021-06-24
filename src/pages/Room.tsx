import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import logoImg from "../assets/images/logo.svg";

import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { useAuth } from "../Hooks/useAuth";
import { useTheme } from "../Hooks/useTheme";

import Switch from "react-switch";

import toast, { Toaster } from "react-hot-toast";

import { database } from "../services/firebase";

import "./../styles/room.scss";

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
  }
>;

type Question = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighLighted: boolean;
};

type RoomParams = {
  id: string;
};

export function Room() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState("");

  const { theme, toggleTheme } = useTheme();

  const roomId = params.id;

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on("value", room => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighLighted: value.isHighLighted,
            isAnswered: value.isAnswered,
          };
        }
      );

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    });
  }, [roomId]);

  const successNewQuestion = () =>
    toast.success("Pergunta registrada.", {
      position: "top-center",
    });

  const errorNewQuestion = () => {
    toast.error("Não foi possível registrar sua pergunta. Tente novamente!");
  };

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === "") {
      toast.error(
        "Você não digitou uma pergunta. Digite para poder registrar!"
      );
      return;
    }

    if (!user) {
      throw new Error("You must be logged in");
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighLighted: false,
      isAnswered: false,
    };

    await database
      .ref(`rooms/${roomId}/questions`)
      .push(question)
      .then(() => {
        successNewQuestion();
        setNewQuestion("");
      })
      .catch(() => {
        errorNewQuestion();
      });
  }

  return (
    <div id="page-room" className={theme}>
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div className="content-right">
            <Switch
              onChange={toggleTheme}
              checked={theme == "dark"}
              checkedIcon={false}
              uncheckedIcon={false}
              handleDiameter={20}
              onColor="#835afd"
            />
            <RoomCode code={roomId} />
          </div>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que você quer perguntar?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />
          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta, <button>faça seu login</button>.
              </span>
            )}
            <Button type="submit" disabled={!user}>
              Enviar pergunta
            </Button>
          </div>
        </form>

        {JSON.stringify(questions)}

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
      <h1>10923</h1>
      <h1>10923</h1>
      <h1>10923</h1>
      <h1>10923</h1>
      <h1>10923</h1>
      <h1>10923</h1>
      <h1>10923</h1>
      <h1>10923</h1>
      <h1>10923</h1>
      <h1>10923</h1>
      <h1>10923</h1>
      <h1>10923</h1>
      <h1>10923</h1>
      <h1>10923</h1>
      <h1>10923</h1>
      <h1>10923</h1>
      <h1>10923</h1>
      <h1>10923</h1>
      <h1>10923</h1>
      <h1>10923</h1>
      <h1>10923</h1>
      <h1>10923</h1>
      <h1>10923</h1>
      <h1>10923</h1>
    </div>
  );
}