import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  LinearProgress,
  Alert,
  Chip,
  Paper,
  Divider
} from '@mui/material';
import {
  CheckCircle as CorrectIcon,
  Cancel as WrongIcon,
  EmojiEvents as TrophyIcon
} from '@mui/icons-material';
import { useGamification } from '../../context/GamificationContext';

/**
 * Quiz Component
 * Interactive quiz with multiple choice questions, scoring, and XP rewards
 */
const Quiz = ({ quizData, onComplete, lessonTitle }) => {
  const { awardXP } = useGamification();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const questions = quizData.questions || [];
  const totalQuestions = questions.length;

  const handleAnswerSelect = (questionIndex, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answer
    });
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    // Calculate score
    let correct = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        correct++;
      }
    });

    const percentage = Math.round((correct / totalQuestions) * 100);
    setScore(percentage);
    setShowResults(true);

    // Award XP based on performance
    if (percentage >= 70) {
      awardXP('PASS_QUIZ'); // 30 XP for passing
      if (percentage === 100) {
        awardXP('ACHIEVE_100_QUIZ'); // 50 XP bonus for perfect score
      }
    }

    // Call onComplete callback
    if (onComplete) {
      onComplete({
        passed: percentage >= 70,
        score: percentage,
        correctAnswers: correct,
        totalQuestions
      });
    }
  };

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  if (showResults) {
    return (
      <Card sx={{ maxWidth: 800, mx: 'auto' }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <TrophyIcon sx={{ fontSize: 64, color: score >= 70 ? 'success.main' : 'warning.main', mb: 2 }} />
            <Typography variant="h4" gutterBottom fontWeight="bold">
              Quiz Complete!
            </Typography>
            <Typography variant="h2" color={score >= 70 ? 'success.main' : 'error.main'} fontWeight="bold">
              {score}%
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              You answered {questions.filter((q, i) => selectedAnswers[i] === q.correctAnswer).length} out of {totalQuestions} questions correctly
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          {score >= 70 ? (
            <Alert severity="success" sx={{ mb: 3 }}>
              <Typography fontWeight="bold">Congratulations! You passed! 🎉</Typography>
              <Typography variant="body2">
                {score === 100 
                  ? 'Perfect score! You earned +80 XP (30 + 50 bonus)!'
                  : 'You earned +30 XP for passing this quiz!'
                }
              </Typography>
            </Alert>
          ) : (
            <Alert severity="warning" sx={{ mb: 3 }}>
              <Typography fontWeight="bold">You need 70% to pass</Typography>
              <Typography variant="body2">
                Review the lesson materials and try again. You can do it!
              </Typography>
            </Alert>
          )}

          {/* Answer Review */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Answer Review
            </Typography>
            {questions.map((q, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === q.correctAnswer;
              
              return (
                <Paper key={index} sx={{ p: 2, mb: 2, bgcolor: isCorrect ? 'success.50' : 'error.50' }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
                    {isCorrect ? (
                      <CorrectIcon color="success" />
                    ) : (
                      <WrongIcon color="error" />
                    )}
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" fontWeight="bold">
                        Question {index + 1}: {q.question}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Your answer: <strong>{userAnswer || 'Not answered'}</strong>
                      </Typography>
                      {!isCorrect && (
                        <Typography variant="body2" color="success.main" sx={{ mt: 0.5 }}>
                          Correct answer: <strong>{q.correctAnswer}</strong>
                        </Typography>
                      )}
                      {q.explanation && (
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', fontStyle: 'italic' }}>
                          💡 {q.explanation}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Paper>
              );
            })}
          </Box>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            {score < 70 && (
              <Button
                variant="contained"
                onClick={() => {
                  setShowResults(false);
                  setCurrentQuestion(0);
                  setSelectedAnswers({});
                  setScore(0);
                }}
              >
                Retake Quiz
              </Button>
            )}
            <Button
              variant={score >= 70 ? 'contained' : 'outlined'}
              onClick={() => onComplete && onComplete({ passed: score >= 70, score })}
            >
              {score >= 70 ? 'Continue to Next Lesson' : 'Back to Lesson'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ maxWidth: 800, mx: 'auto' }}>
      <CardContent sx={{ p: 4 }}>
        {/* Quiz Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="overline" color="text.secondary">
            {lessonTitle || 'Quiz'}
          </Typography>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {quizData.title || `Question ${currentQuestion + 1} of ${totalQuestions}`}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
            <LinearProgress 
              variant="determinate" 
              value={progress} 
              sx={{ flex: 1, height: 8, borderRadius: 1 }}
            />
            <Typography variant="caption" fontWeight="bold">
              {currentQuestion + 1}/{totalQuestions}
            </Typography>
          </Box>
        </Box>

        {/* Question */}
        {currentQ && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              {currentQ.question}
            </Typography>

            <FormControl component="fieldset" fullWidth>
              <RadioGroup
                value={selectedAnswers[currentQuestion] || ''}
                onChange={(e) => handleAnswerSelect(currentQuestion, e.target.value)}
              >
                {currentQ.options.map((option, index) => (
                  <Paper
                    key={index}
                    sx={{
                      p: 2,
                      mb: 1,
                      cursor: 'pointer',
                      border: '2px solid',
                      borderColor: selectedAnswers[currentQuestion] === option ? 'primary.main' : 'divider',
                      '&:hover': {
                        borderColor: 'primary.light',
                        bgcolor: 'action.hover'
                      }
                    }}
                    onClick={() => handleAnswerSelect(currentQuestion, option)}
                  >
                    <FormControlLabel
                      value={option}
                      control={<Radio />}
                      label={option}
                      sx={{ width: '100%', m: 0 }}
                    />
                  </Paper>
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
        )}

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          <Box sx={{ flex: 1, textAlign: 'center' }}>
            <Chip 
              label={`${Object.keys(selectedAnswers).length}/${totalQuestions} Answered`}
              color={Object.keys(selectedAnswers).length === totalQuestions ? 'success' : 'default'}
            />
          </Box>
          {currentQuestion < totalQuestions - 1 ? (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!selectedAnswers[currentQuestion]}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={Object.keys(selectedAnswers).length !== totalQuestions}
              color="success"
            >
              Submit Quiz
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default Quiz;
