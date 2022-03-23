const ValidationErrors = (props) => {
  const errors = [props.data];

  return (
    <div className="validation--errors">
      <h3>Validation Errors</h3>
      <ul>
        {
          errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))
        }
      </ul>
    </div>
  );
}

export default ValidationErrors;