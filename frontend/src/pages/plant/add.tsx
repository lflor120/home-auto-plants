// components/PlantForm.tsx
import { useState } from 'react';
import { Form, Button, Container, Row, Col, FloatingLabel } from 'react-bootstrap';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

interface Plant {
    name: string;
    type: string;
    interval: string;
    frequency: string;
    description: string;
}

interface selectOption {
    name: string | null;
    value: string | null;
    label: string | null;
}

const plantOptions : selectOption[] = [
    { name: "type", value: "chinese-money-plant", label: "Chinese Money Plant" },
    { name: "type", value: "snake-grass", label: "Snake Grass" },
    { name: "type", value: "prayer-plant", label: "Prayer Plant" },
    { name: "type", value: "snare-plant", label: "Snare Plant" }
]
const frequencyOptions : selectOption[] = [
    { name: "frequency", value: "daily", label: "Daily" },
    { name: "frequency", value: "weekly", label: "Weekly" },
    { name: "frequency", value: "monthly", label: "Monthly" },
]

const interval : selectOption[] = [
    { name: "interval", value: "1", label: "1" },
    { name: "interval", value: "2", label: "2" },
    { name: "interval", value: "3", label: "3" },
    { name: "interval", value: "4", label: "4" },
    { name: "interval", value: "5", label: "5" },
    { name: "interval", value: "6", label: "6" },
    { name: "interval", value: "7", label: "7" },
]

const PlantForm = () => {
    const [plantData, setPlantData] = useState<Plant>({
        name: '',
        type: '',
        interval: '',
        frequency: '', 
        description: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log(e)
        const { name, value } = e.target;
        setPlantData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSelectChange = (selected: selectOption | any ) => {
        console.log(selected)
        const { name, value, label } = selected;

        setPlantData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Replace with your actual form submission logic (API call, etc.)
        console.log('Plant Data Submitted:', plantData);

        // Reset the form after submission
        setPlantData({
            name: '',
            type: '',
            interval: '',
            frequency: '',
            description: '',
        });
    };

    return (
        <Container className="my-5">
            <h2 className="text-center mb-4">Add a New Plant 🪴</h2>
            <Form onSubmit={handleSubmit}>
                {/* Plant Name */}
                <Form.Group controlId="name" className="mb-3">
                    <Form.Label className="fw-bold">Plant Name ✏️</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={plantData.name}
                        onChange={handleChange}
                        placeholder="Name your plant!"
                        required
                    />
                </Form.Group>

                {/* Plant Type */}
                <Form.Group controlId="type" className="mb-3">
                    <Form.Label className="fw-bold">Plant Type 🌿</Form.Label>
                    <CreatableSelect
                        id="plant-type"
                        options={plantOptions}
                        placeholder="What kind of plant do you have?"
                        onChange={handleSelectChange}
                        required
                    />
                </Form.Group>


                {/* Plant watering schedule */}
                <Form.Group controlId="schedule" className="mb-3">
                    <Form.Label className="fw-bold">Watering Schedule 💧</Form.Label>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label className="small">Interval</Form.Label>
                                <Select 
                                    id="interval-id"
                                    options={interval}
                                    placeholder="How many times should we water your plant?"
                                    isSearchable={false}
                                    name="interval"
                                    onChange={handleSelectChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label className="small">Recur Every</Form.Label>
                                <Select 
                                    id="frequency-id"
                                    options={frequencyOptions}
                                    placeholder="How often?"
                                    isSearchable={false}
                                    onChange={handleSelectChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form.Group>

                {/* Plant Description */}
                <Form.Group controlId="description" className="mb-3">
                    <Form.Label className="fw-bold">Description 📝</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        value={plantData.description}
                        onChange={handleChange}
                        placeholder="Give your plant some lore!"
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
