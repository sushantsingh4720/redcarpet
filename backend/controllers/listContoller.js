const asyncHandler = require("express-async-handler");

const List = require("../models/ListModel");
// const User = require("../models/userModel");
//@desc Get Lists
//@route GET api/lists
//@access Private
const getLists = asyncHandler(async (req, res) => {
  const lists = await List.find({ user: req.user.id });
  res.status(200).json(lists);
});
//@desc Set List
//@route POST api/lists
//@access Private
const setList = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please provide taskname field");
  }
  const list = await List.create({
    name: req.body.name,
    detail: req.body.detail,
    user: req.user.id,
  });
  res.status(200).json(list);
});
//@desc Update List
//@route PUT api/lists/:id
//@access Private
const updateList = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);
  if (!list) {
    res.status(400);
    throw new Error("List not found");
  }
  // const user = await User.findById(req.user.id)
  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  // Make sure the logged in user matches with goal user
  if (list.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  const updatedList = await List.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedList);
});
//@desc Delete List
//@route DELETE api/lists/:id
//@access Private
const deleteList = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);
  if (!list) {
    res.status(404);
    throw new Error("List not found for deletion");
  }
  // const user = await User.findById(req.user.id)
  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  // Make sure the logged in user matches with goal user
  if (list.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await list.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getLists,
  setList,
  updateList,
  deleteList,
};