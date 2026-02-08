import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Quiz from './Quiz';

const theme = createTheme();

// Mock GamificationContext
jest.mock('../../context/GamificationContext', () => ({
  useGamification: () => ({
    awardXP: jest.fn()
  })
}));

const mockQuizData = {
  title: 'Psilocybin Fundamentals Quiz',
  questions: [
    {
      question: 'What is the primary psychoactive compound in magic mushrooms?',
      options: ['Psilocybin', 'THC', 'LSD', 'Mescaline'],
      correctAnswer: 'Psilocybin',
      explanation: 'Psilocybin is converted to psilocin in the body.'
    },
    {
      question: 'What receptor does psilocin primarily act on?',
      options: ['Dopamine D2', '5-HT2A', 'GABA-A', 'NMDA'],
      correctAnswer: '5-HT2A',
      explanation: 'Psilocin is a serotonin 5-HT2A receptor agonist.'
    },
    {
      question: 'What is the typical duration of a psilocybin experience?',
      options: ['1-2 hours', '4-6 hours', '12-24 hours', '48 hours'],
      correctAnswer: '4-6 hours',
      explanation: 'A typical psilocybin experience lasts 4-6 hours.'
    }
  ]
};

const renderQuiz = (props = {}) => {
  return render(
    <ThemeProvider theme={theme}>
      <Quiz
        quizData={mockQuizData}
        onComplete={jest.fn()}
        lessonTitle="Introduction to Psilocybin"
        {...props}
      />
    </ThemeProvider>
  );
};

