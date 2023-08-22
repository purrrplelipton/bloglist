export function generateID(length = 24) {
  const capitalLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const smolLetters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";

  const pool = [];

  // Populate the pool with an even distribution of characters from each category
  for (let i = 0; i < length / 3; i++) {
    pool.push(
      capitalLetters.charAt(Math.floor(Math.random() * capitalLetters.length)),
      smolLetters.charAt(Math.floor(Math.random() * smolLetters.length)),
      numbers.charAt(Math.floor(Math.random() * numbers.length))
    );
  }

  // If length is not a multiple of 3, add any remaining characters to the pool
  const remainingLength = length % 3;
  for (let i = 0; i < remainingLength; i++) {
    const category = Math.floor(Math.random() * 3); // Randomly choose the category
    if (category === 0) {
      pool.push(
        capitalLetters.charAt(Math.floor(Math.random() * capitalLetters.length))
      );
    } else if (category === 1) {
      pool.push(
        smolLetters.charAt(Math.floor(Math.random() * smolLetters.length))
      );
    } else {
      pool.push(numbers.charAt(Math.floor(Math.random() * numbers.length)));
    }
  }

  // Shuffle the pool to ensure unbiased distribution
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  // Join the pool elements to form the final result
  const result = pool.join("").substring(0, length);

  return result;
}

export const mockBlog = {
  id: generateID(),
  title: "Unraveling the Enigmatic Symphony: Secrets of the Quantum Melody",
  content:
    "Welcome to the captivating world of quantum mechanics - a mesmerizing symphony of particles and waves that defies our classical understanding of reality. In this blog, we'll explore the enigmatic principles of superposition, entanglement, and wave-particle duality. Join us on this thrilling journey as we unravel the secrets of the quantum melody and its promising applications in technology. Get ready to be amazed by the mysteries that lie within the quantum realm!",
  author: { id: generateID() },
  likes: [generateID(), generateID(), generateID(), generateID(), generateID()],
  dislikes: [generateID(), generateID()],
};

export { default as Blog } from "./blog";
