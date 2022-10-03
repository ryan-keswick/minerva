import type FormEvent from 'react';

interface Props {
  lightMode?: boolean;
  handleSubmit: (event: any) => void;
}

export const SubmitPromptButton = ({ lightMode, handleSubmit }: Props) => {
  return (
    // We pass the event to the handleSubmit() function on submit.
    <form
      className="flex bg-baby-blue/20 sm:mx-20 sm:rounded-md sm:shadow-md md:mx-36 lg:mx-56"
      onSubmit={handleSubmit}
    >
      <input
        className="form-input grow bg-dark-blue px-4 text-white sm:rounded-md"
        type="text"
        id="prompt"
        name="prompt"
        required
      />
      <button
        className="text-black grow-0 px-4 py-3 hover:bg-dark-blue hover:text-white sm:rounded-md"
        type="submit"
      >
        Generate
      </button>
    </form>
  );
};
