// components/PlantForm.tsx
import { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

interface PlantFormData {
  name: string;
  type: string;
  description: string;
}

const PlantForm = () => {
  const [formData, setFormData] = useState<PlantFormData>({
    name: '',
    type: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Replace with your actual form submission logic (API call, etc.)
    console.log('Plant Data Submitted:', formData);

    // Reset the form after submission
    setFormData({
      name: '',
      type: '',
      description: '',
    });
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Add a New Plant</h2>
      <Form onSubmit={handleSubmit}>
        {/* Plant Name */}
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Plant Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Plant Type */}
        <Form.Group controlId="type" className="mb-3">
          <Form.Label>Plant Type</Form.Label>
          <Form.Control
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Plant Description */}
        <Form.Group controlId="description" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
          />
        </Form.Group>

        {/* Submit Button */}
        <Button variant="primary" type="submit" className="w-100">
          Add Plant
        </Button>
      </Form>
    </Container>
  );
};

export default PlantForm;
