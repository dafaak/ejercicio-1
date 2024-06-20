interface FormProps {
  onFileContentChange: (fileContent: string) => void
  maxFileSize: number
  accept: string
}

const Form = ({onFileContentChange, accept, maxFileSize}: FormProps) => {

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const isValidFile = validateFileSize(e.target.files[0], maxFileSize)
      if (isValidFile) readFile(e.target.files[0]);

    }
  };

  const validateFileSize = (file: File, maxFileSize: number) => {
    return file.size > maxFileSize ? false : true;
  }

  const readFile = (file: File) => {
    const reader = new FileReader();


    reader.onload = () => {
      const fileContentRes = reader.result as string;
      if (fileContentRes) onFileContentChange(fileContentRes as string);
    };

    reader.readAsText(file);

  }


  return <>
    <form>
      <div>
        <label>Archivo:</label>
      </div>
      <div>
        <input type="file" onChange={handleFileChange} accept={accept}/>
        <br/>
        <small>El archivo debe tener el formato "tema 'Tiempo'min" (tiempo en minutos) por cada tema</small>
      </div>
    </form>

  </>

}

export default Form