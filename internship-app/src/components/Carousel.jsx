import React, { useState } from "react";
import styled from "styled-components";
const Carousel = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? images.length - 1 : prevSlide - 1
    );
  };

  return (
    <Container className="carousel">
      <button onClick={prevSlide}>&lt;</button>
      <img src={images[currentSlide]} alt={`Slide ${currentSlide + 1}`} />
      <button onClick={nextSlide}>&gt;</button>
    </Container>
  );
};
const Container = styled.div``
export default Carousel;