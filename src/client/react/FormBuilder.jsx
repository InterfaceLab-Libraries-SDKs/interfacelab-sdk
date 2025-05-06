import React from 'react';

export const FormBuilder = ({ fields, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name}>
          <label>{field.label}</label>
          <input
            name={field.name}
            type={field.type}
            required={field.required}
            pattern={field.pattern}
          />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};