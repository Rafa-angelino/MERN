import React, { useState, useContext } from "react";

import "./PlaceItem.css";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Map from "../../shared/components/UIElements/Map";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
const PlaceItem = ({
  id,
  image,
  title,
  description,
  address,
  creatorId,
  coordinates,
  onDelete
}) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(`http://localhost:5000/api/places/${id}`, "DELETE");
      onDelete(id)
    } catch (err) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} /> 
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>FECHAR</Button>}
      >
        <div className="map-container">
          <Map center={coordinates} zoom={8} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Você tem certeza?"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={cancelDeleteHandler}>
              Cancelar
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              Deletar
            </Button>
          </>
        }
      >
        <p>
          Você quer proceder e deletar esse lugar? Ação não pode ser desfeita
        </p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          {isLoading && <LoadingSpinner asOverlay/>}
          <div className="place-item__image">
            <img src={`http://localhost:5000/${image}`} alt={title} />
          </div>
          <div className="place-item__info">
            <h3>{title}</h3>
            <h3>{address}</h3>
            <h3>{description}</h3>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              OLHAR NO MAPA
            </Button>
            {auth.userId === creatorId && <Button to={`/places/${id}`}>EDITAR</Button>}
            {auth.userId === creatorId && (
              <Button danger onClick={showDeleteWarningHandler}>
                DELETAR
              </Button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
