import { useState } from "react";

interface PropsForm {
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  organizarEvento: () => void
}

const Form = ({handleOnChange, organizarEvento}: PropsForm) => {
  const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target?.files[0]);
    }
  };




  return <>
    <form>
      <input type="file" onChange={handleOnChange}/>
    </form>
    <button onClick={organizarEvento}>Organizar evento</button>


  </>

}

export default Form