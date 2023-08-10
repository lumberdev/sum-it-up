import { useEffect, useState } from "react";
import { openAiStorageKey } from "~/constants";
import { getOpenAiKey } from "~/utils/get-open-ai-key";
import StyledInputWithSubmit from "../utility-components/input/StyledInput";

const OpenAiKeyModal = ({ onCloseModal }: { onCloseModal: () => void }) => {
  const [openAiKeyValue, setOpenAiKeyValue] = useState<string>("");

  const [savedKey, setSavedKey] = useState<boolean>(false);

  useEffect(() => {
    let key = "";
    try {
      key = getOpenAiKey();
    } catch (e) {
      console.log(key);
    } finally {
      setSavedKey(!!key);
    }
  }, []);

  const submitOpenAiKey = (event: React.SyntheticEvent) => {
    event.preventDefault();
    localStorage.setItem(openAiStorageKey, openAiKeyValue);
    onCloseModal();
    setOpenAiKeyValue("");
  };

  return (
    <div className="fixed z-50 flex h-full w-full items-center justify-center bg-slate-400/30 backdrop-blur">
      <div className="mx-auto w-2/3 max-w-[800px] rounded-[20px] border-2 border-primary bg-background py-12 px-8 md:my-20 md:p-20">
        <form onSubmit={submitOpenAiKey} className="flex flex-col justify-center gap-2">
          <label htmlFor="openAiKey" className="text-center text-lg">
            Enter your OpenAI secret key below. Create a secret at{" "}
            <a className="text-primary" href="https://platform.openai.com/account/api-keys">
              OpenAI
            </a>
            .
          </label>
          <StyledInputWithSubmit
            name="openAiKey"
            id="openAiKey"
            value={openAiKeyValue}
            onChange={(e) => setOpenAiKeyValue(e.target.value)}
            type="password"
            placeholder="Enter your OpenAI secret key"
            required
            buttonTitle="Submit"
          />
          <span className="mx-auto text-center font-medium">
            we will never use your key (we don’t even send it to our servers)
          </span>

          {savedKey && (
            <span className="text-center text-red-500">
              Uh oh, looks like the provided key is invalid, please enter a valid key to continue.
            </span>
          )}
        </form>
      </div>
    </div>
  );
};

export default OpenAiKeyModal;