describe('Quiz', () => {
  it('should render the quiz title', () => {
    renderQuiz();
    expect(screen.getByText('Psilocybin Fundamentals Quiz')).toBeInTheDocument();
  });

  it('should render the lesson title as overline', () => {
    renderQuiz();
    expect(screen.getByText('Introduction to Psilocybin')).toBeInTheDocument();
  });

  it('should display the first question', () => {
    renderQuiz();
    expect(screen.getByText('What is the primary psychoactive compound in magic mushrooms?')).toBeInTheDocument();
  });

  it('should display all answer options for the current question', () => {
    renderQuiz();
    expect(screen.getByText('Psilocybin')).toBeInTheDocument();
    expect(screen.getByText('THC')).toBeInTheDocument();
    expect(screen.getByText('LSD')).toBeInTheDocument();
    expect(screen.getByText('Mescaline')).toBeInTheDocument();
  });

  it('should show progress indicator', () => {
    renderQuiz();
    expect(screen.getByText('1/3')).toBeInTheDocument();
  });

  it('should show answered count', () => {
    renderQuiz();
    expect(screen.getByText('0/3 Answered')).toBeInTheDocument();
  });

  it('should disable Previous button on first question', () => {
    renderQuiz();
    const prevButton = screen.getByText('Previous');
    expect(prevButton).toBeDisabled();
  });

  it('should disable Next button when no answer is selected', () => {
    renderQuiz();
    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  it('should enable Next button after selecting an answer', () => {
    renderQuiz();
    fireEvent.click(screen.getByText('Psilocybin'));
    const nextButton = screen.getByText('Next');
    expect(nextButton).not.toBeDisabled();
  });

  it('should navigate to next question', () => {
    renderQuiz();
    fireEvent.click(screen.getByText('Psilocybin'));
    fireEvent.click(screen.getByText('Next'));

    expect(screen.getByText('What receptor does psilocin primarily act on?')).toBeInTheDocument();
    expect(screen.getByText('2/3')).toBeInTheDocument();
  });

  it('should navigate back to previous question', () => {
    renderQuiz();
    fireEvent.click(screen.getByText('Psilocybin'));
    fireEvent.click(screen.getByText('Next'));

    fireEvent.click(screen.getByText('Previous'));
    expect(screen.getByText('What is the primary psychoactive compound in magic mushrooms?')).toBeInTheDocument();
  });

  it('should show Submit button on last question', () => {
    renderQuiz();
    // Answer Q1 and navigate
    fireEvent.click(screen.getByText('Psilocybin'));
    fireEvent.click(screen.getByText('Next'));

    // Answer Q2 and navigate
    fireEvent.click(screen.getByText('5-HT2A'));
    fireEvent.click(screen.getByText('Next'));

    // On last question, should see Submit
    expect(screen.getByText('Submit Quiz')).toBeInTheDocument();
  });

  it('should disable Submit when not all questions answered', () => {
    renderQuiz();
    fireEvent.click(screen.getByText('Psilocybin'));
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('5-HT2A'));
    fireEvent.click(screen.getByText('Next'));

    // Q3 not answered
    const submitButton = screen.getByText('Submit Quiz');
    expect(submitButton).toBeDisabled();
  });

  it('should show results after submitting all correct answers', () => {
    const onComplete = jest.fn();
    renderQuiz({ onComplete });

    // Answer all correctly
    fireEvent.click(screen.getByText('Psilocybin'));
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('5-HT2A'));
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('4-6 hours'));
    fireEvent.click(screen.getByText('Submit Quiz'));

    expect(screen.getByText('Quiz Complete!')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.getByText(/Congratulations! You passed/)).toBeInTheDocument();
  });

  it('should call onComplete with correct results on pass', () => {
    const onComplete = jest.fn();
    renderQuiz({ onComplete });

    fireEvent.click(screen.getByText('Psilocybin'));
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('5-HT2A'));
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('4-6 hours'));
    fireEvent.click(screen.getByText('Submit Quiz'));

    expect(onComplete).toHaveBeenCalledWith(
      expect.objectContaining({
        passed: true,
        score: 100,
        correctAnswers: 3,
        totalQuestions: 3
      })
    );
  });

  it('should show failing results for incorrect answers', () => {
    const onComplete = jest.fn();
    renderQuiz({ onComplete });

    // Answer all incorrectly
    fireEvent.click(screen.getByText('THC'));
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Dopamine D2'));
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('1-2 hours'));
    fireEvent.click(screen.getByText('Submit Quiz'));

    expect(screen.getByText('Quiz Complete!')).toBeInTheDocument();
    expect(screen.getByText('0%')).toBeInTheDocument();
    expect(screen.getByText(/You need 70% to pass/)).toBeInTheDocument();
  });

  it('should show Retake Quiz button on failure', () => {
    renderQuiz();

    fireEvent.click(screen.getByText('THC'));
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Dopamine D2'));
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('1-2 hours'));
    fireEvent.click(screen.getByText('Submit Quiz'));

    expect(screen.getByText('Retake Quiz')).toBeInTheDocument();
  });

  it('should reset quiz on Retake Quiz click', () => {
    renderQuiz();

    fireEvent.click(screen.getByText('THC'));
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Dopamine D2'));
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('1-2 hours'));
    fireEvent.click(screen.getByText('Submit Quiz'));

    fireEvent.click(screen.getByText('Retake Quiz'));

    // Should be back to first question
    expect(screen.getByText('What is the primary psychoactive compound in magic mushrooms?')).toBeInTheDocument();
    expect(screen.getByText('0/3 Answered')).toBeInTheDocument();
  });

  it('should show answer review with correct/incorrect indicators', () => {
    renderQuiz();

    // Mix of correct and incorrect
    fireEvent.click(screen.getByText('Psilocybin')); // correct
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Dopamine D2')); // incorrect
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('4-6 hours')); // correct
    fireEvent.click(screen.getByText('Submit Quiz'));

    expect(screen.getByText('Answer Review')).toBeInTheDocument();
    // Should show the correct answer for the wrong one
    expect(screen.getByText(/Correct answer:/)).toBeInTheDocument();
  });

  it('should show Continue to Next Lesson on passing', () => {
    renderQuiz();

    fireEvent.click(screen.getByText('Psilocybin'));
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('5-HT2A'));
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('4-6 hours'));
    fireEvent.click(screen.getByText('Submit Quiz'));

    expect(screen.getByText('Continue to Next Lesson')).toBeInTheDocument();
  });

  it('should handle quiz with no questions gracefully', () => {
    renderQuiz({ quizData: { title: 'Empty Quiz', questions: [] } });
    // Should not crash
    expect(screen.getByText('Empty Quiz')).toBeInTheDocument();
  });
});
