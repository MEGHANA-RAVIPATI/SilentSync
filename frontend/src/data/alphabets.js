const alphabets = Array.from({ length: 26 }, (_, index) => {
  const letter = String.fromCharCode(65 + index);

  return {
    id: index + 1,
    letter,
    name: letter,
    image: `/src/assets/signs/${letter}.png`,
  };
});

export default alphabets;