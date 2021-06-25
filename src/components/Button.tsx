// Importa todas as propriedades que um botão pode receber
import { ButtonHTMLAttributes } from "react";

import "../styles/button.scss";

/* Seta as propriedades no ButtonProps pssando o elemento
botão */
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

/* O spread abaixo pega todas as propriedade definidas 
na chamada do componente e seta no botão */
export function Button({ isOutlined = false, ...props }: ButtonProps) {
  return (
    <button className={`button ${isOutlined ? "outlined" : ""}`} {...props} />
  );
}
