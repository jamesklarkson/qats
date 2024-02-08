import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Col, Row, Badge
} from 'react-bootstrap';

import { CatModel } from '../js/catFactory';
import CatBox from '../cat/CatBox';
import BirthAlert from './BirthAlert';
import { createGen0Kitty, selectKittyById, newKittenIdClear } from '../cat/catSlice';
import GenZeroCounter from '../cat/GenZeroCounter';

const initialCatModel = new CatModel();


export default function CatFactory() {
  const dispatch = useDispatch();

  const [cat] = useState({ model: initialCatModel, });
  const kitten = useSelector((state) => selectKittyById(state, state.kitties.newKittenId));



  const handleCreateKitty = () => {
    dispatch(createGen0Kitty(CatModel.getRandom().dna.dna));
  };

  const handleBirthEventClose = () => {
    dispatch(newKittenIdClear());
  };

  return (
    <>
      <div className="p-2">
        <h1>
          Kitty Factory
          {' '}
          <small>
            <Badge pill variant="secondary">
              <GenZeroCounter />
            </Badge>
          </small>
        </h1>
        <p className="text-justify">
          Create a custom generation zero Kitty!
          {' '}
          <small>
            Gen zero kitties are special.
            They have no parents and only a limited number will ever exist!
            Once the limit is reached no more gen zero kitties can be made.
          </small>
        </p>
      </div>
      <Row>
        <Col lg={4}>
          <CatBox model={cat.model} />
        </Col>
        <Col lg={8}>
          <div>
            <Button
              variant="warning"
              className="m-2"
              onClick={handleCreateKitty}
            >
              Create Kitty
            </Button>
          </div>
          <BirthAlert
            show={Boolean(kitten)}
            event={kitten}
            handleBirthEventClose={handleBirthEventClose}
          />
        </Col>
      </Row>
    </>
  );
}
