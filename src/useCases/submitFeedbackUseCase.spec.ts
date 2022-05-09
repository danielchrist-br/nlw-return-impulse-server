import { SubmitFeedbackUseCase } from "./submitFeedbackUseCase";

const createFeedbackSpy = jest.fn();
const sendMailspy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailspy }
)

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'exemple comment',
      screenshot: 'data:image/png;base64,aiodhwjdawd0wdsadad',
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailspy).toHaveBeenCalled();
  });

  it('should bot be able to submit feedback without type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'exemple comment',
      screenshot: 'data:image/png;base64,aiodhwjdawd0wdsadad',
    })).rejects.toThrow();
  });

  it('should bot be able to submit feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,aiodhwjdawd0wdsadad',
    })).rejects.toThrow();
  });

  it('should bot be able to submit feedback with an invalid screenshot', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'exemple comment',
      screenshot: 'test.jpg',
    })).rejects.toThrow();
  });
});
