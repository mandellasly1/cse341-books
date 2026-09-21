import { getDb } from '../db/connect.js';

const deleteAuthorHandler = async (req, res) => {
  try {
    const authorId = req.params.id;
    const db = getDb();

    // Check if any books reference this author
    const books = await db.collection('books').find({ authorId }).toArray();
    if (books.length > 0) {
      return res.status(409).json({
        message: `Cannot delete author with id ${authorId} because books still reference this author`
      });
    }

    // Delete the author
    const result = await db.collection('authors').deleteOne({ id: authorId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Author not found' });
    }

    return res.status(204).send(); // No Content
  } catch (error) {
    console.error('DELETE /authors/:id failed:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export { deleteAuthorHandler };
