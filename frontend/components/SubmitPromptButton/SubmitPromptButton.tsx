interface Props {
  lightMode?: boolean;
  handleSubmit: (event) => void;
}

export const SubmitPromptButton = ({ lightMode, handleSubmit }: Props) => {
  return (
    // We pass the event to the handleSubmit() function on submit.
    <form onSubmit={handleSubmit}>
      <label htmlFor="prompt">Submit Prompt</label>
      <input type="text" id="prompt" name="prompt" required />

      <button type="submit">Submit</button>
    </form>
  );
};
