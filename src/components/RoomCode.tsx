import copyImg from "../assets/images/copy.svg";
import { useTheme } from "../Hooks/useTheme";

import toast, { Toaster } from "react-hot-toast";

import "../styles/room-code.scss";

type RoomCodeProps = {
  code: string;
};

export function RoomCode(props: RoomCodeProps) {
  const { theme } = useTheme();

  const copyRoomCodeToast = () => {
    toast.success("Você copiou o código da sala");
  };

  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
    copyRoomCodeToast();
  }

  return (
    <>
      <button
        className={`room-code ${theme}`}
        onClick={copyRoomCodeToClipboard}
      >
        <div>
          <img src={copyImg} alt="Copy room code" />
        </div>
        <span>Sala #{props.code}</span>
      </button>
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
    </>
  );
}
