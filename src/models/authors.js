import { getDb } from '../db/connect.js';

// Get all authors
const getAllAuthors = async () => {
  const db = getDb();
  const authors = await db.collection('authors').find({}).toArray();
  return authors;
};

// Get author by ID
const getAuthorById = async (id) => {
  const db = getDb();
  const author = await db.collection('authors').findOne({ id });
  return author;
};

// Create new author
const createAuthor = async (author) => {
  const db = getDb();
  await db.collection('authors').insertOne(author);
  return author;
};

// Update author by ID
const updateAuthor = async (id, updates) => {
  const db = getDb();
  const result = await db.collection('authors').findOneAndUpdate(
    { id },
    { $set: updates },
    { returnDocument: 'after' }
  );
  return result.value;
};

// Delete author by ID
const deleteAuthor = async (id) => {
  const db = getDb();
  const result = await db.collection('authors').deleteOne({ id });
  return result;
};

// Check if author has books
const authorHasBooks = async (id) => {
  const db = getDb();
  const count = await db.collection('books').countDocuments({ authorId: id });
  return count > 0;
};

export {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  authorHasBooks
};
