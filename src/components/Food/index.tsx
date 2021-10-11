import { Component, useState } from "react";
import { FiEdit3, FiTrash } from "react-icons/fi";

import { Container } from "./styles";
import api from "../../services/api";
import { IFoods } from "../../pages/Dashboard";

interface Props {
  Food: IFoods;
  handleEditFood: (Food: IFoods) => void;
  handleDelete: (id: number) => void;
}

export default function Food({ Food, handleEditFood, handleDelete }: Props) {
  const [isAvailable, setIsAvailable] = useState(false);

  const toggleAvailable = async () => {
    await api.put(`/foods/${Food.id}`, {
      ...Food,
      available: !isAvailable,
    });
    setIsAvailable(!isAvailable);
  };

  const setEditingFood = () => {
    handleEditFood(Food);
  };

  return (
    <Container available={isAvailable}>
      <header>
        <img src={Food.image} alt={Food.name} />
      </header>
      <section className="body">
        <h2>{Food.name}</h2>
        <p>{Food.description}</p>
        <p className="price">
          R$ <b>{Food.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={setEditingFood}
            data-testid={`edit-food-${Food.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(Food.id)}
            data-testid={`remove-food-${Food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{isAvailable ? "Disponível" : "Indisponível"}</p>

          <label htmlFor={`available-switch-${Food.id}`} className="switch">
            <input
              id={`available-switch-${Food.id}`}
              type="checkbox"
              checked={isAvailable}
              onChange={toggleAvailable}
              data-testid={`change-status-food-${Food.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
}
