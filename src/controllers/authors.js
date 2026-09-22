import { getDb } from '../db/connect.js';

// GET all authors
const getAuthorsHandler = async (req, res) => {
  try {
    const authors = await getDb().collection('authors').find({}).toArray();
    return res.status(200).json(authors);
  } catch (error) {
    console.error('GET /authors failed:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// GET author by ID
const getAuthorByIdHandler = async (req, res) => {
  try {
    const authorId = req.params.id;
    const author = await getDb().collection('authors').findOne({ id: authorId });

    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    return res.status(200).json(author);
  } catch (error) {
    console.error('GET /authors/:id failed:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// POST new author
const addAuthorHandler = async (req, res) => {
  try {
    const newAuthor = req.body;

    if (!newAuthor.id || !newAuthor.name) {
      return res.status(400).json({ message: 'id and name are required' });
    }

    const result = await getDb().collection('authors').insertOne(newAuthor);

    if (result.insertedId) {
      return res.status(201).json({
        message: 'Author added successfully',
        author: newAuthor
      });
    } else {
      return res.status(500).json({ message: 'Unable to add author' });
    }
  } catch (error) {
    console.error('POST /authors failed:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// PUT update author
const updateAuthorHandler = async (req, res) => {
  try {
    const authorId = req.params.id;
    const updates = req.body;

    if (!updates.name || !updates.birthYear) {
      return res.status(400).json({ message: 'name and birthYear are required' });
    }

    const result = await getDb().collection('authors').findOneAndUpdate(
      { id: authorId },
      { $set: updates },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      return res.status(404).json({ message: 'Author not found' });
    }

    return res.status(200).json(result.value);
  } catch (error) {
    console.error('PUT /authors/:id failed:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


// DELETE author with validation
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


// ✅ Export all handlers once
export {
  getAuthorsHandler,
  getAuthorByIdHandler,
  addAuthorHandler,
  updateAuthorHandler,
  deleteAuthorHandler
};
