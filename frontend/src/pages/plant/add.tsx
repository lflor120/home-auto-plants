// components/PlantForm.tsx
import { useState } from 'react';
import { Form, Button, Container, Row, Col, FloatingLabel } from 'react-bootstrap';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
const BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

interface Plant {
    ownerId: string
    plantName: string;
    plantType: string;
    interval: number | null;
    frequency: string;
    description: string;
}

interface selectOption {
    name: string | null;
    // value: string | null;
    label: string | null;
}

const plantOptions: selectOption[] = [
    { name: "plantType", label: "Chinese Money Plant" },
    { name: "plantType", label: "Snake Grass" },
    { name: "plantType", label: "Prayer Plant" },
    { name: "plantType", label: "Snare Plant" }
]
const frequencyOptions: selectOption[] = [
    { name: "frequency", label: "Daily" },
    { name: "frequency", label: "Weekly" },
    { name: "frequency", label: "Monthly" },
]

const interval: selectOption[] = [
    { name: "interval", label: "1" },
    { name: "interval", label: "2" },
    { name: "interval", label: "3" },
    { name: "interval", label: "4" },
    { name: "interval", label: "5" },
    { name: "interval", label: "6" },
    { name: "interval", label: "7" },
]

const PlantForm = () => {
    const [plantData, setPlantData] = useState<Plant>({
        ownerId: '',
        plantName: '',
        plantType: '',
        interval: null,
        frequency: '',
        description: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPlantData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSelectChange = (selected: selectOption | any) => {
        console.log(selected)
        const { name, value, label } = selected;

        setPlantData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    async function postPlant(plant: Plant): Promise<Plant> {
        try {
            const response = await fetch(`${BACKEND_API}/plant`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(plant)
            });
            if (!response.ok) {
                    throw new Error(`Error! status: ${response.status}`);
            }

            const data: Plant = await response.json();
            return data;
            
        } catch (error) {
            console.error("Error adding plant:", error);
            throw error;
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // call backend api
        
        console.log('Plant Data Submitted:', plantData);


        // Reset the form after submission
        setPlantData({
            ownerId: '',
            plantName: '',
            plantType: '',
            interval: null,
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
                        name="plantName"
                        value={plantData.plantName}
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
                        instanceId="plant-type-select"
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
                                    instanceId="watering-sched-select"
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
                                    instanceId="recur-select"
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
