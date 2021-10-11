import { Component, createRef, useRef } from "react";
import { FiCheckSquare } from "react-icons/fi";

import { Form } from "./styles";
import Modal from "../Modal";
import Input from "../Input";
import { FormHandles } from "@unform/core";
import { IFoods } from "../../pages/Dashboard";

interface Props {
  modalOpen: boolean;
  toggleModal: () => void;
  editingFood: IFoods;
  handleUpdateFood: (data: IFoods) => void;
}

export default function ModalEditFood({
  modalOpen,
  toggleModal,
  editingFood,
  handleUpdateFood,
}: Props) {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = async (data: IFoods) => {
    handleUpdateFood(data);
    toggleModal();
  };
  {
    console.log(modalOpen);
  }
  return (
    <Modal isOpen={modalOpen} setIsOpen={toggleModal}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}
