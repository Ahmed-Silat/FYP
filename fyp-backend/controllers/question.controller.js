import Question from "../models/Questions/Question.js";

export const createQuestion = async (req, res) => {
  try {
    const { question_01, question_02, question_03 } = req.body;

    if (!question_01 || !question_02 || !question_03) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newQuestion = await Question.create({
      question_01,
      question_02,
      question_03,
    });

    res.status(201).json({
      message: "Question created successfully",
      questions: newQuestion,
    });
  } catch (error) {
    console.error("Error creating question:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.findAll();
    res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { question_01, question_02, question_03 } = req.body;

    const question = await Question.findByPk(id);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    question.question_01 = question_01;
    question.question_02 = question_02;
    question.question_03 = question_03;
    await question.save();

    res.status(200).json({
      message: "Question updated successfully",
      question,
    });
  } catch (error) {
    console.error("Error updating question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await Question.findByPk(id);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    await question.destroy();
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
