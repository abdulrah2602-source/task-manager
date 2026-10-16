const router = require('express').Router();
const auth = require('../middleware/auth');
const Task = require('../models/Task');

router.use(auth);
const pick = (b) => {
  const out = {};
  ['title', 'description', 'dueDate', 'priority', 'status'].forEach((k) => { if (b[k] !== undefined) out[k] = b[k]; });
  return out;
};

router.get('/', async (req, res, next) => {
  try { res.json(await Task.find({ user: req.userId }).sort({ dueDate: 1 })); } catch (e) { next(e); }
});

router.post('/', async (req, res, next) => {
  try {
    const task = await Task.create({ ...pick(req.body), user: req.userId });
    res.status(201).json(task);
  } catch (e) {
    if (e.name === 'ValidationError') return res.status(400).json({ message: e.message });
    next(e);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate({ _id: req.params.id, user: req.userId }, pick(req.body), {
      new: true, runValidators: true
    });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (e) {
    if (e.name === 'ValidationError' || e.name === 'CastError') return res.status(400).json({ message: e.message });
    next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (e) {
    if (e.name === 'CastError') return res.status(400).json({ message: 'Invalid task id' });
    next(e);
  }
});

module.exports = router;
