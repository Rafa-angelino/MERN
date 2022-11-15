import React, { useState } from "react";

import "./PlaceItem.css";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
const PlaceItem = ({
  id,
  image,
  title,
  description,
  address,
  creatorId,
  coordinates,
}) => {
  const [showMap, setShowMap] = useState(false);

  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

  return (
    <>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={address}
        contentClass="place-item__modal-content"
        footerClass ="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>FECHAR</Button>}
      >
        <div className="map-container">
          <Map center={coordinates} zoom={8}/>
        </div>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={image} alt={title} />
          </div>
          <div className="place-item__info">
            <h3>{title}</h3>
            <h3>{address}</h3>
            <h3>{description}</h3>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>OLHAR NO MAPA</Button>
            <Button to={`/places/${id}`}>EDITAR</Button>
            <Button danger>DELETAR</Button>
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
