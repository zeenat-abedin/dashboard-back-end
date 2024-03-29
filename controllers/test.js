const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/asyncMiddleware");

const Test = require("../models/Test");

exports.createTest = asyncHandler(async (req, res) => {
  // Add user to req.body
  req.body.user = req.user.id;

  const test = await Test.create(req.body);
  console.log(test);

  return res.json({
    success: true,
    message: "The test has been created successfully",
  });
});

exports.tests = asyncHandler(async (req, res) => {
  const id = req.user.id;

  const tests = await Test.find({ user: id }).select(
    "_id testName numQuestions marks testTime user"
  );

  return res.status(200).json({
    success: true,
    data: tests,
  });
});

exports.test = asyncHandler(async (req, res) => {
  const id = req.user.id;
  const { testId } = req.params;

  const test = await Test.findOne({ user: id, _id: testId });

  return res.status(200).json({
    success: true,
    data: test,
  });
});
